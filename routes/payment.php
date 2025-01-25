<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;


Route::group([
    'prefix'     => 'sslcommerz',
    'middleware' => ['auth', 'verified','role:patient'],
], function () {
    Route::get('/order', [PaymentController::class, 'order'])
        ->name('order');
    Route::post('/success', [PaymentController::class, 'success']);
    Route::post('/failure', [PaymentController::class, 'failure']);
    Route::post('/cancel', [PaymentController::class, 'cancel']);
    Route::post('/ipn', [PaymentController::class, 'ipn']);


});
