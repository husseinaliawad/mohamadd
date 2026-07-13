export type TripPace = "slow" | "medium" | "intensive";
export type ActivityLevel = "relax" | "sensible" | "vigour";

export interface AiTripRequest {
  title?: string;
  city_ids?: number[];
  category_ids?: number[];
  interest_ids?: number[];
  start_date?: string;
  start_time?: string;
  day_count: number;
  budget_max?: number;
  trip_pace?: TripPace;
  preferred_activity_level?: ActivityLevel;
  is_outdoor?: boolean | null;
}

export interface NearbyRequest {
  latitude: number;
  longitude: number;
  radius_km: number;
  category_id: number;
  interest_ids?: number[];
  budget?: number;
  is_outdoor?: boolean | null;
  limit?: number;
}

export interface AiPlace {
  id: number;
  name: string;
  description?: string;
  address?: string;
  cost?: number;
  average_rating?: number;
  distance_km?: number;
  ai_score?: number;
  ml_score?: number;
  reason?: string;
  city?: { id: number; name: string };
  category?: { id: number; name: string };
}

export interface MlMetrics {
  accuracy?: number | null;
  precision?: number | null;
  recall?: number | null;
  f1?: number | null;
  samples?: number;
  test_samples?: number;
  dataset?: string;
  note?: string;
}

export interface TripPlace {
  id: number;
  order: number;
  start_time: string;
  duration_minutes: number;
  travel_minutes: number;
  estimated_cost: number;
  note?: string;
  place: AiPlace;
}

export interface TripDay {
  day_number: number;
  places: TripPlace[];
}

export interface AiTrip {
  id: number;
  title: string;
  day_count: number;
  total_estimated_cost?: number;
  ml_metrics?: MlMetrics | null;
  days: TripDay[];
}

export interface NearbyResult {
  count: number;
  ml_metrics?: MlMetrics | null;
  places: AiPlace[];
}
