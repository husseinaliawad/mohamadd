<?php

namespace App\Observers;

use App\Models\GuideBooking;

class GuideBookingObserver
{
    /**
     * Handle the GuideBooking "created" event.
     */
    public function created(GuideBooking $guideBooking): void
    {
        
    }

    /**
     * Handle the GuideBooking "updated" event.
     */    
    public function updated(GuideBooking $booking): void
    {
        if (! $booking->wasChanged('status')) {
            return;
        }

        $booking->logs()->create([
            'old_status' => $booking->getOriginal('status'),
            'new_status' => $booking->status,            
            'note' => $booking->last_note,
        ]);
    }

    /**
     * Handle the GuideBooking "deleted" event.
     */
    public function deleted(GuideBooking $guideBooking): void
    {
        //
    }

    /**
     * Handle the GuideBooking "restored" event.
     */
    public function restored(GuideBooking $guideBooking): void
    {
        //
    }

    /**
     * Handle the GuideBooking "force deleted" event.
     */
    public function forceDeleted(GuideBooking $guideBooking): void
    {
        //
    }

    public function retrieved(GuideBooking $booking): void
    {
        $start = \Carbon\Carbon::parse($booking->start_date);
        $end = $start->copy()->addDays($booking->day_count);

        if (
            $booking->status === \App\Enums\GuideBookingStatus::Accepted &&
            now()->greaterThan($end)
        ) {
            $booking->status = \App\Enums\GuideBookingStatus::Completed;
            $booking->saveQuietly();
        }
        if (
            $booking->status === \App\Enums\GuideBookingStatus::Pending &&
            now()->greaterThan($end)
        ) {
            $booking->status = \App\Enums\GuideBookingStatus::Expired;
            $booking->saveQuietly();
        }
    }
}
