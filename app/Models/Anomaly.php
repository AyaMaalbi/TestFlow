<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anomaly extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'id_testCase',
        'id_planTest',
        'id_tester',
    ];

    // Relationships
    public function testCase()
    {
        return $this->belongsTo(TestCase::class, 'id_testCase');
    }

    public function planTest()
    {
        return $this->belongsTo(PlanTest::class, 'id_planTest');
    }

    public function tester()
    {
        return $this->belongsTo(Tester::class, 'id_tester');
    }
}
