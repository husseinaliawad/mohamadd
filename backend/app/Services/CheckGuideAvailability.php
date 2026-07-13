<?php

namespace App\Services;

use App\Enums\GuideBookingStatus;
use App\Models\Guide;
use App\Models\GuideBooking;
use Carbon\Carbon;

class CheckGuideAvailability
{

    function handle(Carbon $start, int $days, Guide $guide)
    {
        $end = (clone $start)->addDays($days - 1);

        return GuideBooking::query()
            ->where('guide_id', $guide->id)
            ->whereIn('status', [
                GuideBookingStatus::Accepted->value,
                GuideBookingStatus::Pending->value
            ])
            ->where(function ($q) use ($start, $end) {
                $q->where('start_date', '<=', $end)
                    ->whereRaw('DATE_ADD(start_date, INTERVAL day_count-1 DAY) >= ?', [$start]);
            })
            ->exists();
    }
}
