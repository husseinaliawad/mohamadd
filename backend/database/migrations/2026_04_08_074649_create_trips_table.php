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
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title')->nullable();
            
            $table->integer('budget_max')->nullable();            
            $table->enum('trip_pace', ['slow', 'medium', 'intensive'])->default('medium');
            $table->enum('preferred_activity_level', ['relax', 'sensible', 'vigour'])->default('sensible');


            $table->date('start_date')->nullable();
            $table->integer('day_count');

            $table->decimal('total_estimated_cost', 10, 2)->nullable();            

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
