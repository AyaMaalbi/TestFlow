<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tester;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use PHPUnit\Event\Code\Test;

class testersController extends Controller
{
    public function getAllTesters()
    {
        $data = Tester::all();
        return response()->json($data);
    }


    public function getTestCasesOfTester($testerId)
    {
        $testCases = Tester::find($testerId)->testCases;
        return response()->json($testCases);
    }



public function authenticateTester(Request $request)
{
    $tester = Tester::where('email', $request->email)->first();

    if (!$tester || $tester->password != $request->password) {
        return response()->json(['message' => "Email or password doesn't exist"], 401);
    }

    return response()->json(['message' => 'Authentication successful', 'tester' => $tester]);
}

    public function deleteTester($id)
    {
        $tester = Tester::find($id);

        if (!$tester) {
            return response()->json(['message' => 'Tester not found'], 404);
        }

        $tester->delete();
        return response()->json(['message' => 'Tester deleted successfully', 'tester' => $tester]);
    }


    public function addTester(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required',
            'password' => 'required|string',
        ]);

        $tester = Tester::create($validated);
        return response()->json(['message' => 'Tester created successfully', 'tester' => $tester]);
    }

    public function updateTester(Request $request, $id)
    {
        $tester = Tester::find($id);

        if (!$tester) {
            return response()->json(['message' => 'Tester not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:testers,email,' . $id,
            'password' => 'sometimes|string|min:6',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $tester->update($validated);
        return response()->json(['message' => 'Tester updated successfully', 'tester' => $tester]);
    }


}
