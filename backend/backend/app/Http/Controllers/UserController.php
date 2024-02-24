<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getUserByMonth(Request $request)
    {
        $query = User::select(DB::raw("COUNT(*) as count"), DB::raw("YEAR(created_at) as year"), DB::raw("MONTH(created_at) as month"));

        if($request->has('from') && $request->has('to'))
        {
            $from = $request->input('from');
            $to = $request->input('to');

            $fromDate = date('Y-m-d', strtotime($from));
            $toDate= date('Y-m-d', strtotime($to));

            $query->whereBetween('created_at',[$fromDate, $toDate]);
        }
        else {
            $fromDate  = Carbon::parse('2023-01-01');
            $toDate = Carbon::now()->today();
            $query->whereBetween('created_at',[$fromDate, $toDate]);
        }
        $users = $query->groupBy('year', 'month')
                        ->orderBy('year','asc')
                        ->orderBy('month','asc')
                        ->get();
     

            return response()->json($users);
    }

    public function getAllUsers(Request $request)
    {
        $searchTerm = $request->input('search');
        $query = User::query();

        if (!empty($searchTerm)) {
            $query->where('name', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('username', 'LIKE', "%{$searchTerm}%");
        }
        $users = $query->paginate(10);

    return response()->json($users);
    }

    public function deleteUser($id)
    {

        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ],204);

    }
}
