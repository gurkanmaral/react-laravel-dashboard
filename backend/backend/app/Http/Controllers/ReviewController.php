<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    public function getAverageProductRatings()
    {
        $average = Review::join('products', 'reviews.product_id', '=', 'products.id')
        ->select(
        'products.title', 
        'reviews.product_id', 
        DB::raw('ROUND(AVG(reviews.rating), 1) as average_rating'),
        DB::raw('COUNT(reviews.rating) as total_ratings') 
        )
        ->groupBy('reviews.product_id', 'products.title')
         ->get();

         return response()->json($average);
    }

    public function getReviewDetails()
    {
        $reviews = Review::with(['user'=> function ($query) {
            $query->select('id','email', 'username');
        }, 'product' => function ($query) {
            $query->select('id','title');
        }])->paginate(10);

        return response()->json($reviews);
    }
}
