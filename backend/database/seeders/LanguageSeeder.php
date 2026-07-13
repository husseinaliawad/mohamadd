<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        $langs = [
            [ 'name' => 'العربية'],
            [ 'name' => 'الإنكليزية'],
            [ 'name' => 'الفرنسية'],
            [ 'name' => 'الروسية'],
        ];

        foreach ($langs as $lang) {
            Language::create($lang);
        }

        $this->command->info('Languages seeded successfully.');
    }
}
