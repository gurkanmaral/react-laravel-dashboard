<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "category",
        "img",
        "description",
        "price",
        "numberInStock",
        "brand",
        "color",
        "active",
        "discount-price",

    ];

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

   
    public function orders():HasManyThrough
    {
        return $this->hasManyThrough(Order::class, OrderItem::class);
    }

    public function reviews():HasMany
    {
        return $this->hasMany(Review::class);
    }
}
