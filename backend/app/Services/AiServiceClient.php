<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AiServiceClient
{
    private function baseUrl(): string
    {
        return rtrim(env('AI_SERVICE_URL', 'http://127.0.0.1:8010'), '/');
    }

    public function planTrip(array $payload): array
    {
        return $this->post('/plan-trip', $payload);
    }

    public function nearbyPlaces(array $payload): array
    {
        return $this->post('/nearby-places', $payload);
    }

    private function post(string $path, array $payload): array
    {
        $response = Http::timeout(60)->post($this->baseUrl() . $path, $payload);

        if (!$response->successful() || !$response->json('success')) {
            abort(503, 'خدمة الذكاء غير متاحة حاليا');
        }

        return $response->json('data') ?? [];
    }
}
