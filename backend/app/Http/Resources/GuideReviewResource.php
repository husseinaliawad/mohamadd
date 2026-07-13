<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GuideReviewResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->review->id,
            'rating' => $this->review->rating,
            'comment' => $this->review->comment,
            'created_at' => $this->review->created_at,
            
            'tourist_name' => $this->tourist->name,
            'trip_date' => $this->start_date,
            'day_count' => $this->day_count,            
        ];
    }
}


