<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GuideBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'trip_id'    => ['sometimes' , 'nullable','exists:trips,id'],
            'start_date'  => ['required','date','after_or_equal:today'],
            'day_count'  => ['required','integer','min:1' , 'max:30'],
            'description'=> ['required','string','max:1000'],
        ];
    }
}
