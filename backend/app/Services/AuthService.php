<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\UserRole;
use App\Models\Guide;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function register(array $data): array
    {
        return DB::transaction(function () use ($data) {

            $user = User::create([
                'name'     => $data['name'],
                'email'    => $data['email'],
                'password' => Hash::make($data['password']),
                'role'     => $data['role'],
            ]);

            if (UserRole::from($data['role']) === UserRole::Guide) {
                $avatarPath = isset($data['avatar'])
                    ? $data['avatar']->store('avatars')
                    : null;

                $guide = Guide::create([
                    'user_id'       => $user->id,
                    'gender'        => $data['gender'],
                    'phone'         => $data['phone'],
                    'DOB'           => $data['DOB'],
                    'daily_price' => $data['daily_price'],
                    'bio'           => $data['bio'],
                    'avatar'        => $avatarPath,
                ]);

                if ($data['languages']??null){
                    $guide->languages()->attach($data['languages']);
                }
            }

            $token = $user->createToken("token")->plainTextToken;

            return [
                'user'  => $user,
                'token' => $token,
            ];
        });
    }

    public function login(array $data): array
    {
        $user = User::where('email', $data['email'])->first();

        if ($user && ($user->status ===  \App\Enums\UserStatus::Blocked || $user->status === \App\Enums\UserStatus::Closed) ) {
            throw ValidationException::withMessages([
                'email' => ['الحساب ' . $user->status->label()],
            ]);
        }
        
        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['بيانات التوثق غير صحيحة'],
            ]);
        }

        return [
            'user'  => $user,
            'token' => $user->createToken("token")->plainTextToken,
        ];
    }
}
