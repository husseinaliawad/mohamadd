from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import math
from datetime import datetime, timedelta


HOST = "127.0.0.1"
PORT = 8010


def haversine(lat1, lon1, lat2, lon2):
    if None in (lat1, lon1, lat2, lon2):
        return None

    radius = 6371
    dlat = math.radians(float(lat2) - float(lat1))
    dlon = math.radians(float(lon2) - float(lon1))
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(float(lat1)))
        * math.cos(math.radians(float(lat2)))
        * math.sin(dlon / 2) ** 2
    )
    return round(radius * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a)), 2)


def as_float(value, default=0):
    try:
        if value is None or value == "":
            return default
        return float(value)
    except (TypeError, ValueError):
        return default


def as_int(value, default=0):
    try:
        if value is None or value == "":
            return default
        return int(value)
    except (TypeError, ValueError):
        return default


def score_place(place, preferences):
    score = 0.0
    rating = as_float(place.get("average_rating"))
    reviews_count = as_int(place.get("reviews_count"))
    cost = place.get("cost")

    score += rating * 14
    score += min(reviews_count, 25)

    if preferences.get("preferred_activity_level") == place.get("activity_level"):
        score += 18

    preferred_interests = set(preferences.get("interest_ids") or [])
    place_interests = set(place.get("interest_ids") or [])
    score += len(preferred_interests.intersection(place_interests)) * 22

    budget = preferences.get("budget_max")
    if budget and cost is not None:
        score += max(0, 12 - (as_float(cost) / as_float(budget, 1)) * 12)

    if preferences.get("is_outdoor") is not None and bool(preferences.get("is_outdoor")) == bool(place.get("is_outdoor")):
        score += 8

    return round(score, 2)


def sigmoid(value):
    if value < -50:
        return 0.0
    if value > 50:
        return 1.0
    return 1 / (1 + math.exp(-value))


def all_interest_ids(places):
    ids = set()
    for place in places:
        ids.update(place.get("interest_ids") or [])
    return sorted(ids)


def opposite_activity(activity):
    activities = ["relax", "sensible", "vigour"]
    if activity not in activities:
        return "vigour"
    return activities[(activities.index(activity) + 1) % len(activities)]


def synthetic_variants(place, base_preferences, interest_universe):
    cost = as_float(place.get("cost"), 0)
    place_interests = place.get("interest_ids") or []
    other_interests = [item for item in interest_universe if item not in place_interests]

    matching = dict(base_preferences)
    matching.update(
        {
            "interest_ids": place_interests,
            "budget_max": max(cost * 1.25, cost + 10, as_float(base_preferences.get("budget_max"), 0)),
            "budget": max(cost * 1.25, cost + 10, as_float(base_preferences.get("budget"), 0)),
            "preferred_activity_level": place.get("activity_level"),
            "is_outdoor": place.get("is_outdoor"),
        }
    )

    mismatching = dict(base_preferences)
    mismatching.update(
        {
            "interest_ids": other_interests[: max(1, min(3, len(other_interests)))] if other_interests else [],
            "budget_max": max(0, cost * 0.5),
            "budget": max(0, cost * 0.5),
            "preferred_activity_level": opposite_activity(place.get("activity_level")),
            "is_outdoor": not bool(place.get("is_outdoor")),
        }
    )

    broad = dict(base_preferences)
    broad.update(
        {
            "interest_ids": list(set((base_preferences.get("interest_ids") or []) + place_interests[:1])),
            "budget_max": max(cost * 2, as_float(base_preferences.get("budget_max"), 0)),
            "budget": max(cost * 2, as_float(base_preferences.get("budget"), 0)),
        }
    )

    return [dict(base_preferences), matching, mismatching, broad]


def feature_vector(place, preferences, distance_km=None):
    preferred_interests = set(preferences.get("interest_ids") or [])
    place_interests = set(place.get("interest_ids") or [])
    interest_match = 0.0
    if preferred_interests:
        interest_match = len(preferred_interests.intersection(place_interests)) / max(1, len(preferred_interests))

    rating = min(as_float(place.get("average_rating")) / 5, 1)
    reviews = min(math.log1p(as_int(place.get("reviews_count"))) / math.log1p(100), 1)

    budget = preferences.get("budget_max", preferences.get("budget"))
    cost = place.get("cost")
    if budget and cost is not None:
        budget_fit = max(0, min(1, 1 - (as_float(cost) / max(as_float(budget), 1)) * 0.65))
    else:
        budget_fit = 0.6

    activity_match = 1.0 if preferences.get("preferred_activity_level") == place.get("activity_level") else 0.0
    outdoor_match = 0.5
    if preferences.get("is_outdoor") is not None:
        outdoor_match = 1.0 if bool(preferences.get("is_outdoor")) == bool(place.get("is_outdoor")) else 0.0

    if distance_km is None:
        distance_km = 20
    radius = as_float(preferences.get("radius_km"), 50)
    distance_score = max(0, min(1, 1 - (as_float(distance_km) / max(radius, 1))))

    duration = min(as_int(place.get("expected_duration_minutes"), 90) / 240, 1)

    return [
        1.0,
        interest_match,
        rating,
        reviews,
        budget_fit,
        activity_match,
        outdoor_match,
        distance_score,
        1 - duration,
    ]


def synthetic_label(features):
    hidden_score = (
        features[1] * 0.28
        + features[2] * 0.18
        + features[3] * 0.10
        + features[4] * 0.15
        + features[5] * 0.12
        + features[6] * 0.07
        + features[7] * 0.08
        + features[8] * 0.02
    )
    return 1 if hidden_score >= 0.55 else 0


def train_logistic_regression(samples):
    if len(samples) < 8 or len({label for _, label in samples}) < 2:
        return [0.0, 1.8, 1.2, 0.6, 1.1, 0.9, 0.5, 0.7, 0.2], {
            "accuracy": None,
            "precision": None,
            "recall": None,
            "f1": None,
            "samples": len(samples),
            "note": "Not enough balanced synthetic samples; using default recommendation weights.",
        }

    train = [sample for index, sample in enumerate(samples) if index % 5 != 0]
    test = [sample for index, sample in enumerate(samples) if index % 5 == 0]
    weights = [0.0] * len(samples[0][0])
    learning_rate = 0.35

    for _ in range(320):
        for features, label in train:
            prediction = sigmoid(sum(weight * feature for weight, feature in zip(weights, features)))
            error = label - prediction
            for index, feature in enumerate(features):
                weights[index] += learning_rate * error * feature

    tp = tn = fp = fn = 0
    for features, label in test:
        prediction = 1 if sigmoid(sum(weight * feature for weight, feature in zip(weights, features))) >= 0.5 else 0
        if prediction == 1 and label == 1:
            tp += 1
        elif prediction == 0 and label == 0:
            tn += 1
        elif prediction == 1 and label == 0:
            fp += 1
        else:
            fn += 1

    total = max(1, tp + tn + fp + fn)
    precision = tp / max(1, tp + fp)
    recall = tp / max(1, tp + fn)
    f1 = (2 * precision * recall / max(precision + recall, 0.0001))

    return weights, {
        "accuracy": round((tp + tn) / total, 3),
        "precision": round(precision, 3),
        "recall": round(recall, 3),
        "f1": round(f1, 3),
        "samples": len(samples),
        "test_samples": len(test),
        "dataset": "Synthetic user-place interactions generated from current project places.",
    }


def train_project_ml_model(places, preferences, include_distance=False):
    interest_universe = all_interest_ids(places)
    samples = []

    for place in places:
        for variant in synthetic_variants(place, preferences, interest_universe):
            distance = None
            if include_distance:
                distance = haversine(
                    variant.get("latitude", preferences.get("latitude")),
                    variant.get("longitude", preferences.get("longitude")),
                    place.get("latitude"),
                    place.get("longitude"),
                )
            features = feature_vector(place, variant, distance)
            samples.append((features, synthetic_label(features)))

    return train_logistic_regression(samples)


def predict_ml_score(weights, place, preferences, distance_km=None):
    features = feature_vector(place, preferences, distance_km)
    return round(sigmoid(sum(weight * feature for weight, feature in zip(weights, features))) * 100, 2)


def nearest_neighbor_order(places):
    if not places:
        return []

    remaining = list(places)
    ordered = [remaining.pop(0)]

    while remaining:
        current = ordered[-1]
        next_index = 0
        next_distance = None

        for index, place in enumerate(remaining):
            distance = haversine(
                current.get("latitude"),
                current.get("longitude"),
                place.get("latitude"),
                place.get("longitude"),
            )
            comparable = distance if distance is not None else 999999
            if next_distance is None or comparable < next_distance:
                next_distance = comparable
                next_index = index

        ordered.append(remaining.pop(next_index))

    return ordered


def plan_trip(payload):
    preferences = payload.get("preferences") or {}
    places = payload.get("places") or []
    day_count = max(1, min(as_int(preferences.get("day_count"), 1), 14))
    pace = preferences.get("trip_pace") or "medium"
    places_per_day = {"slow": 3, "medium": 4, "intensive": 5}.get(pace, 4)
    start_time = preferences.get("start_time") or "09:00"
    weights, ml_metrics = train_project_ml_model(places, preferences)

    scored = []
    for place in places:
        item = dict(place)
        item["rule_score"] = score_place(place, preferences)
        item["ml_score"] = predict_ml_score(weights, place, preferences)
        item["ai_score"] = round((item["rule_score"] * 0.7) + (item["ml_score"] * 0.3), 2)
        scored.append(item)

    scored.sort(key=lambda item: item["ai_score"], reverse=True)
    selected = scored[: day_count * places_per_day]
    ordered = nearest_neighbor_order(selected)

    days = []
    total_cost = 0.0
    cursor = 0
    for day_number in range(1, day_count + 1):
        current_time = datetime.strptime(start_time, "%H:%M")
        day_places = []
        previous = None

        for order in range(1, places_per_day + 1):
            if cursor >= len(ordered):
                break

            place = ordered[cursor]
            cursor += 1

            distance = None
            travel_minutes = 0
            if previous:
                distance = haversine(
                    previous.get("latitude"),
                    previous.get("longitude"),
                    place.get("latitude"),
                    place.get("longitude"),
                )
                travel_minutes = max(5, int(math.ceil((distance or 7.5) * 2)))
                current_time += timedelta(minutes=travel_minutes)

            duration = as_int(place.get("expected_duration_minutes"), 90)
            cost = as_float(place.get("cost"))
            total_cost += cost

            day_places.append(
                {
                    "place_id": place["id"],
                    "order": order,
                    "start_time": current_time.strftime("%H:%M"),
                    "duration_minutes": duration,
                    "travel_minutes": travel_minutes,
                    "estimated_cost": cost,
                    "ai_score": place["ai_score"],
                    "ml_score": place["ml_score"],
                    "distance_from_previous_km": distance,
                    "note": "اختير حسب الاهتمامات والتقييم والقرب من باقي المسار",
                }
            )

            current_time += timedelta(minutes=duration)
            previous = place

        if day_places:
            days.append({"day_number": day_number, "places": day_places})

    return {
        "title": preferences.get("title") or "Smart Trip",
        "day_count": day_count,
        "total_estimated_cost": round(total_cost, 2),
        "ml_metrics": ml_metrics,
        "days": days,
    }


def nearby_places(payload):
    preferences = payload.get("preferences") or {}
    places = payload.get("places") or []
    lat = preferences.get("latitude")
    lon = preferences.get("longitude")
    radius_km = as_float(preferences.get("radius_km"), 20)
    limit = max(1, min(as_int(preferences.get("limit"), 20), 50))
    budget = preferences.get("budget")
    interest_ids = set(preferences.get("interest_ids") or [])
    weights, ml_metrics = train_project_ml_model(places, preferences, include_distance=True)

    results = []
    for place in places:
        distance = haversine(lat, lon, place.get("latitude"), place.get("longitude"))
        if distance is None or distance > radius_km:
            continue
        if budget and place.get("cost") is not None and as_float(place.get("cost")) > as_float(budget):
            continue
        if interest_ids and not interest_ids.intersection(set(place.get("interest_ids") or [])):
            continue

        rule_score = (100 - min(distance, 100)) + as_float(place.get("average_rating")) * 8
        ml_score = predict_ml_score(weights, place, preferences, distance)
        score = (rule_score * 0.7) + (ml_score * 0.3)
        item = {
            "place_id": place["id"],
            "distance_km": distance,
            "ai_score": round(score, 2),
            "ml_score": ml_score,
            "reason": "قريب من موقعك ومناسب للفلاتر المختارة",
        }
        results.append(item)

    results.sort(key=lambda item: (-item["ai_score"], item["distance_km"]))
    return {"count": len(results[:limit]), "ml_metrics": ml_metrics, "results": results[:limit]}


class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        print(f"{self.address_string()} - - [{self.log_date_time_string()}] {format % args}")

    def _send(self, status, body):
        raw = json.dumps(body, ensure_ascii=False).encode("utf-8")
        try:
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)
        except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
            print("Client disconnected before the AI response was fully sent.")

    def do_GET(self):
        if self.path == "/health":
            self._send(200, {"ok": True, "service": "nexttrip-ai"})
            return
        self._send(404, {"message": "Not found"})

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(length).decode("utf-8") or "{}")

            if self.path == "/plan-trip":
                self._send(200, {"success": True, "data": plan_trip(payload)})
                return
            if self.path == "/nearby-places":
                self._send(200, {"success": True, "data": nearby_places(payload)})
                return
            self._send(404, {"success": False, "message": "Not found"})
        except json.JSONDecodeError:
            self._send(400, {"success": False, "message": "Invalid JSON payload"})
        except (BrokenPipeError, ConnectionAbortedError, ConnectionResetError):
            print("Client disconnected while the AI request was being processed.")
        except Exception as exc:
            self._send(500, {"success": False, "message": str(exc)})


if __name__ == "__main__":
    print(f"NextTrip AI service running on http://{HOST}:{PORT}")
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
