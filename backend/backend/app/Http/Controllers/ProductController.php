<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    public function getInventoryLevels(Request $request)
    {
        $query = Product::query();
    
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }
        if ($request->filled('brand')) {
            $query->where('brand', $request->brand);
        }
        if ($request->filled('color')) {
            $query->where('color', $request->color);
        }
    
        $products = $query->select('title', 'numberInStock','id')->get();
    
        return response()->json($products);
    }
    
    public function getProductDetails(Request $request)
    {
        $query = Product::query();

        if($request->filled('brand')) {
            $query->where('brand', $request->brand);
        }
        if($request->filled('category')) {
            $query->where('category', $request->category);
        }
        if($request->filled('color')) {
            $query->where('color', $request->color);
        }
        if ($request->filled('search')) {
            
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $products = $query->paginate(10);

        return response()->json($products);
    }
    
    public function addProductStock(ProductRequest $request,$id)
    {   
        $product = Product::findOrFail($id);
        
        $addedStock = $request->input('stock');

       $product->numberInStock += $addedStock;

           
            $product->save();

            
            return response()->json([
                'message' => 'Stock added successfully',       
            ]);
    }
}