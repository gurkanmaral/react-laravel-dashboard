<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = fake()->randomElement(['laptops', 'desktops', 'phones']);
        
        $brands = [
            'laptops' => ['Apple', 'MSI', 'Monster'],
            'desktops' => ['MSI', 'Apple', 'Monster'],
            'phones' => ['Apple', 'Samsung', 'Huawei'],
        ];
        return [
            'title' => fake()->unique()->word(),
            'category' => $category,
            'description' =>fake()->paragraph(),
            'price' => fake()->randomFloat(2, 1, 1000),
            'numberInStock' => fake()->numberBetween(0, 100),
            'brand' => fake()->randomElement($brands[$category]),
            'color' => fake()->randomElement(['black', 'white', 'red','gray']),
            'active' => true,          
        ];
    }
}
