<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Responsible;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class responsibleController extends Controller
{
    public function getAllResponsibles(){
        $data = Responsible::all();
        return response()->json($data);
    }


    public function authenticateResponsible(Request $request)
    {
        $responsible = Responsible::where('email', $request->email)->first();
    
        if (!$responsible || $responsible->password != $request->password) {
            return response()->json(['message' => "Email or password doesn't exist"], 401);
        }
    
        return response()->json(['message' => 'Authentication successful', 'responsible' => $responsible]);
    }
}
