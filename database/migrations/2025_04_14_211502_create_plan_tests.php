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
        Schema::create('plan_tests', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('title');
            // $table->foreignId('id_testCase')->constrained('test_cases');
            $table->foreignId('id_responsible')->constrained('responsibles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plan_tests');
    }
};
