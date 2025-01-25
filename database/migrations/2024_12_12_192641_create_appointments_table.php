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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id('app_id'); // Primary Key

            // Foreign Key to Users Table
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Foreign Key to Doctors Table
            $table->unsignedBigInteger('doc_id');
            $table->foreign('doc_id')->references('doc_id')->on('doctors')->onDelete('cascade');

            // Appointment Details
            $table->date('date');
            $table->time('time');
            $table->enum('status', ['pending','paid', 'approved', 'rejected', 'completed'])->default('pending');
            $table->string('problem')->nullable();

            // Additional Timestamp
            $table->timestamp('status_updated_at')->nullable();

            // Default Timestamps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
