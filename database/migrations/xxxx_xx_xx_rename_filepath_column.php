<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameFilepathColumn extends Migration
{
    public function up()
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->renameColumn('filePath', 'file_path');
        });
    }

    public function down()
    {
        Schema::table('messages', function (Blueprint $table) {
            $table->renameColumn('file_path', 'filePath');
        });
    }
} 