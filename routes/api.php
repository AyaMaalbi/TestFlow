<?php

// use App\Http\Controllers\testFlowController;
// use Illuminate\Routing\Route;
  

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\planTestController;
// use App\Http\Controllers\testFlowController;



// use App\Http\Controllers\Api\planTestController;

// Route::get('/plan-tests', [planTestController::class, 'getAllPlanTest']);
// Route::get('/plan-tests/{id}', [planTestController::class, 'showPlanTest']);
// Route::post('/plan-tests', [planTestController::class, 'addPlanTest']);
// Route::put('/plan-tests/{id}', [planTestController::class, 'updatePlanTest']);
// Route::delete('/plan-tests/{id}', [planTestController::class, 'deletePlanTest']);

use App\Http\Controllers\Api\anomalyController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\planTestController;
use App\Http\Controllers\Api\responsibleController;
use App\Http\Controllers\Api\testCaseController;
use App\Http\Controllers\Api\testersController;
use App\Http\Controllers\testFlowController;

Route::get('/plan-tests', [planTestController::class, 'getAllPlanTest']);
Route::get('/anomalies', [anomalyController::class, 'index']);
Route::get('/test_cases', [testCaseController::class, 'getAllTestCase']);
Route::get('/testers', [testersController::class, 'getAllTesters']);
Route::get('/responsibles', [responsibleController::class, 'getAllResponsibles']);



Route::put('/test_cases/{id}', [testCaseController::class, 'updateTestCase']);
Route::put('/plan-tests/{id}', [planTestController::class, 'updatePlanTest']);



//creer anomaly
Route::post('/anomalies', [anomalyController::class, 'create']);



// supprimer test case
Route::delete('/test-cases/delete/{id}', [TestCaseController::class, 'deleteTestCase']);
Route::delete('/plan-tests/delete/{id}', [PlanTestController::class, 'deletePlanTest']);
Route::delete('/testers/delete/{id}', [testersController::class, 'deleteTester']);



//auth routes
Route::post('/testers/authenticate', [testersController::class, 'authenticateTester']);
Route::post('/responsibles/authenticate', [responsibleController::class, 'authenticateResponsible']);


Route::post('/test_cases/create', [testCaseController::class, 'createTestCase']);
Route::post('/plan-tests/create', [planTestController::class, 'addPlanTest']);
Route::post('/testers/create', [testersController::class, 'addTester']);
Route::post('/responsibles/create', [responsibleController::class, 'addResponsible']);

Route::get('/test_cases/tester/{param}', [testCaseController::class, 'getTestCasesOfTester']);

