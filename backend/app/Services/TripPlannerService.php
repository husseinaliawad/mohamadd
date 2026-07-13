<?php

namespace App\Services;

use App\Models\User;
use App\Models\Place;
use App\Models\City;
use App\Models\Guide;

class TripPlannerService
{
    public function prepareDataForAI(User $user, array $input)
    {
        $preferences = $user->preferences;

        // 1) جلب الأماكن مع العلاقات
        $places = Place::with([
            'city',
            'type',
            'images',
            'reviews'
        ])
        ->withAvg('reviews', 'rating')
        ->withCount('reviews')
        ->get();

        // 2) فلترة حسب الميزانية (إن وجدت)
        if ($preferences?->budget_min || $preferences?->budget_max) {
            $places = $places->filter(function ($place) use ($preferences) {
                $min = $preferences->budget_min ?? 0;
                $max = $preferences->budget_max ?? 999999;

                return $place->price_min >= $min && $place->price_max <= $max;
            })->values();
        }

        // 3) فلترة حسب الاهتمامات (إن وجدت)
        if (!empty($preferences?->interests)) {
            $places = $places->filter(function ($place) use ($preferences) {
                return in_array($place->type->name, $preferences->interests);
            })->values(); //value => reindex starting from 0
        }

        // 4) جلب المرشدين
        $guides = Guide::with(['user', 'languages', 'availability'])->get();

        // 5) جلب المدن
        $cities = City::all();

        // 6) تجهيز البيانات للذكاء الاصطناعي
        return [
            'user' => [
                'trip_pace' => $preferences->trip_pace ?? 'متوسط',
                'activity_level' => $preferences->preferred_activity_level ?? 'متوسط',
                'budget_min' => $preferences?->budget_min,
                'budget_max' => $preferences?->budget_max,
                'interests' => $preferences?->interests,
            ],
            'input' => $input,
            'places' => $places->values(),
            'cities' => $cities,
            'guides' => $guides,
        ];
    }
}
