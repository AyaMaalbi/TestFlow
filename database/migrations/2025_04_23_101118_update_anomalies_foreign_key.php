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
        Schema::table('anomalies', function (Blueprint $table) {
            // Drop old foreign key
            $table->dropForeign(['id_testCase']);

            // Add new foreign key with cascade
            $table->foreign('id_testCase')
                ->references('id')
                ->on('test_cases')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('anomalies', function (Blueprint $table) {
            $table->dropForeign(['id_testCase']);

            // Add it back without cascade (or however it was before)
            $table->foreign('id_testCase')
                ->references('id')
                ->on('test_cases');
        });
    }
};
