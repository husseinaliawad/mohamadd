<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // جدول الاستعلامات (parameters)
        Schema::create('ai_nearby_explores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->decimal('budget', 10, 2)->nullable();
            $table->boolean('is_outdoor')->nullable();
            $table->decimal('latitude', 10, 6)->nullable();
            $table->decimal('longitude', 10, 6)->nullable();
            $table->integer('radius_km')->nullable();
            $table->timestamps();
        });

        // جدول النتائج (places المرتبطة)
        Schema::create('ai_nearby_explores_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('explore_id')
                  ->constrained('ai_nearby_explores')
                  ->cascadeOnDelete();
            $table->foreignId('place_id')->constrained('places')->cascadeOnDelete();
            $table->decimal('distance_km', 8, 2)->nullable(); // البعد وقت الطلب
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_place_recommendation_results');
        Schema::dropIfExists('ai_place_recommendations');
    }
};
