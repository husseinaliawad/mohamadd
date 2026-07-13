<?php

namespace App\Observers;

use App\Models\SuggestedPlace;
use App\Models\User;
use App\Enums\UserRole;
use App\Notifications\SuggestedPlaceSubmittedNotification;
use Illuminate\Support\Facades\Notification;

class SuggestedPlaceObserver
{
    /**
     * التعامل مع حدث بعد إنشاء السجل بنجاح.
     */
    public function created(SuggestedPlace $suggestedPlace): void
    {
        $admins = User::where('role', UserRole::Admin->value)->get();

        if ($admins->isNotEmpty()) {
            Notification::send($admins, new SuggestedPlaceSubmittedNotification(
                $suggestedPlace->id,
                $suggestedPlace->name,
                $suggestedPlace->city?->name,
                $suggestedPlace->user?->name ?? 'مستخدم'
            ));
        }
    }
}
