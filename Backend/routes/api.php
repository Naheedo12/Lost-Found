<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/items', [ItemController::class, 'index']);
Route::get('/items/filter', [ItemController::class, 'filter']);
Route::get('/items/{item}', [ItemController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/my-items', [ItemController::class, 'myItems']);
    Route::post('/items', [ItemController::class, 'store']);
    Route::post('/items/{item}', [ItemController::class, 'update']);  
    Route::delete('/items/{item}', [ItemController::class, 'destroy']); 

    Route::middleware('role:admin')->prefix('admin')->group(function () {

        Route::post('/items/{item}', [ItemController::class, 'adminUpdate']);  
        Route::delete('/items/{item}', [ItemController::class, 'adminDestroy']); 
    });
});
