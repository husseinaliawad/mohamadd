<?php
namespace App\Enums;


enum UserStatus: string{
    case Active = 'active';
    case Blocked = 'blocked';
    case Unavailable = 'unavailable';
    case Closed = 'closed';

    function label(): string
    {
        return match ($this) {
            self::Active => 'نشط',
            self::Blocked => 'محظور',
            self::Unavailable => 'غير متاح',
            self::Closed => 'مغلق',
        };
    }
}