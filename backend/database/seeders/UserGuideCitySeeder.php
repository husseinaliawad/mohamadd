<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Guide;
use App\Models\City;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserGuideCitySeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | 1) إنشاء المدن
        |--------------------------------------------------------------------------
        */
        $citiesData = [
            [
                'name' => 'دمشق',
                'image' => 'damascus.jpg',
                'description' => 'عاصمة سوريا وأقدم مدينة مأهولة في التاريخ.'
            ],
            [
                'name' => 'حلب',
                'image' => 'aleppo.jpg',
                'description' => 'مدينة تاريخية عريقة تشتهر بالقلعة والأسواق القديمة.'
            ],
            [
                'name' => 'اللاذقية',
                'image' => 'latakia.jpg',
                'description' => 'مدينة ساحلية جميلة على البحر الأبيض المتوسط.'
            ],

            [
                'name' => 'طرطوس',
                'image' => 'tartous.jpg',
                'description' => 'مدينة ساحلية هادئة ومناسبة للعائلات.'
            ],
            [
                'name' => 'حمص',
                'image' => 'homs.jpg',
                'description' => 'مدينة وسط سوريا وتشتهر بقلعة الحصن.'
            ],
            [
                'name' => 'حماة',
                'image' => 'hama.jpg',
                'description' => 'مدينة النواعير الشهيرة.'
            ],
            [
                'name' => 'السويداء',
                'image' => 'swaida.jpg',
                'description' => 'مدينة جبلية هادئة تشتهر بالآثار الرومانية.'
            ],
            [
                'name' => 'تدمر',
                'image' => 'palmyra.jpg',
                'description' => 'مدينة أثرية عالمية ذات أهمية تاريخية كبيرة.'
            ],
        ];


        $cities = [];
        foreach ($citiesData as $city) {
            $cities[] = City::create($city);
        }

        /*
        |--------------------------------------------------------------------------
        | 2) إنشاء المستخدمين
        |--------------------------------------------------------------------------
        */

        $files = File::files(database_path('seeders/images/avatars'));

        foreach ($files as $file) {
            Storage::disk('public')->putFileAs(
                'avatars',
                $file,
                $file->getFilename()
            );
        }

        $usersData = [
            // آدمن
            [
                'name' => 'مدير النظام',
                'email' => 'admin@test.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],

            // سائحون
            [
                'name' => 'نور كاملة',
                'email' => 'noor@test.com',
                'password' => Hash::make('password'),
                'role' => 'tourist',
            ],
            [
                'name' => 'محمد سليمان',
                'email' => 'suliman@test.com',
                'password' => Hash::make('password'),
                'role' => 'tourist',
            ],


            // مرشدون
            [
                'name' => 'براء حمود',
                'email' => 'baraa@test.com',
                'password' => Hash::make('password'),
                'role' => 'guide',
            ],
            [
                'name' => 'محمد مطر',
                'email' => 'matar@test.com',
                'password' => Hash::make('password'),
                'role' => 'guide',
            ],

        ];

        $users = [];
        foreach ($usersData as $user) {
            $users[] = User::create($user);
        }

        /*
        |--------------------------------------------------------------------------
        | 3) إنشاء المرشدين وربطهم بالمدن (Many-to-Many)
        |--------------------------------------------------------------------------
        */

        $guidesData = [
            [
                'user_index' => 3,
                'gender' => 'F',
                'phone' => '0999999999',
                'DOB' => '2005-01-01',
                'daily_price' => 50,
                'bio' => 'مرشد سياحي بخبرة 10 سنوات في دمشق القديمة.',
                'avatar' => 'avatars/guide1.jpg',
                
                'cities' => [0,4], // دمشق
            ],
            [
                'user_index' => 4,
                'gender' => 'F',
                'phone' => '0988888888',
                'DOB' => '2000-05-12',
                'daily_price' => 40,
                'bio' => 'مرشد متخصص في الآثار في مدينة حلب.',
                'avatar' => 'avatars/guide2.jpg',
                'cities' => [1], // حلب
            ],
            
        ];




        $guidesCreated = [];

        foreach ($guidesData as $g) {
            $guide = Guide::create([
                'user_id' => $users[$g['user_index']]->id,
                'gender' => $g['gender'],
                'phone' => $g['phone'],
                'DOB' => $g['DOB'],
                'avatar' => $g['avatar'],
                'daily_price' => $g['daily_price'],
                'bio' => $g['bio'],
            ]);

            $guidesCreated[] = $guide;

            // ربط المرشد بالمدن
            $guide->cities()->attach(
                collect($g['cities'])->map(
                    fn($i) => $cities[$i]->id
                )
            );
        }
    }
}
