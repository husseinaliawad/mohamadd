<?php

use App\Enums\GuideBookingStatus;
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
        Schema::create('guide_booking_logs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('booking_id')->constrained('guide_bookings')->cascadeOnDelete();

            $table->enum('old_status', GuideBookingStatus::cases());
            $table->enum('new_status', GuideBookingStatus::cases());

            $table->text('note')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guide_booking_logs');
    }
};
