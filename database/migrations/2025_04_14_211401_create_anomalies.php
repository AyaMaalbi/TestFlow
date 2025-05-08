<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('anomalies', function (Blueprint $table) {
            $table->id();
            $table->string('description');
            $table->foreignId('id_testCase')->constrained('test_cases');
            $table->foreignId('id_planTest')->constrained('plan_tests');
            $table->foreignId('id_tester')->constrained('testers');
            $table->timestamps();
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('anomalies');
    }
};
