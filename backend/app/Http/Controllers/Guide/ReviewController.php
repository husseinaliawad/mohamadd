<?php

namespace App\Http\Controllers\Guide;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuideReviewResource;
use App\Models\GuideBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $guideId = Auth::user()->guide->id;

        // جلب الحجوزات التي تخص المرشد + تحتوي على تقييم
        $bookings = GuideBooking::with(['review', 'tourist'])
            ->where('guide_id', $guideId)
            ->whereHas('review')
            ->latest()
            ->get();

        // استخراج التقييمات فقط
        $reviews = $bookings->pluck('review');

        // حساب متوسط التقييم
        $average = $reviews->avg('rating') ?? 0;

        // توزيع النجوم
        $distribution = [
            5 => $reviews->where('rating', 5)->count(),
            4 => $reviews->where('rating', 4)->count(),
            3 => $reviews->where('rating', 3)->count(),
            2 => $reviews->where('rating', 2)->count(),
            1 => $reviews->where('rating', 1)->count(),
        ];

        return api_success([
            'average_rating' => round($average, 1),
            'total_reviews' => $reviews->count(),
            'ratings_distribution' => $distribution,
            'reviews' => GuideReviewResource::collection($bookings),
        ]);
    }
}
