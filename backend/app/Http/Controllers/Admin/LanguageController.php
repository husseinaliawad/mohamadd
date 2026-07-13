<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function index()
    {
        return api_success(Language::all());
    }

    public function show(Language $language)
    {
        return api_success($language);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:191',
        ]);

        $language = Language::create($data);
        return api_success($language, 'تم الإنشاء', 201);
    }

    public function update(Request $request, Language $language)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:191',
        ]);

        $language->update($data);
        return api_success($language->fresh(), 'تم التحديث');
    }

    public function destroy(Language $language)
    {
        $language->delete();
        return api_success(null, 'تم الحذف');
    }
}
