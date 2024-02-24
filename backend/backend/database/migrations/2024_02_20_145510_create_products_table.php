<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category');
            $table->string('img')->nullable(); 
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->unsignedInteger('numberInStock');
            $table->string('brand')->nullable();
            $table->string('color')->nullable();
            $table->boolean('active')->default(true); 
            $table->decimal('discount_price', 8, 2)->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
