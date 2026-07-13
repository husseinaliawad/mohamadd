<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class SuggestedPlaceSubmittedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public int $suggestedPlaceId,
        public string $placeName,
        public ?string $cityName,
        public string $submittedBy
    ) {}

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'type' => 'suggested-place-submitted',
            'message' => 'تمت إضافة اقتراح مكان جديد يحتاج إلى مراجعة',
            'suggested_place_id' => $this->suggestedPlaceId,
            'place_name' => $this->placeName,
            'city_name' => $this->cityName,
            'submitted_by' => $this->submittedBy,
        ];
    }
}
