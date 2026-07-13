<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Place;
use App\Models\Interest;

class PlaceSeeder extends Seeder
{
    public function run(): void
    {
        $places = [

            /*
            |--------------------------------------------------------------------------
            | دمشق
            |--------------------------------------------------------------------------
            */
            [
                'city_id' => 1,
                'category_id' => 1, // منتزه
                'name' => 'حديقة الأمويين',
                'description' => 'أكبر حدائق دمشق، مناسبة للعائلات والأنشطة الخارجية.',
                'address' => 'دمشق - المزة',
                'phone' => null,
                'cost' => 0,
                'expected_duration_minutes' => 90,
                'activity_level' => 'relax',
                'is_outdoor' => true,
                'best_seasons' => json_encode(['spring', 'summer']),
                'recommended_times' => json_encode(['morning', 'evening']),
                'opening_hours' => '08:00 - 22:00',
                'average_rating' => 4.5,
                'reviews_count' => 120,
                'latitude' => 33.5074,
                'longitude' => 36.2783,
            ],
            [
                'city_id' => 1,
                'category_id' => 2, // مطعم
                'name' => 'مطعم بيت ستي',
                'description' => 'مطعم تراثي يقدم المأكولات الدمشقية الأصيلة.',
                'address' => 'دمشق - باب توما',
                'phone' => '0114444444',
                'cost' => 15,
                'expected_duration_minutes' => 75,
                'activity_level' => 'sensible',
                'is_outdoor' => false,
                'best_seasons' => json_encode(['spring', 'autumn']),
                'recommended_times' => json_encode(['afternoon', 'evening']),
                'opening_hours' => '12:00 - 23:00',
                'average_rating' => 4.7,
                'reviews_count' => 300,
                'latitude' => 33.5141,
                'longitude' => 36.3155,
            ],

            /*
            |--------------------------------------------------------------------------
            | حلب
            |--------------------------------------------------------------------------
            */
            [
                'city_id' => 2,
                'category_id' => 3, // مقهى
                'name' => 'مقهى القلعة',
                'description' => 'مقهى تراثي يطل على قلعة حلب.',
                'address' => 'حلب - باب الفرج',
                'phone' => '021555555',
                'cost' => 5,
                'expected_duration_minutes' => 60,
                'activity_level' => 'relax',
                'is_outdoor' => false,
                'best_seasons' => json_encode(['spring', 'autumn']),
                'recommended_times' => json_encode(['evening']),
                'opening_hours' => '10:00 - 23:00',
                'average_rating' => 4.2,
                'reviews_count' => 80,
                'latitude' => 36.1993,
                'longitude' => 37.1612,
            ],
            [
                'city_id' => 2,
                'category_id' => 26, // موقع أثري
                'name' => 'قلعة حلب',
                'description' => 'واحدة من أقدم القلاع في العالم، معلم أثري عالمي.',
                'address' => 'حلب - وسط المدينة',
                'phone' => null,
                'cost' => 3,
                'expected_duration_minutes' => 120,
                'activity_level' => 'vigour',
                'is_outdoor' => true,
                'best_seasons' => json_encode(['spring', 'autumn']),
                'recommended_times' => json_encode(['morning']),
                'opening_hours' => '09:00 - 18:00',
                'average_rating' => 4.8,
                'reviews_count' => 500,
                'latitude' => 36.1996,
                'longitude' => 37.1620,
            ],

            /*
            |--------------------------------------------------------------------------
            | اللاذقية
            |--------------------------------------------------------------------------
            */
            [
                'city_id' => 3,
                'category_id' => 9, // شاطئ
                'name' => 'شاطئ أفاميا',
                'description' => 'شاطئ رملي جميل مناسب للسباحة والأنشطة البحرية.',
                'address' => 'اللاذقية - الكورنيش الجنوبي',
                'phone' => '041444444',
                'cost' => 10,
                'expected_duration_minutes' => 180,
                'activity_level' => 'vigour',
                'is_outdoor' => true,
                'best_seasons' => json_encode(['summer']),
                'recommended_times' => json_encode(['morning', 'afternoon']),
                'opening_hours' => '09:00 - 19:00',
                'average_rating' => 4.7,
                'reviews_count' => 200,
                'latitude' => 35.5153,
                'longitude' => 35.7806,
            ],

            /*
            |--------------------------------------------------------------------------
            | طرطوس
            |--------------------------------------------------------------------------
            */
            [
                'city_id' => 4,
                'category_id' => 9, // شاطئ
                'name' => 'شاطئ الأحلام',
                'description' => 'شاطئ هادئ مناسب للعائلات.',
                'address' => 'طرطوس - الكورنيش',
                'phone' => null,
                'cost' => 8,
                'expected_duration_minutes' => 150,
                'activity_level' => 'relax',
                'is_outdoor' => true,
                'best_seasons' => json_encode(['summer']),
                'recommended_times' => json_encode(['morning']),
                'opening_hours' => '08:00 - 20:00',
                'average_rating' => 4.4,
                'reviews_count' => 90,
                'latitude' => 34.8890,
                'longitude' => 35.8866,
            ],

            /*
            |--------------------------------------------------------------------------
            | حمص
            |--------------------------------------------------------------------------
            */
            [
                'city_id' => 5,
                'category_id' => 26, // موقع أثري
                'name' => 'قلعة الحصن',
                'description' => 'من أهم القلاع الصليبية في العالم.',
                'address' => 'حمص - وادي النصارى',
                'phone' => null,
                'cost' => 5,
                'expected_duration_minutes' => 120,
                'activity_level' => 'vigour',
                'is_outdoor' => true,
                'best_seasons' => json_encode(['spring', 'autumn']),
                'recommended_times' => json_encode(['morning']),
                'opening_hours' => '09:00 - 17:00',
                'average_rating' => 4.9,
                'reviews_count' => 600,
                'latitude' => 34.7560,
                'longitude' => 36.2990,
            ],

            /*
            |--------------------------------------------------------------------------
            | حماة
            |--------------------------------------------------------------------------
            */
            [
                'city_id' => 6,
                'category_id' => 1, // منتزه
                'name' => 'نواعير حماة',
                'description' => 'أشهر معالم حماة التاريخية.',
                'address' => 'حماة - العاصي',
                'phone' => null,
                'cost' => 0,
                'expected_duration_minutes' => 60,
                'activity_level' => 'relax',
                'is_outdoor' => true,
                'best_seasons' => json_encode(['spring']),
                'recommended_times' => json_encode(['evening']),
                'opening_hours' => null,
                'average_rating' => 4.6,
                'reviews_count' => 250,
                'latitude' => 35.1318,
                'longitude' => 36.7578,
            ],

            /*
            |--------------------------------------------------------------------------
            | السويداء
            |--------------------------------------------------------------------------
            */
            [
                'city_id' => 7,
                'category_id' => 26, // موقع أثري
                'name' => 'متحف السويداء',
                'description' => 'متحف يعرض آثار رومانية ونبطية.',
                'address' => 'السويداء - مركز المدينة',
                'phone' => null,
                'cost' => 2,
                'expected_duration_minutes' => 60,
                'activity_level' => 'sensible',
                'is_outdoor' => false,
                'best_seasons' => json_encode(['winter', 'autumn']),
                'recommended_times' => json_encode(['afternoon']),
                'opening_hours' => '09:00 - 16:00',
                'average_rating' => 4.3,
                'reviews_count' => 70,
                'latitude' => 32.7089,
                'longitude' => 36.5695,
            ],

            /*
            |--------------------------------------------------------------------------
            | تدمر
            |--------------------------------------------------------------------------
            */
            [
                'city_id' => 8,
                'category_id' => 26, // موقع أثري
                'name' => 'آثار تدمر',
                'description' => 'مدينة أثرية عالمية ذات أهمية تاريخية كبيرة.',
                'address' => 'تدمر - وسط المدينة',
                'phone' => null,
                'cost' => 10,
                'expected_duration_minutes' => 180,
                'activity_level' => 'vigour',
                'is_outdoor' => true,
                'best_seasons' => json_encode(['spring', 'autumn']),
                'recommended_times' => json_encode(['morning']),
                'opening_hours' => '08:00 - 18:00',
                'average_rating' => 5.0,
                'reviews_count' => 1000,
                'latitude' => 34.5481,
                'longitude' => 38.2765,
            ],
        ];

        $interestMap = [
            'حديقة الأمويين' => ['تاريخ وآثار', 'عائلي وأطفال', 'طبيعة ومغامرات'],
            'مطعم بيت ستي' => ['طعام ومطاعم', 'ثقافة وفنون'],
            'مقهى القلعة' => ['طعام ومطاعم', 'ثقافة وفنون'],
            'قلعة حلب' => ['تاريخ وآثار', 'تصوير'],
            'شاطئ أفاميا' => ['طبيعة - بحر', 'رياضة', 'تصوير'],
            'شاطئ الأحلام' => ['طبيعة - بحر', 'عائلي وأطفال'],
            'قلعة الحصن' => ['تاريخ وآثار', 'تصوير'],
            'نواعير حماة' => ['تاريخ وآثار', 'تصوير'],
            'متحف السويداء' => ['تاريخ وآثار', 'ثقافة وفنون'],
            'آثار تدمر' => ['تاريخ وآثار', 'طبيعة ومغامرات', 'تصوير'],
        ];

        $placeImagesBasePath = database_path('seeders/images/places');
        File::ensureDirectoryExists(public_path('storage/places'));

        foreach ($places as $index => $placeData) {
            if (!empty($placeData['opening_hours']) && !is_array($placeData['opening_hours'])) {
                $placeData['opening_hours'] = json_encode(['default' => $placeData['opening_hours']]);
            }

            $place = Place::create($placeData);

            $interestNames = $interestMap[$placeData['name']] ?? [];
            if (!empty($interestNames)) {
                $interestIds = Interest::whereIn('name', $interestNames)->pluck('id')->all();
                $place->interests()->sync($interestIds);
            }

            $sourceDir = $placeImagesBasePath . DIRECTORY_SEPARATOR . ($index + 1);
            if (File::isDirectory($sourceDir)) {
                $images = File::files($sourceDir);
                $order = 1;

                foreach ($images as $imageFile) {
                    $originalFilename = $imageFile->getFilename();
                    $extension = $imageFile->getExtension();
                    $newFilename = $place->id . '_' . $order . '.' . $extension;
                    $destinationPath = public_path('storage/places/' . $newFilename);

                    if (!File::exists($destinationPath)) {
                        File::copy($imageFile->getPathname(), $destinationPath);
                    }

                    $place->images()->create([
                        'image_url' => $newFilename,
                        'order' => $order++,
                    ]);
                }
            }
        }
    }
}
