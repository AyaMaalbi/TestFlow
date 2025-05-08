<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestCase extends Model
{
    use HasFactory;

    protected $table = 'test_cases';

    protected $fillable = [
        'title',
        'description',
        'status',
        'comments',
        'id_responsible',
        'id_tester',
        'id_planTest',
    ];

    // Relationships
    public function responsible()
    {
        return $this->belongsTo(Responsible::class, 'id_responsible');
    }

    public function tester()
    {
        return $this->belongsTo(Tester::class, 'id_tester');
    }

    public function planTest()
    {
        return $this->belongsTo(PlanTest::class, 'id_planTest');
    }

    // Optional: If you ever enable the anomaly relation
    // public function anomaly()
    // {
    //     return $this->belongsTo(Anomaly::class, 'id_anomaly');
    // }
}
