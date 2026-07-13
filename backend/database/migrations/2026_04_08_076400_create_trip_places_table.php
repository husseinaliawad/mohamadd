<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{


    /**
     * Run the migrations.
     */
    public function up(): void
    {


        Schema::create('trip_places', function (Blueprint $table) {
            $table->id();

            $table->foreignId('trip_id')->constrained()->cascadeOnDelete();
            $table->foreignId('place_id')->nullable()->constrained()->cascadeOnDelete();
            
            // الترتيب والزمن
            $table->integer('day_number'); // 1,2,3...
            $table->integer('order')->default(1);
            $table->time('start_time');
            $table->integer('duration_minutes'); // مدة النشاط في هذه الرحلة تحديداً
            $table->integer('travel_minutes')->default(0);// وقت الوصول من المكان السابق
            
            $table->decimal('estimated_cost', 12, 2)->default(0);
            $table->string('note')->nullable();
            
            $table->unique(['trip_id', 'day_number', 'order']);
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trip_places');
    }
};
