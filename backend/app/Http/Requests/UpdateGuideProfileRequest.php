<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGuideProfileRequest extends FormRequest
{
    public function authorize(): bool
    {    
        return true;
    }

    public function rules()
    {
        return [
            'bio' => 'nullable|string|max:500',
            'daily_price' => 'required|numeric|min:1',

            // اللغات
            'languages' => 'required|array',
            'languages.*' => 'exists:languages,id',

            // المدن
            'cities' => 'required|array',
            'cities.*' => 'exists:cities,id',

            'status' => 'required|in:active,unavailable',
            'avatar' => 'nullable|image|max:2048',
            'phone' => 'required|string|max:20',
        ];
    }
}
