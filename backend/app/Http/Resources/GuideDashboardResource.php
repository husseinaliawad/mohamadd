<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GuideDashboardResource extends JsonResource
{
    public function toArray($request)
    {
        $guide = $this['guide'];

        return [
            'guide' => [
                'name'   => $guide->user->name,
                'avatar' => asset("storage/" . ($guide->avatar?? "avatars/no-image.png")),
                'rating' => round($guide->reviews()->avg('rating') ?? 0, 1),
                'role'   => 'مرشد سياحي',
            ],

            'stats' => $this['stats'],

            'latest_reviews' => $this['latest_reviews']->map(function ($booking) {
                return [
                    'id'      => $booking->review->id,
                    'user'    => $booking->tourist->name,
                    'comment' => $booking->review->comment,
                    'rating'  => $booking->review->rating,
                ];
            }),

            'latest_bookings' => $this['latest_bookings']->map(function ($booking) {

                return [
                    'id'        => $booking->id,
                    'name'      => $booking->tourist->name,
                    'duration'  => $booking->day_count . ' أيام',
                    'status'    => $booking->status,
                    'date_range' => $booking->start_date->format('d M Y') .
                        ' إلى ' .
                        $booking->start_date->copy()->addDays($booking->day_count - 1)->format('d M Y'),
                ];
            }),
        ];
    }
}
