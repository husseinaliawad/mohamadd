<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlaceResource;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    public function index()
    {
        return api_success(PlaceResource::collection(Place::with(['city','category','images','interests'])->get()));
    }

    public function show(Place $place)
    {
        return api_success(new PlaceResource($place->load(['city','category','images','interests','reviews'])));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'city_id' => 'required|exists:cities,id',
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:191',
            'description' => 'nullable|string',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'cost' => 'nullable|numeric',
            'expected_duration_minutes' => 'nullable|integer',
            'activity_level' => 'nullable|in:relax,sensible,vigour',
            'is_outdoor' => 'boolean',
            'best_seasons' => 'nullable|array',
            'recommended_times' => 'nullable|array',
            'opening_hours' => 'nullable|array',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $place = Place::create($data);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('places', 'public');
                $place->images()->create([
                    'image_url' => basename($path),
                ]);
            }
        }

        if ($request->has('interests')) {
            $place->interests()->sync($request->input('interests'));
        }

        return api_success(new PlaceResource($place->load(['city','category','images','interests'])), 'تم الإنشاء', 201);
    }

    public function update(Request $request, Place $place)
    {
        $data = $request->validate([
            'city_id' => 'sometimes|required|exists:cities,id',
            'category_id' => 'sometimes|required|exists:categories,id',
            'name' => 'sometimes|required|string|max:191',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $place->update($data);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('places', 'public');
                $place->images()->create([
                    'image_url' => basename($path),
                ]);
            }
        }

        if ($request->has('interests')) {
            $place->interests()->sync($request->input('interests'));
        }

        return api_success(new PlaceResource($place->load(['city','category','images','interests'])), 'تم التحديث');
    }

    public function destroy(Place $place)
    {
        $place->delete();
        return api_success(null, 'تم الحذف');
    }
}
