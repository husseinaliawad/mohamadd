<?php

namespace App\Http\Controllers\Tourist;

use App\Enums\GuideBookingStatus;
use App\Http\Controllers\Controller;

use App\Http\Requests\GuideBookingRequest;

use App\Http\Resources\GuideBookingResource;
use App\Models\BookingReview;
use App\Models\Guide;
use App\Models\GuideBooking;
use App\Notifications\AlterBookingNotification;
use App\Notifications\NewBookingNotification;
use App\Services\CheckGuideAvailability;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class GuideBookingController extends Controller
{
    public function index()
    {
        $bookings = GuideBooking::with([
            'guide:id,user_id,avatar',
            'guide.user:id,name',
            'review'
        ])->where('tourist_id', Auth::id())
            ->orderBy('start_date' , 'desc')
            ->get();
        // return $bookings;
        return api_success(GuideBookingResource::collection($bookings), "كافة الحجوزات");
    }

    public function show(GuideBooking $booking)
    {
        $booking = $booking->load([
            'guide:id,user_id,avatar',
            'guide.user:id,name',
            'review',
            'logs'
        ]);

        // return $guideBooking;
        return api_success(new GuideBookingResource($booking), "بيانات الحجز");
    }

    public function book(GuideBookingRequest $request, CheckGuideAvailability $checkGuideAvailability, Guide $guide)
    {

        if (! $guide->user->isAvailable()) {
            return api_error(message: 'لا يمكن الحجز مع مرشد غير متاح.' , status: 422);
        }

        //فحص هل المرشد محجوز
        if (
            $checkGuideAvailability->handle(
                new Carbon($request->start_date),
                $request->day_count,
                $guide
            )
        )
        return api_error(message: 'المرشد محجوز مسبقًا في هذه الفترة.' ,status: 422);

        $data = $request->validated();

        $data['total_price'] = $data['day_count'] * $guide->daily_price;
        $data['tourist_id'] = $request->user()->id;
        $data['guide_id'] = $guide->id;

        $booking = GuideBooking::create($data);
         
        $guide->user->notify(new NewBookingNotification(
                touristName: Auth::user()->name,
                startDate: $booking->start_date,
                days: $booking->day_count
            ));

        return api_success(new GuideBookingResource($booking), "تم إضافة الحجز", 201);
    }

    public function cancel(GuideBooking $booking, Request $request)
    {        
        Gate::authorize('cancelByTourist', $booking);
        // 3) يجب ألا يكون الفرق أقل من 7 أيام
        $daysDiff = now()->diffInDays($booking->start_date, absolute: false);

        if ($daysDiff < 7) {
            throw new AuthorizationException('عذراً، بقي أقل من أسبوع للرحلة ولا يمكن إلغاء الحجز.');
        }

        $booking->update([
            'status' => GuideBookingStatus::CancelledByTourist,
            'last_note'   => $request->note,
        ]);

        $booking =  $booking->load('logs');

        $guide = $booking->guide->user;
        $guide->notify(new AlterBookingNotification(
            status: GuideBookingStatus::CancelledByTourist->value,
            message: 'تم إلغاء الحجز من قبل السائح',
            note: $request->note
        ));

        return api_success(new GuideBookingResource($booking), ['message' => 'تم إلغاء الحجز بنجاح']);
    }


    public function review(Request $request, GuideBooking $booking)
    {
        Gate::authorize('review', $booking);

        $data = $request->validate([
            'rating'  => ['required', 'integer', 'between:1,5'],
            'comment' => ['nullable', 'string', 'max:2000'],
        ]);

        $data['booking_id'] = $booking->id;
        BookingReview::create($data);

        return api_success(['message' => 'تم إرسال المراجعة.']);
    }
}
