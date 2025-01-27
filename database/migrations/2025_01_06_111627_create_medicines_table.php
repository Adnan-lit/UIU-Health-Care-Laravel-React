<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->increments('medicine_id'); // Unsigned integer primary key
            $table->string('brand_name', 255)->nullable(); 
            $table->string('generic_name', 255)->nullable(); 
            $table->text('indication')->nullable(); 
            $table->text('side_effect')->nullable(); 
            $table->text('adult_dose')->nullable(); 
            $table->text('child_dose')->nullable(); 
            $table->string('strength', 50)->nullable(); 
            $table->decimal('price', 10, 2)->nullable(); 
            $table->string('packsize', 50)->nullable(); 
            $table->string('form', 50)->nullable(); 
            $table->text('administration')->nullable(); 
            $table->timestamps(); 
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicines');
    }
};
