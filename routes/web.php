<?php

use App\Http\Controllers\Api\planTestController;
use App\Http\Controllers\testFlowController;
use Illuminate\Support\Facades\Route;


// use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');  // Pointing to the new login view you created
// });


// use App\Models\User;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Http\Request;


// Route::get('/{any}', function () {
//     return view('app'); 
// })->where('any', '.*');


// Auth::routes();


// Route::get('/data', [testFlowController::class, 'index']);
// Route::get('/task_counts', [testFlowController::class, 'taskCounts']);
// Route::get('/home', [testFlowController::class, 'index'])->middleware('auth');


Route::get('/',function(){
    return view('welcome');
});

Route::get('/test_cases',function(){
    return view('test_cases');
});
// Route::get('/HomePge',function(){
//     return view('home');
// });

// Route::get('/plan-tests', [planTestController::class, 'getAllPlanTest']);
// Route::get('/plan-tests/{id}', [planTestController::class, 'showPlanTest']);
// Route::get('/plan-tests/filter/{param}', [planTestController::class, 'filterPlanTest']);
// Route::post('/plan-tests', [planTestController::class, 'addPlanTest']);
// Route::put('/plan-tests/{id}', [planTestController::class, 'updatePlanTest']);
// Route::delete('/plan-tests/{id}', [planTestController::class, 'deletePlanTest']);


// Route::post('/login', function (Request $request) {
//     $credentials = $request->only('email', 'password');

//     if (Auth::attempt($credentials)) {
//         $request->session()->regenerate();
//         return response()->json(['message' => 'Logged in', 'user' => Auth::user()]);
//     }

//     return response()->json(['message' => 'Invalid credentials'], 401);
// });