<?php

namespace App\Policies;

use App\Enums\GuideBookingStatus;
use App\Models\GuideBooking;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GuideBookingPolicy
{

    /**
     * إلغاء الحجز من قبل السائح
     */

    public function cancelByTourist(User $user, GuideBooking $booking): Response
    {
        if ($user->id !== $booking->tourist_id) {
            return Response::deny('لا يمكنك إلغاء حجز لا يخصك.');
        }

        if (!in_array($booking->status, [
            GuideBookingStatus::Pending,
            GuideBookingStatus::Accepted,
        ])) {
            return Response::deny(
                'لا يمكن إلغاء حجز حالته ' . $booking->status->label()
            );
        }

        return Response::allow();
    }

    /**
     * كتابة مراجعة (السائح فقط)
     */
    public function review(User $user, GuideBooking $booking): Response
    {
        if ($user->id !== $booking->tourist_id) {
            return Response::deny('لا يمكنك كتابة مراجعة لحجز لا يخصك.');
        }

        if ($booking->status !== GuideBookingStatus::Completed) {
            return Response::deny('يمكنك كتابة مراجعة فقط بعد انتهاء الرحلة.');
        }

        if ($booking->review()->exists()) {
            return Response::deny('لقد قمت بكتابة مراجعة مسبقاً.');
        }

        return Response::allow();
    }

    /**
     * عرض الحجز (السائح + المرشد + الأدمن)
     */
    public function view(User $user, GuideBooking $booking): Response
    {
        if (
            $user->id === $booking->tourist_id
            || $user?->guide?->id === $booking->guide_id
            || $user->isAdmin()
        ) {
            return Response::allow();
        }

        return Response::deny('لا يمكنك عرض هذا الحجز.');
    }
    /**
     * إلغاء الحجز من قبل المرشد
     */
    public function cancelByGuide(User $user, GuideBooking $booking): Response
    {
        // 1) يجب أن يكون المرشد صاحب الحجز
        if ($user?->guide?->id !== $booking->guide_id) {
            return Response::deny('لا يمكنك إلغاء حجز لا يخصك.');
        }

        // 2) يجب أن تكون الحالة Accepted فقط
        if ($booking->status !== GuideBookingStatus::Accepted) {
            return Response::deny('يمكن للمرشد إلغاء الحجوزات المقبولة فقط.');
        }

        return Response::allow();
    }

    /**
     * قبول أو رفض الحجز من قبل المرشد
     */
    public function acceptOrReject(User $user, GuideBooking $booking): Response
    {
        // 1) يجب أن يكون المرشد صاحب الحجز
        if ($user?->guide?->id !== $booking->guide_id) {
           return Response::deny('لا يمكنك إدارة حجز لا يخصك.');
        }

        // 2) يجب أن تكون الحالة Pending فقط
        if ($booking->status !== GuideBookingStatus::Pending) {
            return Response::deny('يمكن إدارة الحجوزات المعلقة فقط.');
        }

        return Response::allow();
    }
}
