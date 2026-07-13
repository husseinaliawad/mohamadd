<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

        // ربط مع جدول الوحدات


    public function up(): void
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();

            $table->foreignId('city_id')->constrained();
            $table->foreignId('category_id')->constrained();
            
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            
            $table->decimal('cost', 10, 2)->nullable();
            
            $table->integer('expected_duration_minutes')->nullable(); //الفترة المتوقعة للمكوث في هذا المكان

            $table->enum('activity_level', ['relax', 'sensible', 'vigour'])->default('sensible');

            $table->boolean('is_outdoor')->default(false);
            //  للفصول والأوقات نستخدم JSON للمرونة
            $table->json('best_seasons')->nullable(); // ["spring", "summer"]
            $table->json('recommended_times')->nullable(); // ["morning", "evening"]
            
            $table->json('opening_hours')->nullable(); 
            // "opening_hours": {
            // "monday": [
            //     { "open": "09:00", "close": "17:00" }
            // ],  
            // "sunday": []
            // }
            
            $table->float('average_rating')->default(0);
            $table->integer('reviews_count')->default(0);

            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();


            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
