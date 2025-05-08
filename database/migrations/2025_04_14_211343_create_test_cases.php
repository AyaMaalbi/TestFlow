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
        Schema::create('test_cases', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->enum('status',['done','in progress','to do'])->default('to do');
            $table->string('comments');
            $table->foreignId('id_responsible')->constrained('responsibles');
            $table->foreignId('id_tester')->constrained('testers');
            // $table->foreignId('id_anomaly')->constrained('anomalies');
            $table->foreignId('id_planTest')->constrained('plan_tests');
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test_cases');
    }
};
