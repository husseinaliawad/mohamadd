<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return api_success(Category::all());
    }

    public function show(Category $category)
    {
        return api_success($category);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:191',
        ]);

        $category = Category::create($data);
        return api_success($category, 'تم الإنشاء', 201);
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:191',
        ]);

        $category->update($data);
        return api_success($category, 'تم التحديث');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return api_success(null, 'تم الحذف');
    }
}
