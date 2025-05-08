<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TestCase;
use App\Models\Tester;
use App\Models\User;
use Illuminate\Http\Request;

class testFlowController extends Controller
{
    public function index(){
        $data = Tester::all();
        return response()->json($data);
    }

    public function login($role){
        $user = User::where('role',$role)->get();
        if ($role==='tester'){
            return view('/homepage',compact('user'));
        }else if ($role==='responsable'){
            return view('/responsable',compact('user'));
        }else{
            return redirect()->back()->with('error', 'Role not recognized');
        }
        return redirect()->back()->with('error', 'role is not dettected');


    }

    public function taskCounts(){
        $done =  TestCase::where('status','done')->count();
        $to_do = TestCase::where('status','to_do')->count();
        $in_progress = TestCase::where('status','in_progress')->count();

        $counts = ['done'=>$done,'to_do'=>$to_do,'in_progress'=>$in_progress];
        return $counts;
    }
}
