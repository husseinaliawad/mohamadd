<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        return api_success(City::all());
    }

    public function show(City $city)
    {
        return api_success($city);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:191',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('cities');
            $data['image'] = basename($path);
        } 

        $city = City::create($data);
        return api_success($city, 'تم الإنشاء', 201);
    }

    public function update(Request $request, City $city)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:191',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('cities');
            $data['image'] = basename($path);
        } 

        $city->update($data);
        return api_success($city, 'تم التحديث');
    }

    public function destroy(City $city)
    {
        $city->delete();
        return api_success(null, 'تم الحذف');
    }
}
