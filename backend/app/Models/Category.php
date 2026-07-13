<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Table(timestamps: false)]
#[Fillable(['name'])]
class Category extends Model
{
    public function places(): HasMany
    {
        return $this->hasMany(Place::class);
    }
}
