<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/users-by-month', [UserController::class, 'getUserByMonth']);
Route::get('/get-all-users', [UserController::class, 'getAllUsers']);
Route::delete('/user/{id}', [UserController::class, 'deleteUser']);


Route::get('/inventory-levels', [ProductController::class,'getInventoryLevels']);
Route::get('/get-product-details',[ProductController::class,'getProductDetails']);
Route::post('/add-stock/{id}',[ProductController::class, 'addProductStock']);

Route::get('/order-count',[OrderItemController::class, 'getOrderCountAndTotalProducts']);
Route::get('/most-bought-product',[OrderItemController::class, 'getMostBoughtProducts']);

Route::get('/get-countries-data',[OrderController::class, 'getCountriesData']);
Route::get('/get-delivered-data',[OrderController::class, 'getDeliveredTime']);
Route::get('/get-cancellation-data',[OrderController::class, 'getCancellationReason']);
Route::get('/get-total-revenue',[OrderController::class, 'getTotalRevenue']);
Route::get('/get-order-details', [OrderController::class,'getOrderDetails']);
Route::get('/get-country-details',[OrderController::class,'getCountryDetails']);
Route::get('/get-revenue',[OrderController::class, 'getRevenue']);

Route::get('/get-average-ratings',[ReviewController::class, 'getAverageProductRatings']);
Route::Get('/get-review-details',[ReviewController::class,'getReviewDetails']);

Route::get('/get-total-follows',[SocialMediaController::class, 'getTotalFollows']);
Route::get('/get-total-likes',[SocialMediaController::class, 'getTotalLikes']);
Route::get('/get-total-comments',[SocialMediaController::class, 'getTotalComments']);