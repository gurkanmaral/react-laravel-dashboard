<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Review;
use App\Models\SocialMedia;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(200)->create();

         Product::factory(50)->create();

         Order::factory(50)->create()->each(function ($order) {
            
            $itemsCount = rand(1, 3);
            for ($i = 0; $i < $itemsCount; $i++) {
                OrderItem::factory()->create([
                    'order_id' => $order->id,
                    'created_at' => $order->created_at,
                ]);
            }
    
          
            $totalPrice = $order->orderItems->sum(fn($item) => $item->quantity * $item->price);
            $order->update(['totalPrice' => $totalPrice]);

        });
        Review::factory(100)->create();

        SocialMedia::factory(100)->create();
    }
}
