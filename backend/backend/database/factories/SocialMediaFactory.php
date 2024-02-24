<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SocialMedia>
 */
class SocialMediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'follow_count' => fake()->numberBetween(1,100),
            'like_count' => fake()->numberBetween(0,100),
            'comment_count' => fake()->numberBetween(0,100),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
