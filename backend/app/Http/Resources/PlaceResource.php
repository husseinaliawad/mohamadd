<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'city_id' => $this->city_id,
            'category_id' => $this->category_id,
            'name' => $this->name,
            'description' => $this->description,
            'phone' => $this->phone,
            'address' => $this->address,
            'cost' => $this->cost,
            'expected_duration_minutes' => $this->expected_duration_minutes,
            'activity_level' => $this->activity_level,
            'is_outdoor' => $this->is_outdoor,
            'best_seasons' => $this->best_seasons,
            'recommended_times' => $this->recommended_times,
            'opening_hours' => $this->opening_hours,
            'average_rating' => $this->average_rating,
            'reviews_count' => $this->reviews_count,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'distance_km' => $this->when(isset($this->distance_km), $this->distance_km),
            'ai_score' => $this->when(isset($this->ai_score), $this->ai_score),
            'ml_score' => $this->when(isset($this->ml_score), $this->ml_score),
            'reason' => $this->when(isset($this->reason), $this->reason),
            'city' => $this->whenLoaded('city'),
            'category' => $this->whenLoaded('category'),
            'images' => PlaceImageResource::collection($this->whenLoaded('images')->sortBy('order')),
            'interests' => $this->whenLoaded('interests'),
            'reviews' => $this->whenLoaded('reviews'),
        ];
    }
}
