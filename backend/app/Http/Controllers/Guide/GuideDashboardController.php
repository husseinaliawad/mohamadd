<?php

namespace App\Http\Controllers\Guide;

use App\Enums\GuideBookingStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\GuideDashboardResource;
use Illuminate\Support\Facades\Auth;

class GuideDashboardController extends Controller
{
    public function index()
    {
        $guide = Auth::user()->guide;

        // عدد الرحلات المؤكدة
        $confirmedTrips = $guide->bookings()
            ->where('status', GuideBookingStatus::Accepted)
            ->count();

            // عدد الأيام المحجوزة
        $bookedDays = $guide->bookings()
            ->where('status', GuideBookingStatus::Accepted)
            ->sum('day_count');
          

        // الطلبات الجديدة
        $newRequests = $guide->bookings()
            ->where('status', 'pending')
            ->count();

        // آخر التقييمات (من جدول booking_reviews عبر guide_bookings)
        $latestReviews = $guide->bookings()
            ->whereHas('review')
            ->with(['review', 'tourist'])
            ->latest()
            ->take(5)
            ->get();

            // آخر الحجوزات
        $latestBookings = $guide->bookings()
            ->with('tourist')
            ->latest()
            ->take(5)
            ->get();
        
        return api_success(new GuideDashboardResource([
            'guide' => $guide,
            'stats' => [
                'booked_days' => $bookedDays,
                'confirmed_trips' => $confirmedTrips,
                'new_requests' => $newRequests,
            ],
            'latest_reviews' => $latestReviews,
            'latest_bookings' => $latestBookings,
        ]));
    }
}
