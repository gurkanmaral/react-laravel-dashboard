<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderItemController extends Controller
{
    
    public function getMostBoughtProducts(Request $request)
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
            
        $mostBoughtItems = DB::table('orders')
        ->join('order_items', 'orders.id', '=', 'order_items.order_id')
        ->join('products', 'order_items.product_id', '=', 'products.id')
        ->select(
            'products.title', 
            DB::raw('SUM(order_items.quantity) as total_bought_products')
        )
        ->whereBetween('orders.created_at', [$startDate, $endDate])
        ->groupBy('products.title')
        ->orderByDesc('total_bought_products')
        ->get();

    return response()->json($mostBoughtItems);

    }
    public function getOrderCountAndTotalProducts(Request $request)
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

   
    $data = DB::table('orders')
              ->join('order_items', 'orders.id', '=', 'order_items.order_id')
              ->select(
                  DB::raw("DATE_FORMAT(orders.created_at, '{$dateFormat}') as date"),
                  DB::raw('COUNT(DISTINCT orders.id) as order_count'),
                  DB::raw('SUM(order_items.quantity) as total_bought_products')
              )
              ->whereBetween('orders.created_at', [$startDate, $endDate])
              ->groupBy('date')
              ->orderBy('date')
              ->get();

    return response()->json($data);
}

}
