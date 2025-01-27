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
        Schema::create('inventory_medicines', function (Blueprint $table) {
            $table->id('inventory_medicine_id'); // BIGINT PRIMARY KEY
            $table->integer('stock')->nullable(false);
        
            // Ensure foreign key type matches the type in `medicines`
            $table->unsignedInteger('medicine_id')->nullable(false);
            $table->foreign('medicine_id')->references('medicine_id')->on('medicines')->onDelete('cascade');
        
            $table->timestamps(); // created_at and updated_at
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_medicines');
    }
};
