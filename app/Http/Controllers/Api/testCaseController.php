<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TestCase;
use Illuminate\Http\Request;

class testCaseController extends Controller
{
    public function getAllTestCase()
    {
        $data = TestCase::all();
        return response()->json($data);
    }

    public function updateTestCase(Request $request, $id)
    {
        $testCase = TestCase::find($id);

        if (!$testCase) {
            return response()->json(['message' => 'TestCase not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'status' => 'sometimes|in:to do,done,in progress',
            'comments' => 'sometimes|string',
            'id_responsable' => 'sometimes|integer',
            'id_planTest' => 'sometimes|integer',
            'id_tester' => 'sometimes|integer',
        ]);

        $testCase->update($validated);
        return response()->json(['message' => 'TestCase updated successfully', 'testCase' => $testCase]);
    }


    public function getTestCasesOfTester($testerId)
    {
        $testCases = TestCase::where('id_tester', $testerId)->get();
        return response()->json($testCases);
    }

    public function deleteTestCase($id)
    {
        $testCase = TestCase::find($id);

        if (!$testCase) {
            return response()->json(['message' => 'TestCase not found'], 404);
        }

        $testCase->delete();
        return response()->json(['message' => 'TestCase deleted successfully', 'testCase' => $testCase]);
    }


    public function createTestCase(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:to do,done,in progress',
            'id_responsible' => 'required|integer',
            'id_planTest' => 'required|integer',
            'id_tester' => 'required|integer',
        ]);

        $testCase = TestCase::create($validated);
        return response()->json(['message' => 'TestCase created successfully', 'testCase' => $testCase]);
    }
}
