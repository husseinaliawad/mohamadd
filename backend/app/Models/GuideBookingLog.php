<?php

namespace App\Models;

use App\Enums\GuideBookingStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GuideBookingLog extends Model
{
    protected $fillable = [
        'booking_id',
        'old_status',
        'new_status',
        'actor_id',
        'note',
    ];

    protected $casts = [
        'old_status' => GuideBookingStatus::class,
        'new_status' => GuideBookingStatus::class,
    ];

    /**
     * الحجز المرتبط بالسجل
     */
    public function booking(): BelongsTo
    {
        return $this->belongsTo(GuideBooking::class, 'booking_id');
    }

    /**
     * المستخدم الذي قام بالعملية (قد يكون null)
     */
    public function actor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'actor_id');
    }
}
