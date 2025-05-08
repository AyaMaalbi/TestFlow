<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeCommentsNullableInTestCasesTable extends Migration
{
    public function up()
    {
        Schema::table('test_cases', function (Blueprint $table) {
            $table->text('comments')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('test_cases', function (Blueprint $table) {
            $table->text('comments')->nullable(false)->change();
        });
    }
}

