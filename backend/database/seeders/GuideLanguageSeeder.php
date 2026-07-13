<?php

namespace Database\Seeders;

use App\Models\Guide;
use Illuminate\Database\Seeder;

class GuideLanguageSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // المرشد الأول
            ['guide_id' => 1, 'language_id' => 1], // عربي
            ['guide_id' => 1, 'language_id' => 2], // إنكليزي

            // المرشد الثاني
            ['guide_id' => 2, 'language_id' => 1],
            ['guide_id' => 2, 'language_id' => 3], // فرنسي
            
        ];

        foreach ($data as $item) {
            Guide::find($item['guide_id'])->languages()->attach($item['language_id']);
        }
    }
}
