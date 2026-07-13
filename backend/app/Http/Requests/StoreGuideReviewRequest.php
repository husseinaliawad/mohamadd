<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGuideReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        // يمكن إضافة شرط صلاحيات (مثلاً: فقط من قام بالحجز)
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id'  => ['required','exists:users,id'],
            'guide_id' => ['required','exists:guides,id'],
            'rating'   => ['required','integer','min:1','max:5'],
            'comment'  => ['nullable','string','max:1000'],
        ];
    }
}
