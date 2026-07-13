<?php

namespace Database\Seeders;

use App\Enums\GuideBookingStatus;
use App\Models\GuideBooking;
use App\Models\GuideBookingLog;
use App\Models\BookingReview;
use App\Models\Guide;
use App\Models\User;
use App\Notifications\NewBookingNotification;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class BookingAndLogِsAndReviewsSeeder extends Seeder
{
    public function run(): void
    {
        $today = Carbon::today();

        $bookings = [
            [
                'offset' => +40,
                'day_count' => 3,
                'status' => GuideBookingStatus::Accepted,
                'description' => 'جولة قديمة انتهت منذ فترة.',
                'should_review' => true,
                'cancelled_by_user' => false,
            ],
            [
                'offset' => +10,
                'day_count' => 2,
                'status' => GuideBookingStatus::Accepted,
                'description' => 'جولة انتهت حديثاً.',
                'should_review' => false,
                'cancelled_by_user' => false,
            ],
            [
                'offset' => +20,
                'day_count' => 1,
                'status' => GuideBookingStatus::Accepted,
                'description' => 'جولة مستقبلية بعيدة.',
                'should_review' => false,
                'cancelled_by_user' => false,
            ],
            [
                'offset' => +3,
                'day_count' => 1,
                'status' => GuideBookingStatus::Pending,
                'description' => 'جولة مستقبلية قريبة.',
                'should_review' => false,
                'cancelled_by_user' => false,
            ],
            [
                'offset' => +4,
                'day_count' => 1,
                'status' => GuideBookingStatus::Pending,
                'description' => 'جولة مستقبلية قريبة.',
                'should_review' => false,
                'cancelled_by_user' => false,
            ],
            [
                'offset' => +20,
                'day_count' => 3,
                'status' => GuideBookingStatus::Accepted,
                'description' => 'جولة مستقبلية بعيدة.',
                'should_review' => false,
                'cancelled_by_user' => false,
            ],
            [
                'offset' => +10,
                'day_count' => 1,
                'status' => GuideBookingStatus::Rejected,
                'description' => 'تم رفض الحجز.',
                'should_review' => false,
                'cancelled_by_user' => false,
            ],
            [
                'offset' => +15,
                'day_count' => 1,
                'status' => GuideBookingStatus::CancelledByTourist,
                'description' => 'تم إلغاء الحجز من قبل المستخدم.',
                'should_review' => false,
                'cancelled_by_user' => true,
            ],
        ];

        $created = [];

        foreach ($bookings as $i => $data) {
            
            $createdAt = $today->copy()->subDays($data['offset']);
            
            $startDate = $today->copy()->addDays(rand(5,10));
            $endDate   = $startDate->copy()->addDays($data['day_count']);

            $updatedAt = $createdAt->copy()->addDays(rand(1, 3));

            // dump([
            //     'start_date' => $startDate->toDateTimeString(),
            //     'created_at' => $createdAt->toDateTimeString(),
            //     'updated_at' => $updatedAt->toDateTimeString(),
            // ]);
            
            $cancelDate = $data['cancelled_by_user'] ? $updatedAt->copy() : null;

            /*
            |--------------------------------------------------------------------------
            | تحديد الحالة النهائية (Completed إذا انتهت الرحلة)
            |--------------------------------------------------------------------------
            */
            $finalStatus = $data['status'];

            if (
                $data['status'] === GuideBookingStatus::Accepted &&
                $endDate->isPast()
            ) {
                $finalStatus = GuideBookingStatus::Completed;
            }

            /*
            |--------------------------------------------------------------------------
            | إنشاء الحجز
            |--------------------------------------------------------------------------
            */
            $booking = GuideBooking::create([
                'tourist_id' => 2,
                'guide_id' => 1,
                'start_date' => $startDate,
                'day_count' => $data['day_count'],
                'total_price' => $data['day_count'] * 10,
                'status' => $finalStatus,
                'description' => $data['description'],
                'created_at' => $createdAt,
                'updated_at' => $updatedAt,
            ]);

            if ($booking->status ===  GuideBookingStatus::Pending)
                $booking->guide->user->notify(new NewBookingNotification(
                touristName: User::find(rand(2,3))->name,
                startDate: $booking->start_date,
                days: $booking->day_count
            ));

            $created[$i] = $booking;

            /*
            |--------------------------------------------------------------------------
            | إضافة Log حسب الحالة
            |--------------------------------------------------------------------------
            */

            // Pending → لا Log
            if ($data['status'] === GuideBookingStatus::Pending) {
                continue;
            }

            // Accepted → Log الموافقة
            if ($data['status'] === GuideBookingStatus::Accepted) {
                GuideBookingLog::create([
                    'booking_id' => $booking->id,
                    'old_status' => GuideBookingStatus::Pending,
                    'new_status' => GuideBookingStatus::Accepted,
                    'note' => 'تمت الموافقة على الحجز.',
                    'created_at' => $updatedAt,
                ]);
            }

            // Completed → Log انتهاء الرحلة
            if ($finalStatus === GuideBookingStatus::Completed) {
                GuideBookingLog::create([
                    'booking_id' => $booking->id,
                    'old_status' => GuideBookingStatus::Accepted,
                    'new_status' => GuideBookingStatus::Completed,
                    'note' => 'انتهت الجولة وتم إكمال الحجز.',
                    'created_at' => $endDate,
                ]);
            }

            // Rejected
            if ($data['status'] === GuideBookingStatus::Rejected) {
                GuideBookingLog::create([
                    'booking_id' => $booking->id,
                    'old_status' => GuideBookingStatus::Pending,
                    'new_status' => GuideBookingStatus::Rejected,
                    'note' => 'تم رفض الحجز.',
                    'created_at' => $updatedAt,
                ]);
            }

            // Cancelled by tourist
            if ($data['status'] === GuideBookingStatus::CancelledByTourist) {
                GuideBookingLog::create([
                    'booking_id' => $booking->id,
                    'old_status' => GuideBookingStatus::Accepted,
                    'new_status' => GuideBookingStatus::CancelledByTourist,
                    'note' => 'إلغاء الحجز من قبل السائح.',
                    'created_at' => $cancelDate,
                ]);
            }
        }

        /*
        |--------------------------------------------------------------------------
        | إنشاء تقييمات للحجوزات المكتملة فقط
        |--------------------------------------------------------------------------
        */
        $comments = [
            'جولة ممتازة وممتعة.',
            'المرشد كان رائعاً.',
            'تجربة جيدة بشكل عام.',
            'معلومات قيمة جداً.',
            'كانت الجولة أقل من المتوقع.',
            
        ];

        foreach ($created as $i => $booking) {

            if (
                $booking->status === GuideBookingStatus::Completed &&
                $bookings[$i]['should_review'] === true
            ) {
                BookingReview::create([
                    'booking_id' => $booking->id,
                    'rating' => rand(3, 5),
                    'comment' => $comments[array_rand($comments)],
                ]);
            }
        }


     /*
        |--------------------------------------------------------------------------
        | إنشاء حجوزات قديمة مع تقييم
        |--------------------------------------------------------------------------
        */
        $tourists = User::where('role', 'tourist')->get();
        $guides = Guide::get();

        if ($tourists->isEmpty() || $guides->isEmpty()) {
            $this->command->warn(" لا يوجد سياح أو مرشدون في قاعدة البيانات.");
            return;
        }       

        foreach ($guides as $guide) {

            foreach ($tourists as $tourist) {

                // إنشاء 3 حجوزات لكل سائح مع كل مرشد
                for ($i = 0; $i < 3; $i++) {

                    $startDate = Carbon::today()->subDays(rand(1, 60)); 
                    $dayCount = rand(1, 3);

                    $booking = GuideBooking::create([
                        'tourist_id' => $tourist->id,
                        'guide_id' => $guide->id,
                        'trip_id' => null,
                        'start_date' => $startDate,
                        'day_count' => $dayCount,
                        'status' => GuideBookingStatus::Accepted,
                        'description' => 'حجز تجريبي.',
                        'total_price' => rand(50, 200),
                        'last_note' => 'تمت الجولة بنجاح.',
                    ]);

                    // 50% من الحجوزات تحصل على تقييم
                    if (rand(0, 1) === 1) {
                        BookingReview::create([
                            'booking_id' => $booking->id,
                            'rating' => rand(3, 5),
                            'comment' => $comments[array_rand($comments)],
                            'created_at' => now()->subtract('day' , rand(1,10)),
                        ]);
                    }
                }
            }
        }



        $this->command->info(" تم إنشاء حجوزات  و سجلات نتابعة وتقييمات وإشعارات بنجاح.");
    }
}
