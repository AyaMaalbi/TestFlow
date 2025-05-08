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
        Schema::table('test_cases', function (Blueprint $table) {
            // First drop the existing foreign key
            $table->dropForeign(['id_planTest']);

            // Then add it again with ON DELETE and ON UPDATE CASCADE
            $table->foreign('id_planTest')
                ->references('id')
                ->on('plan_tests')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::table('test_cases', function (Blueprint $table) {
            $table->dropForeign(['id_planTest']);

            // Re-add without cascade (optional fallback)
            $table->foreign('id_planTest')
                ->references('id')
                ->on('plan_tests');
        });
    }
};
