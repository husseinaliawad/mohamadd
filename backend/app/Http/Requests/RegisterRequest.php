<?php

// app/Http/Requests/RegisterRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class RegisterRequest extends FormRequest
{
    public function rules()
    {
        return [
            'role' => 'required|in:tourist,guide',

            'name' => 'required|string|min:2',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',

            // guide only
            'DOB'         => 'required_if:role,guide|date',
            'phone'       => 'required_if:role,guide|string|min:8',
            'daily_price' => 'required_if:role,guide|numeric|min:1',
            'bio'         => 'required_if:role,guide|string|min:10',
            'gender'      => 'string|in:M,F',
            'avatar'      => 'nullable|image|max:2048',

            'languages' => 'nullable|array',
            'languages.*' => 'integer|exists:languages,id',
        ];
    }


    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            api_error(
                $validator->errors(),
                "Invalid inputs",
                422
            )
        );
    }
}
