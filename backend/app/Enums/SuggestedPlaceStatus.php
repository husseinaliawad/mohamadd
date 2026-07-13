<?php

namespace App\Enums;
enum SuggestedPlaceStatus: string
{
    case Pending = 'pending';
    case Approved = 'approved';
    case Rejected = 'rejected';

    function label(): string
    {
        return match ($this) {
            self::Pending => 'قيد الانتظار',
            self::Approved => 'مقبول',
            self::Rejected => 'مرفوض',
        };
    }
}