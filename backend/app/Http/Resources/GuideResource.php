<?php

namespace App\Http\Resources;

use App\Models\Guide;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class GuideResource extends JsonResource
{
    public function __construct(Guide $resource, protected bool $detailed = true)
    {
        parent::__construct($resource);
    }

    public function toArray($request)
    {
        return [
            'guide_id'     => $this->id,
            'name'         => $this->user->name,
            'status'         => $this->user->status,

            'avatar'       => asset('storage/' . ($this->avatar ?? "avatars/no-image.png")),
            'phone'         => $this->phone,
            
            'DOB'          => $this->DOB,
            'age'          => Carbon::parse($this->DOB)->age,
            'gender'          => $this->gender,

            'daily_price'  => $this->daily_price,
            'bio'          => $this->bio,

            'cities'    => $this->whenLoaded('cities', function () {
                return $this->detailed
                    ? $this->cities
                    : $this->cities->pluck('name')->implode(', ');
            }),

            'languages'    => $this->whenLoaded('languages', function () {
                return $this->detailed
                    ? $this->languages
                    : $this->languages->pluck('name')->implode(', ');
            }),

            'bookings_count' => $this->bookings_count,
            'reviews_count' => $this->reviews_count,
            // متوسط التقييم الحقيقي من الحجوزات
            'rating'       => round($this->reviews_avg_rating, 2),
        ];
    }
}
