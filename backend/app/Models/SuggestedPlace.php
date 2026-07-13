<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;


#[Fillable([
    'user_id',
    'city_id',
    'name',
    'description',
    'latitude',
    'longitude',
    'images',
    'status',
    'admin_notes',
])]
class SuggestedPlace extends Model
{
    protected $appends = ['image_urls'];

    protected $casts = [
        'images' => 'array',
        'status' => \App\Enums\SuggestedPlaceStatus::class,
    ];

    protected function imageUrls(): Attribute
    {
        return Attribute::make(
            get: function () {
                $images = $this->images ?? [];
                if (! is_array($images) || empty($images)) {
                    return [];
                }

                return array_map(fn ($image) => asset('storage/suggested/' . $image), $images);
            }
        );
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
