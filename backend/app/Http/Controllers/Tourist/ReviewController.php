<?php

namespace App\Http\Controllers\Tourist;

use App\Http\Controllers\Controller;
use App\Models\BookingReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index()
    {
        $tourist = Auth::user();


        $reviews = BookingReview::whereHas('booking', function ($q) use ($tourist) {
            $q->where('tourist_id', $tourist->id);
        })
            ->with([
                'booking' => function ($q) {
                    $q->select('id', 'tourist_id', 'guide_id', 'trip_id', 'start_date', 'day_count', 'status', 'total_price');
                },

                // بيانات المرشد (من جدول guides)
                'booking.guide:id,user_id,gender,phone,DOB,avatar,daily_price,bio',

                // بيانات المستخدم المرتبط بالمرشد (name, email)
                'booking.guide.user:id,name,email',

                // بيانات الرحلة إن وجدت
                'booking.trip:id,title,start_date,end_date'
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        return api_success($reviews);
    }
}
