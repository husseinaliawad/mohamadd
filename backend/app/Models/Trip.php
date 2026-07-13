<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;          


#[Fillable([
    'user_id',
    'title',
    'budget_max',
    'trip_pace',
    'preferred_activity_level',
    'start_date',
    'day_count',
    'total_estimated_cost',
])]


class Trip extends Model
{

protected $casts = [
    'start_date' => 'date',
    'end_date' => 'date',
];
  
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tripPlaces()
    {
        return $this->hasMany(TripPlace::class);
    }
}
