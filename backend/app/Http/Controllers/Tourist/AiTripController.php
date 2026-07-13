<?php

namespace App\Http\Controllers\Tourist;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceResource;
use App\Http\Resources\TripResource;
use App\Models\AiNearbyExplore;
use App\Models\Place;
use App\Models\Trip;
use App\Services\AiServiceClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AiTripController extends Controller
{
    public function plan(Request $request, AiServiceClient $ai)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:191'],
            'city_ids' => ['nullable', 'array'],
            'city_ids.*' => ['integer', 'exists:cities,id'],
            'category_ids' => ['nullable', 'array'],
            'category_ids.*' => ['integer', 'exists:categories,id'],
            'interest_ids' => ['nullable', 'array'],
            'interest_ids.*' => ['integer', 'exists:interests,id'],
            'start_date' => ['nullable', 'date', 'after_or_equal:today'],
            'start_time' => ['nullable', 'date_format:H:i'],
            'day_count' => ['required', 'integer', 'min:1', 'max:14'],
            'budget_max' => ['nullable', 'numeric', 'min:0'],
            'trip_pace' => ['nullable', 'in:slow,medium,intensive'],
            'preferred_activity_level' => ['nullable', 'in:relax,sensible,vigour'],
            'is_outdoor' => ['nullable', 'boolean'],
        ]);

        $places = $this->placesForAi($data)->values();

        $aiPlan = $ai->planTrip([
            'preferences' => $data,
            'places' => $places,
        ]);

        $trip = DB::transaction(function () use ($request, $data, $aiPlan) {
            $trip = Trip::create([
                'user_id' => $request->user()->id,
                'title' => $data['title'] ?? ($aiPlan['title'] ?? 'رحلة ذكية'),
                'budget_max' => $data['budget_max'] ?? null,
                'trip_pace' => $data['trip_pace'] ?? 'medium',
                'preferred_activity_level' => $data['preferred_activity_level'] ?? 'sensible',
                'start_date' => $data['start_date'] ?? null,
                'day_count' => $data['day_count'],
                'total_estimated_cost' => $aiPlan['total_estimated_cost'] ?? 0,
            ]);

            foreach (($aiPlan['days'] ?? []) as $day) {
                foreach (($day['places'] ?? []) as $place) {
                    $trip->tripPlaces()->create([
                        'place_id' => $place['place_id'],
                        'day_number' => $day['day_number'],
                        'order' => $place['order'],
                        'start_time' => $place['start_time'],
                        'duration_minutes' => $place['duration_minutes'],
                        'travel_minutes' => $place['travel_minutes'],
                        'estimated_cost' => $place['estimated_cost'],
                        'note' => $place['note'] ?? null,
                    ]);
                }
            }

            return $trip->load(['tripPlaces.place.city', 'tripPlaces.place.category', 'tripPlaces.place.images', 'tripPlaces.place.interests']);
        });

        $trip->ml_metrics = $aiPlan['ml_metrics'] ?? null;

        return api_success(new TripResource($trip), 'تم إنشاء خطة الرحلة الذكية', 201);
    }

    public function trips()
    {
        $trips = Trip::query()
            ->where('user_id', Auth::id())
            ->with(['tripPlaces.place.city', 'tripPlaces.place.category', 'tripPlaces.place.images', 'tripPlaces.place.interests'])
            ->latest()
            ->get();

        return api_success(TripResource::collection($trips));
    }

    public function show(Trip $trip)
    {
        abort_if($trip->user_id !== Auth::id(), 403);

        $trip->load(['tripPlaces.place.city', 'tripPlaces.place.category', 'tripPlaces.place.images', 'tripPlaces.place.interests']);

        return api_success(new TripResource($trip));
    }

    public function nearby(Request $request, AiServiceClient $ai)
    {
        $data = $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'radius_km' => ['required', 'integer', 'min:1', 'max:200'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'interest_ids' => ['nullable', 'array'],
            'interest_ids.*' => ['integer', 'exists:interests,id'],
            'budget' => ['nullable', 'numeric', 'min:0'],
            'is_outdoor' => ['nullable', 'boolean'],
            'limit' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        $places = $this->placesForAi([
            'category_ids' => [$data['category_id']],
            'is_outdoor' => $data['is_outdoor'] ?? null,
        ])->values();

        $aiResult = $ai->nearbyPlaces([
            'preferences' => $data,
            'places' => $places,
        ]);

        $placeIds = collect($aiResult['results'] ?? [])->pluck('place_id')->all();
        $distanceByPlace = collect($aiResult['results'] ?? [])->keyBy('place_id');

        $models = Place::with(['city', 'category', 'images', 'interests'])
            ->whereIn('id', $placeIds)
            ->get()
            ->sortBy(fn ($place) => array_search($place->id, $placeIds))
            ->values()
            ->map(function ($place) use ($distanceByPlace) {
                $meta = $distanceByPlace[$place->id] ?? [];
                $place->distance_km = $meta['distance_km'] ?? null;
                $place->ai_score = $meta['ai_score'] ?? null;
                $place->ml_score = $meta['ml_score'] ?? null;
                $place->reason = $meta['reason'] ?? null;
                return $place;
            });

        DB::transaction(function () use ($request, $data, $models) {
            $explore = AiNearbyExplore::create([
                'user_id' => $request->user()->id,
                'category_id' => $data['category_id'],
                'budget' => $data['budget'] ?? null,
                'is_outdoor' => $data['is_outdoor'] ?? null,
                'latitude' => $data['latitude'],
                'longitude' => $data['longitude'],
                'radius_km' => $data['radius_km'],
            ]);

            foreach ($models as $place) {
                $explore->results()->create([
                    'place_id' => $place->id,
                    'distance_km' => $place->distance_km,
                ]);
            }
        });

        return api_success([
            'count' => $models->count(),
            'ml_metrics' => $aiResult['ml_metrics'] ?? null,
            'places' => PlaceResource::collection($models),
        ], 'تم جلب الأماكن القريبة بالذكاء');
    }

    private function placesForAi(array $filters)
    {
        return Place::query()
            ->with(['city', 'category', 'images', 'interests'])
            ->when($filters['city_ids'] ?? null, fn ($q, $ids) => $q->whereIn('city_id', $ids))
            ->when($filters['category_ids'] ?? null, fn ($q, $ids) => $q->whereIn('category_id', $ids))
            ->when(array_key_exists('is_outdoor', $filters) && $filters['is_outdoor'] !== null, fn ($q) => $q->where('is_outdoor', (bool) $filters['is_outdoor']))
            ->when($filters['budget_max'] ?? null, fn ($q, $budget) => $q->where(function ($inner) use ($budget) {
                $inner->whereNull('cost')->orWhere('cost', '<=', $budget);
            }))
            ->get()
            ->map(fn ($place) => [
                'id' => $place->id,
                'name' => $place->name,
                'city_id' => $place->city_id,
                'category_id' => $place->category_id,
                'cost' => $place->cost,
                'expected_duration_minutes' => $place->expected_duration_minutes,
                'activity_level' => $place->activity_level,
                'is_outdoor' => (bool) $place->is_outdoor,
                'average_rating' => $place->average_rating,
                'reviews_count' => $place->reviews_count,
                'latitude' => $place->latitude,
                'longitude' => $place->longitude,
                'interest_ids' => $place->interests->pluck('id')->values()->all(),
            ]);
    }
}
