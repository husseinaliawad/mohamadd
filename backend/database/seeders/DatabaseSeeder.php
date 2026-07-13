<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        /** basic */
        $this->call([
            InterestSeeder::class,
            LanguageSeeder::class,
            CategorySeeder::class
        ]);

        /** cities- useres-guides */
        $this->call([
            UserGuideCitySeeder::class,
            
            GuideLanguageSeeder::class,
            BookingAndLogِsAndReviewsSeeder::class,
        ]);
        /** places */
        $this->call([
            SuggestedPlaceSeeder::class,
            PlaceSeeder::class,            
        ]);

        /** trips */
        // $this->call([
        //     TripSeeder::class,
        //     TripCitySeeder::class,
        //     TripPlaceSeeder::class,
        // ]);

        /** tourists related data */
        // $this->call([
        //     PlaceReviewSeeder::class,
        //     InterestUserSeeder::class,
        // ]);        
    }
}
