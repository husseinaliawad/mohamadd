<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name', 'description', 'image'])]
class City extends Model
{
    protected $appends = ['image_url'];

    public function getImageUrlAttribute(): ?string
    {
        if (empty($this->image)) {
            return null;
        }
        return asset('storage/cities/' . $this->image);
    }

    public function places()
    {
        return $this->hasMany(Place::class);
    }
}
