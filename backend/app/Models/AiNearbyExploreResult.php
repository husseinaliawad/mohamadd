<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'explore_id',
    'place_id',
    'distance_km',
])]
class AiNearbyExploreResult extends Model
{
    protected $table = 'ai_nearby_explores_results';

    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}
