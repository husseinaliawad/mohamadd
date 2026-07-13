<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Interest; // أو Type إذا كان اسم الجدول type
use Illuminate\Support\Facades\DB;

class InterestUserSeeder extends Seeder
{
    public function run(): void
    {
        // مثال: ربط بعض المستخدمين ببعض الاهتمامات
        $data = [
            [
                'user_id' => 2,   // أمير
                'interest_id' => 1, // طبيعة
            ],
            [
                'user_id' => 2,
                'interest_id' => 3, // جبل
            ],
            [
                'user_id' => 3,   // سارة
                'interest_id' => 2, // بحر
            ],
            [
                'user_id' => 4,   // محمد
                'interest_id' => 5, // تسوق
            ],
            [
                'user_id' => 5,   // فاطمة
                'interest_id' => 7, // متاحف
            ],
            [
                'user_id' => 6,   // يوسف
                'interest_id' => 4, // نهر
            ],
        ];

        DB::table('interest_user')->insert($data);
    }
}
