<?php

namespace App\Http\Resources;

use App\Enums\GuideBookingStatus;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class GuideBookingResource extends JsonResource
{
    public function toArray($request)
    {
        $startDate = Carbon::parse($this->start_date);
        $today = Carbon::today();

        return [
            'booking_id'    => $this->id,
            'tourist_name' => $this->whenLoaded('tourist', fn() => $this->tourist->name),

            'guide_name'    => $this->guide->user->name,
            'guide_avatar' =>  asset('storage/' . ($this->guide->avatar ??  "no-image.png")),

            'start_date' => $this->start_date,
            'day_count' => $this->day_count,
            'status'        => $this->status,
            'total_price'   => $this->total_price,
            'description' => $this->description,

            'review'        => $this->review ? [
                'rating'  => $this->review->rating,
                'comment' => $this->review->comment,
                'created_at' => $this->review->created_at,
            ] : null,

            'can_tourist_cancel' =>
            in_array($this->status, [GuideBookingStatus::Pending, GuideBookingStatus::Accepted]) &&
                $today->diffInDays($startDate, false) >= 14,

            'can_tourist_review' =>
            $this->status === GuideBookingStatus::Completed &&                   // الرحلة انتهت
                !$this->review,               // لم يتم تقييمها سابقاً

            'can_guide_cancel' => $this->status === GuideBookingStatus::Accepted,             
            'can_guide_react' => $this->status === GuideBookingStatus::Pending,             

            'logs'        => $this->whenLoaded('logs'),
            'created_at' => $this->created_at,
        ];
    }
}
