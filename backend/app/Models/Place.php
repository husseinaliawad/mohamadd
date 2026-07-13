<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;


#[Fillable([
    'city_id',
    'category_id',
    'name',
    'description',
    'phone',
    'address',
    'cost',
    'expected_duration_minutes',
    'activity_level',
    'is_outdoor',
    'best_seasons',
    'recommended_times',
    'opening_hours',
    'average_rating',
    'reviews_count',
    'latitude',
    'longitude',
])]
class Place extends Model
{
    protected $casts = [
        'best_seasons' => 'array',
        'recommended_times' => 'array',
    ];


    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function images()
    {
        return $this->hasMany(PlaceImage::class);
    }

    public function interests()
    {
        return $this->belongsToMany(Interest::class);
    }

    public function reviews()
    {
        return $this->hasMany(PlaceReview::class);
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
