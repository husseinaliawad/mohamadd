<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authService->register($request->validated());

        return api_success(
            [
                'token' => $result['token'],
                'user'  => new UserResource($result['user']),
            ],
            "Account created successfully",
            Response::HTTP_CREATED
        );
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        return api_success(
            [
                'token' => $result['token'],
                'user'  => new UserResource($result['user']),
            ],
            "Account login successfully",
            Response::HTTP_OK
        );
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()?->currentAccessToken()->delete();

        return api_success(null, "Logout successful");
    }
    
    public function me(Request $request): JsonResponse
    {
        return api_success($request->user(), "Logout successful");
    }
}
