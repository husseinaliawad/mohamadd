<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name'])]
class Language extends Model
{
    public function guides()
    {
        return $this->belongsToMany(Guide::class);
    }
}
