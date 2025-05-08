<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'id_responsible',
    ];

    // Relationships
    public function responsible()
    {
        return $this->belongsTo(Responsible::class, 'id_responsible');
    }

    // public function anomalies()
    // {
    //     return $this->hasMany(Anomaly::class, 'id_planTest');
    // }
}
