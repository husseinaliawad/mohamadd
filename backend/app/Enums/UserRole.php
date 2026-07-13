<?php

namespace App\Enums;

enum UserRole: string
{
    case Tourist = 'tourist';
    case Guide = 'guide';
    case Admin = 'admin';
}
