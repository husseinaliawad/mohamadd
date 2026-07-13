<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TripPlaceResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'day_number' => $this->day_number,
            'order' => $this->order,
            'start_time' => $this->start_time,
            'duration_minutes' => $this->duration_minutes,
            'travel_minutes' => $this->travel_minutes,
            'estimated_cost' => $this->estimated_cost,
            'note' => $this->note,
            'place' => new PlaceResource($this->whenLoaded('place')),
        ];
    }
}
