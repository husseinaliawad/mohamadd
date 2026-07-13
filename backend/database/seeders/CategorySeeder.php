<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $types = [
            'منتزه',
            'مطعم',
            'مقهى',
            'فندق',
            'نزل',
            'شاليه',
            'منتجع',
            'مخيم',
            'شاطئ',
            'نهر',
            'جبل',
            'حديقة عامة',
            'متحف',
            'مسرح',
            'سينما',
            'مركز ثقافي',
            'سوق شعبي',
            'مركز تسوق',
            'بازار',
            'مدينة ألعاب',
            'حديقة مائية',
            'مسجد',
            'كنيسة',
            'مقام',
            'موقع أثري',
            'قلعة',
            'مدينة قديمة'
        ];

        foreach ($types as $type) {
            Category::create([
                'name' => $type
            ]);
        }
    }
}
