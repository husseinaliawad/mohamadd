<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'category_id',
    'budget',
    'is_outdoor',
    'latitude',
    'longitude',
    'radius_km',
])]
class AiNearbyExplore extends Model
{
    protected $casts = [
        'is_outdoor' => 'boolean',
    ];

    public function results()
    {
        return $this->hasMany(AiNearbyExploreResult::class, 'explore_id');
    }
}
