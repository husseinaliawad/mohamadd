<?php

use App\Enums\GuideBookingStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guide_bookings', function (Blueprint $table) {
            $table->id();

            // السائح الذي قام بالحجز
            $table->foreignId('tourist_id')->constrained('users')->cascadeOnDelete();

            $table->foreignId('guide_id')->constrained()->cascadeOnDelete();

            // ربط الحجز برحلة معينة (اختياري)
            $table->foreignId('trip_id')->nullable()->constrained()->cascadeOnDelete();

            $table->date('start_date'); //تاريخ البدء
            $table->unsignedTinyInteger('day_count'); //عدد الأيام 0->255

            $table->enum('status', GuideBookingStatus::cases())
                ->default(GuideBookingStatus::Pending->value);

            $table->text('description'); //وصف عملية الحجز يضعه السائح

            $table->decimal('total_price', 8 ,2);
            $table->text('last_note')->nullable(); //آخر ملاحظة خلال تغيير حالة الحجز

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guide_bookings');
    }
};
