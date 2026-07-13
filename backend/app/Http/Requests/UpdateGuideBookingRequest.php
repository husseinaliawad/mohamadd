<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateGuideBookingRequest extends FormRequest
{
    public function authorize(): bool
    {    
        return true;
    }

    public function rules(): array
    {
        return [
            'status'     => ['required','in:pending,accepted,rejected,canceled'],
            'guide_note' => ['nullable','string','max:500'],
        ];
    }
}
