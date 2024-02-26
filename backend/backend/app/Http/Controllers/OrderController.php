<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function getCountriesData()
    {
        $data = DB::table('orders')
        ->select('shipping_address',DB::raw('count(*) as total'))
        ->groupBy('shipping_address')
        ->get();

        return response()->json($data);
        // $orders = Order::all()->groupBy('shipping_address');

        // // Count the orders for each shipping address
        // $data = $orders->map(function ($items, $shippingAddress) {
        //     return [
        //         'shipping_address' => $shippingAddress,
        //         'total' => $items->count(),
        //     ];
        // })->values(); // 'values()' to reset the keys after grouping
    
        // return response()->json($data);
    }

    public function getDeliveredTime()
    {

      $data = Order::selectRaw("delivery_time as delivery_date, COUNT(*) as order_count")
        ->where('status', 'delivered')
        ->whereNotNull('delivery_time')
        ->groupBy('delivery_date')
        ->get();

    return response()->json($data);
    }
    
    public function getCancellationReason()
    {

        $order = Order::select('cancellation_reason')
        ->selectRaw('COUNT(*) as total')
        ->where('status', 'cancelled')
        ->whereNotNull('cancellation_reason')
        ->groupBy('cancellation_reason')
        ->get();

        return response()->json($order);
    }
    
    public function getTotalRevenue(Request $request)
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
        
        $orders = Order::select(
            DB::raw("SUM(totalPrice) as totalPrice"), 
            DB::raw("DATE_FORMAT(orders.created_at, '{$dateFormat}') as date"),)
            ->where('status', '!=', 'cancelled')
            ->whereBetween('orders.created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->orderBy('date')
            ->get();
          
            $responseData = [
                'orders' => $orders,
            ];
        
        return response()->json($responseData);
    }

    public function getOrderDetails(Request $request)
    {
        // or  $orders = Order::with('orderItems.product')->paginate(10);

        $query = Order::query();

        if ($request->filled('search')) {
            $query->whereHas('user', function($q) use ($request) {
                $q->where('email', 'like', '%' . $request->search . '%');
            });
        }
        if($request->filled('status')) {
            $query->where('status', $request->status);
        }
        $query = $query->with(['orderItems' => function ($query) {
            $query->select('id', 'order_id', 'product_id', 'quantity');
        }, 'orderItems.product' => function ($query) {
            $query->select('id', 'title', 'price', 'brand', 'color');
        }, 'user' => function ($query) {
            $query->select('id', 'email');
        }]);

        $orders = $query->paginate(10);
        
        return response()->json($orders);
    }

    public function getCountryDetails()
    {
        $orders = Order::select('shipping_address')->get();
        
        
        return response()->json($orders);
    }

    public function getRevenue()
    {
        $orders = Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, SUM(totalPrice) as total')
        ->where('status', '!=', 'cancelled')
        ->groupBy('year','month')
        ->orderBy('year', 'DESC')
        ->orderBy('month', 'DESC')->get();


        $total = Order::where('status', '!=', 'cancelled')
        ->sum('totalPrice');

        return [
            'revenue' => $orders,
            'total' => $total
        ];
    }
}
