<?php

namespace App\Models;

use App\Enums\UserStatus;
use App\Exceptions\BadDataException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable([
    'user_id',
    'gender',
    'phone',
    'DOB',
    'avatar',
    'daily_price',
    'bio',
])]
class Guide extends Model
{
    protected $casts = [
        // 'average_rating' => 'float',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function bookings()
    {
        return $this->hasMany(GuideBooking::class, 'guide_id');
    }

    public function reviews()
    {
        return $this->hasManyThrough(BookingReview::class, GuideBooking::class, secondKey: 'booking_id');
    }

    public function languages(): BelongsToMany
    {
        return $this->belongsToMany(Language::class)->withTimestamps();
    }

    public function cities(): BelongsToMany
    {
        return $this->belongsToMany(City::class);
    }
    
    
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        return $query
            // فلترة المدينة (M-M)
            ->when($filters['cities'] ?? null, function ($q, $cities) {
                //أحضر فقط المرشدين الذين لهم مدينة موافقة للمدن المطلوبة
                $q->whereHas('cities', function ($q2) use ($cities) {
                    is_array($cities)
                        ? $q2->whereIn('cities.id', $cities)
                        : $q2->where('cities.id', $cities);
                });
            })

            // فلترة اللغات (M-M)
            ->when($filters['languages'] ?? null, function ($q, $lang) {
                $q->whereHas('languages', function ($q2) use ($lang) {
                    is_array($lang)
                        ? $q2->whereIn('languages.id', $lang)
                        : $q2->where('languages.id', $lang);
                });
            })

            // السعر الأعلى
            ->when(
                $filters['price'] ?? null,
                fn($q, $price) => $q->where('daily_price', '<=', $price)
            )
            
            // فلترة الحالة (UserStatus من نص)
            ->when($filters['status'] ?? null, function ($q, $status) {
                try {
                    $enumStatus = UserStatus::from($status); // يحوّل النص إلى Enum أو يرمي خطأ
                    $q->whereHas('user', fn($q2) => $q2->where('status', $enumStatus->value));
                } catch (\ValueError $e) {
                    throw new BadDataException("قيمة حالة الحساب '{$status}' غير صحيحة");
                }
            })

            // الترتيب
            ->when($filters['sort'] ?? null, function ($q, $sort) {
                return match ($sort) {
                    'price_asc'  => $q->orderBy('daily_price', 'asc'),
                    'price_desc' => $q->orderBy('daily_price', 'desc'),
                    'rating'     => $q->orderBy('rating_avg', 'desc'),
                    default      => $q->latest(),
                };
            });
    }
}
