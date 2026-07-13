<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'user_id',
    'interests',
    'trip_pace',
    'preferred_activity_level',
    'budget_min',
    'budget_max'
])]
class UserInterest extends Model
{
    protected function casts(): array
    {
        return [
            'interests' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
