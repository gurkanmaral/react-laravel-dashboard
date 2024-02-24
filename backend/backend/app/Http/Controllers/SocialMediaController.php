<?php

namespace App\Http\Controllers;

use App\Models\SocialMedia;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SocialMediaController extends Controller
{
    public function getTotalFollows(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
    
        if ($startDate && $endDate) {
           
            $startDate = Carbon::parse($startDate);
            $endDate = Carbon::parse($endDate);
            $dateFormat = '%Y-%m-%d'; 
        } else {
            
            $startDate = Carbon::parse('2023-01-01');
            $endDate = Carbon::now()->today();
            $dateFormat = '%Y-%m-%d';
        }
    
        $data = SocialMedia::select(
            DB::raw("DATE_FORMAT(social_media.created_at, '{$dateFormat}') as date"),
            DB::raw('SUM(follow_count) as total_follows'),
       
        )
        ->whereBetween('social_media.created_at', [$startDate, $endDate])
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        return response()->json($data);
    }
    public function getTotalLikes(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
    
        if ($startDate && $endDate) {
           
            $startDate = Carbon::parse($startDate);
            $endDate = Carbon::parse($endDate);
            $dateFormat = '%Y-%m-%d'; 
        } else {
            
            $startDate = Carbon::parse('2023-01-01');
            $endDate = Carbon::now()->today();
            $dateFormat = '%Y-%m-%d';
        }
    
        $data = SocialMedia::select(
            DB::raw("DATE_FORMAT(social_media.created_at, '{$dateFormat}') as date"),      
            DB::raw('SUM(like_count) as total_likes'),
          
        )
        ->whereBetween('social_media.created_at', [$startDate, $endDate])
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        return response()->json($data);
    }
    public function getTotalComments(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
    
        if ($startDate && $endDate) {
           
            $startDate = Carbon::parse($startDate);
            $endDate = Carbon::parse($endDate);
            $dateFormat = '%Y-%m-%d'; 
        } else {
            
            $startDate = Carbon::parse('2023-01-01');
            $endDate = Carbon::now()->today();
            $dateFormat = '%Y-%m-%d';
        }
    
        $data = SocialMedia::select(
            DB::raw("DATE_FORMAT(social_media.created_at, '{$dateFormat}') as date"),      
            DB::raw('SUM(comment_count) as total_comments')
        )
        ->whereBetween('social_media.created_at', [$startDate, $endDate])
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        return response()->json($data);
    }
}
