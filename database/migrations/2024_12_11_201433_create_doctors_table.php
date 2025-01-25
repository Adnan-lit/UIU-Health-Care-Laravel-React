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
        Schema::create('doctors', function (Blueprint $table) {
            // doc_id, name, email, phone, specialty, educations, experiences
            // doc_id is primary key and foreign key to user_id
            $table->id('doc_id');
            $table->foreign('doc_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->unique();
            $table->string('specialty');
            $table->json('educations');
            $table->json('experiences');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
