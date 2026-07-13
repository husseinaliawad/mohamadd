<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Interest;
use Illuminate\Http\Request;

class InterestController extends Controller
{
    public function index()
    {
        return api_success(Interest::all());
    }

    public function show(Interest $interest)
    {
        return api_success($interest);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:191',
            'question' => 'nullable|string|max:500',
        ]);

        $interest = Interest::create($data);
        return api_success($interest, 'تم الإنشاء', 201);
    }

    public function update(Request $request, Interest $interest)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:191',
            'question' => 'nullable|string|max:500',
        ]);

        $interest->update($data);
        return api_success($interest->fresh(), 'تم التحديث');
    }

    public function destroy(Interest $interest)
    {
        $interest->delete();
        return api_success(null, 'تم الحذف');
    }
}
