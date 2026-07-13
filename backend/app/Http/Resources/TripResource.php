<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TripResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'budget_max' => $this->budget_max,
            'trip_pace' => $this->trip_pace,
            'preferred_activity_level' => $this->preferred_activity_level,
            'start_date' => $this->start_date,
            'day_count' => $this->day_count,
            'total_estimated_cost' => $this->total_estimated_cost,
            'ml_metrics' => $this->when(isset($this->ml_metrics), $this->ml_metrics),
            'days' => $this->relationLoaded('tripPlaces')
                ? $this->tripPlaces
                    ->sortBy([['day_number', 'asc'], ['order', 'asc']])
                    ->groupBy('day_number')
                    ->map(fn ($items, $day) => [
                        'day_number' => (int) $day,
                        'places' => TripPlaceResource::collection($items->values()),
                    ])
                    ->values()
                : [],
            'created_at' => $this->created_at,
        ];
    }
}
