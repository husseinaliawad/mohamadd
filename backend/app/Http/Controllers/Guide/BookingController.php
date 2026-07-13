<?php

namespace App\Http\Controllers\Guide;

use App\Enums\GuideBookingStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\GuideBookingResource;
use App\Models\GuideBooking;
use App\Notifications\AlterBookingNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $guide = Auth::user()->guide;
        $status = $request->status;
        $bookings = GuideBooking::where('guide_id', $guide->id)
            ->with(['tourist', 'logs'])
            ->status(GuideBookingStatus::tryFrom($status))
            ->orderBy('start_date' , 'desc')
            ->get();

        return api_success(data: GuideBookingResource::collection($bookings));
    }

    public function accept(GuideBooking $booking, Request $request)
    {

        Gate::authorize('acceptOrReject', $booking);

        $booking->update([
            'status' => GuideBookingStatus::Accepted,
            'last_note' => $request->note
        ]);

        $tourist = $booking->tourist;
        $tourist->notify(new AlterBookingNotification(
            status: GuideBookingStatus::Accepted->value,
            message: 'تم قبول طلب الحجز الخاص بك',
            note: $request->note
        ));


        return api_success();
    }

    public function reject(GuideBooking $booking,  Request $request)
    {
        Gate::authorize('acceptOrReject', $booking);

        $booking->update([
            'status' => GuideBookingStatus::Rejected,
            'last_note' => $request->note
        ]);

        $tourist = $booking->tourist;

        $tourist->notify(new AlterBookingNotification(
            status: GuideBookingStatus::Rejected->value,

            message: 'تم رفض طلب الحجز',
            note: $request->note
        ));

        return api_success();
    }

    public function cancel(GuideBooking $booking, Request $request)
    {
        Gate::authorize('cancelByGuide', $booking);

        $booking->update([
            'status' => GuideBookingStatus::CancelledByGuide,
            'last_note' => $request->note
        ]);

        $tourist = $booking->tourist;

        $tourist->notify(new AlterBookingNotification(
            status: GuideBookingStatus::CancelledByGuide->value,
            message: 'تم إلغاء الحجز',
            note: $request->note
        ));


        return api_success();
    }
}
