<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewBookingNotification extends Notification
{
    use Queueable;

    public function __construct(
        public $touristName,
        public $startDate,
        public $days
    ) {}

    public function via($notifiable)
    {
        return ['database']; // in-app only
    }

    public function toDatabase($notifiable)
    {
        return [
            'type' => 'new-booking',
            'tourist_name' => $this->touristName,
            'message' => "لديك طلب حجز جديد",
            'start_date' => $this->startDate,
            'days' => $this->days,
        ];
    }
}
