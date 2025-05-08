<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration{

  public function up()
{
    Schema::table('test_cases', function (Blueprint $table) {
        // Drop existing foreign key if it exists
        $table->dropForeign(['id_planTest']);

        // Add it again with ON DELETE CASCADE
        $table->foreign('id_planTest')
              ->references('id')
              ->on('plan_tests')
              ->onDelete('cascade');
    });
}

public function down()
{
    Schema::table('test_cases', function (Blueprint $table) {
        $table->dropForeign(['id_planTest']);

        // (Optional) Add it back without cascade
        $table->foreign('id_planTest')
              ->references('id')
              ->on('plan_tests');
    });
}

};
