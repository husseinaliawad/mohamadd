<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['name' , 'question'])]
class Interest extends Model
{
    public function places()
    {
        return $this->belongsToMany(Place::class);
    }
}
