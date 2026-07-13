<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserRole;
use App\Enums\UserStatus;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password', 'role', 'status'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    public function interests()
    {
        return $this->belongsToMany(Interest::class);
    }

    public function guide()
    {
        return $this->hasOne(Guide::class);
    }

    public function trips()
    {
        return $this->hasMany(Trip::class);
    }

    public function Bookings()
    {
        return $this->hasMany(GuideBooking::class, 'user_id');
    }
    
    public function suggestedPlaces()
    {
        return $this->hasMany(SuggestedPlace::class);
    }


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
            'status' => UserStatus::class
        ];
    }

    function isAdmin(){
        return $this->role === UserRole::Admin;
    }
    function isTourist(){
        return $this->role === UserRole::Tourist;
    }
    function isGuide(){
        return $this->role === UserRole::Guide;
    }
    function isActive(){
        return $this->status === UserStatus::Active 
        || $this->status === UserStatus::Unavailable;
    }
    function isAvailable(){
        return $this->status === UserStatus::Active; 
    }
    
}
