<?php

namespace App\Enums;

enum GuideBookingStatus: string
{
    case Pending = 'pending';
    case Accepted = 'accepted';
    case Rejected = 'rejected';
    case CancelledByTourist = 'cancelled_by_tourist';
    case CancelledByGuide = 'cancelled_by_guide';
    case Expired = 'expired';
    case Completed = 'completed';

    function label(): string
    {
        return match ($this) {
            self::Pending => 'قيد الانتظار',
            self::Accepted => 'مقبول',
            self::Rejected => 'مرفوض',
            self::CancelledByTourist => 'ملغى من قبل السائح',
            self::CancelledByGuide => 'ملغى من قبل المرشد',
            self::Expired => 'انتهت صلاحيته',
            self::Completed => 'مكتمل',
        };
    }
}
