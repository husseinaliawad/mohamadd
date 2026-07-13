<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;

use App\Http\Resources\GuideResource;

use App\Models\Guide;


use Illuminate\Http\Request;

class GuideController extends Controller
{

    public function index(Request $request)
    {
        $guides = Guide::query()
            ->with([
                'user:id,name',
                'cities:id,name',
                'languages:id,name',
                'bookings.review:id,booking_id,rating'
            ])
            ->withCount('bookings')
            ->withCount('reviews')
            ->withAvg('reviews', 'rating')
            ->filter($request->only([
                'cities',
                'languages',
                'price',
                'status',
                'sort',
            ]))
            ->latest()
            ->paginate(12);


        $mappedGuides = $guides->map(function ($guide) {
            return new GuideResource($guide, false);
        });

        return api_success(
            $mappedGuides,
            "Guides"
        );
    }

    public function show(Guide $guide)
    {

        $guide->load([
            'user',
            'languages',
            'cities',
        ])
            ->loadCount([
                'bookings',
                'reviews',
            ])
            ->loadAvg('reviews', 'rating');

        return api_success(
            new GuideResource($guide ,false),
            "guide details"
        );
    }
}
