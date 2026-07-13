<?php

namespace App\Services;

use App\Models\Trip;
use App\Models\TripPlace;
use Illuminate\Support\Facades\DB;

class TripSavingService
{
    public function savePlannedTrip($user, array $aiData)
    {
        return DB::transaction(function () use ($user, $aiData) {

            // 1) إنشاء الرحلة
            $trip = Trip::create([
                'user_id' => $user->id,
                'days' => $aiData['days'],
                'budget' => $aiData['budget'] ?? null,
                'trip_pace' => $aiData['trip_pace'] ?? 'متوسط',
                'interests' => $aiData['interests'] ?? [],
                'weather' => $aiData['weather'] ?? null,
            ]);

            // 2) إنشاء الأماكن اليومية
            if (!empty($aiData['itinerary'])) {
                foreach ($aiData['itinerary'] as $dayIndex => $day) {
                    foreach ($day['places'] as $order => $place) {
                        TripPlace::create([
                            'trip_id' => $trip->id,
                            'place_id' => $place['id'],
                            'day_number' => $dayIndex + 1,
                            'order_in_day' => $order + 1,
                        ]);
                    }
                }
            }

            return $trip->load('places.place');
        });
    }
}
