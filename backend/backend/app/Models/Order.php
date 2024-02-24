<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        "userId",    
        "totalPrice",
        "status",
        "payment_method",
        "shipping_address",
        "tracking_number",
        "cancellation_reason",
        "notes",
        "delivery_time",
        
    ];

    public function orderItems() : HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
    
    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
