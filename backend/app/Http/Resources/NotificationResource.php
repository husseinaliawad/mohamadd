<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'data'       => $this->data,          // كل الحقول كما هي
            'is_read'    => !is_null($this->read_at),
            'created_at' => $this->created_at->diffForHumans(),
        ];
    }
}
