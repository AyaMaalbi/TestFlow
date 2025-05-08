<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Anomaly;
use Illuminate\Http\Request;

class anomalyController extends Controller
{
    public function index(){
        $data = Anomaly::all();
        return response()->json($data);
    }

    
    public function create(Request $request){
        $validated = $request->validate([
            'id_tester' => 'required|integer',
            'id_planTest' => 'required|integer',
            'description' => 'required|string',
            'id_testCase' => 'required|integer',
        ]);

        $data = Anomaly::create($validated);
        return response()->json(['message' => 'Anomaly created successfully', 'data' => $data]);
    }
}
