<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = \Carbon\Carbon::create(2023,1,1,0,0,0);
        $endDate = now();
        $status = fake()->randomElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']);
        $cancellationReasons = ['There was a error in product', 'I did not like the product', 'Other'];


         $orderData = [
            'user_id' => User::inRandomOrder()->first()->id,
            'status' => $status,
            'payment_method' => fake()->randomElement(['credit card', 'paypal', 'bank transfer']),
            'shipping_address' => fake()->randomElement(['USA', 'Turkey', 'Germany', 'Japan', 'England', 'France']),
            'tracking_number' => fake()->regexify('[A-Z]{2}[0-9]{9}[A-Z]{2}'),
            'notes' => fake()->sentence(),
            'created_at' => fake()->dateTimeBetween($startDate, $endDate),
            'updated_at' => fake()->dateTimeBetween($startDate, $endDate),
        ];

        
        if ($status === 'cancelled') {
            $orderData['cancellation_reason'] = fake()->randomElement($cancellationReasons);
        }
        if($status === 'delivered')
        {
            $orderData['delivery_time'] = fake()->numberBetween(1,10);
        }

        return $orderData;
    }
    }

