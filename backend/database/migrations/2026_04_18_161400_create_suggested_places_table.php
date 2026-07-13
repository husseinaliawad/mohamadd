<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('suggested_places', function (Blueprint $table) {
            $table->id();

            // من قام باقتراح المكان
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->foreignId('city_id')->constrained();

            $table->string('name');
            $table->text('description')->nullable();

            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();

            // صور المكان (JSON)
            $table->json('images')->nullable();

            // حالة المراجعة
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');

            // ملاحظات المدير عند المراجعة
            $table->text('admin_notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('suggested_places');
    }
};
