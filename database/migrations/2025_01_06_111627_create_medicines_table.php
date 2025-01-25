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
            $table->increments('medicine_id');  // Primary key as integer
            $table->string('brand_name', 255)->nullable();  // varchar(255)
            $table->string('generic_name', 255)->nullable();  // varchar(255)
            $table->text('indication')->nullable();  // text
            $table->text('side_effect')->nullable();  // text
            $table->text('adult_dose')->nullable();  // text
            $table->text('child_dose')->nullable();  // text
            $table->string('strength', 50)->nullable();  // varchar(50)
            $table->decimal('price', 10, 2)->nullable();  // decimal(10, 2)
            $table->string('packsize', 50)->nullable();  // varchar(50)
            $table->string('form', 50)->nullable();  // varchar(50)
            $table->text('administration')->nullable();  // text
            $table->timestamps();  // for created_at and updated_at
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
