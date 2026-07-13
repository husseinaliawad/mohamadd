<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AlterBookingNotification extends Notification
{
    use Queueable;

    public function __construct(
        public $status,
        public $message,
        public $note = null
    ) {}

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'type' => 'alter-booking',
            'status' => $this->status, // accepted, rejected, cancelled, created
            'message' => $this->message,
            'note' => $this->note,
        ];
    }
}
