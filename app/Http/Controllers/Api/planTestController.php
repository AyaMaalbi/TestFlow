<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PlanTest;
use Illuminate\Http\Request;

class planTestController extends Controller
{
    public function getAllPlanTest()
    {
        $data = PlanTest::all();
        return response()->json($data);
    }

    public function filterPlanTest($param)
    {
        $data = PlanTest::where('title', $param)->get();
        return response()->json($data);
    }

    public function addPlanTest(Request $request)
    {
        $valide = $request->validate([
            'title' => 'required|string',

            'id_responsible' => 'required|integer',
        ]);
        $data = PlanTest::create($valide);
        return response()->json(['message' => 'PlanTest created successfully', 'planTest' => $data]);
    }

    public function updatePlanTest(Request $request, $id)
    {
        $plan = PlanTest::find($id);

        if (!$plan) {
            return response()->json(['message' => 'PlanTest not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'id_responsible' => 'sometimes|integer',
        ]);

        $plan->update($validated);
        return response()->json(['message' => 'PlanTest updated successfully', 'planTest' => $plan]);
    }


    public function deletePlanTest($id)

    {
        // dump($id);
        $planTest = PlanTest::find($id);

        if (!$planTest) {
            return response()->json(['message' => 'PlanTest not found'], 404);
        }

        $planTest->delete();
        return response()->json(['message' => 'PlanTest deleted successfully', 'planTest' => $planTest]);
    }
}
