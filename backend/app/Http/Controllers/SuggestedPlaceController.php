<?php

namespace App\Http\Controllers;

use App\Models\SuggestedPlace;
use Illuminate\Http\Request;

class SuggestedPlaceController extends Controller
{
    public function index(Request $request)
    {
        $query = SuggestedPlace::query()->with(['user', 'city']);

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return api_success($query->latest()->get());
    }

    public function show(SuggestedPlace $suggestedPlace)
    {
        return api_success($suggestedPlace->load(['user', 'city']));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'city_id' => 'required|exists:cities,id',
            'name' => 'required|string|max:191',
            'description' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'images' => 'nullable|array',
        ]);

        $data['user_id'] = $data['user_id'] ?? $request->user()?->id;

        $storedImages = [];
        if ($request->hasFile('image')) {
            $storedImages[] = $request->file('image')->store('suggested-places', 'public');
        }

        if (! empty($data['images'])) {
            $storedImages = array_merge($storedImages, (array) $data['images']);
        }

        $data['images'] = array_values(array_filter(array_unique($storedImages)));
        unset($data['image']);

        $suggestedPlace = SuggestedPlace::create($data);
        return api_success($suggestedPlace->load(['user', 'city']), 'تم الإنشاء', 201);
    }

    public function updateStatus(Request $request, SuggestedPlace $suggestedPlace)
    {
        $data = $request->validate([
            'status' => 'sometimes|in:pending,approved,rejected',
            'admin_notes' => 'nullable|string',
        ]);

        $suggestedPlace->update($data);
        return api_success($suggestedPlace->fresh()->load(['user', 'city']), 'تم التحديث');
    }

    public function review(Request $request, SuggestedPlace $suggestedPlace)
    {
        $data = $request->validate([
            'status' => 'required|in:approved,rejected',
            'admin_notes' => 'nullable|string',
        ]);

        $suggestedPlace->update($data);
        return api_success($suggestedPlace->fresh()->load(['user', 'city']), 'تمت مراجعة الطلب');
    }

    public function destroy(SuggestedPlace $suggestedPlace)
    {
        $suggestedPlace->delete();
        return api_success(null, 'تم الحذف');
    }
}
