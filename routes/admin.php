<?php


use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;


Route::group([
    'prefix'     => 'admin',
    'middleware' => ['auth', 'verified','role:admin'],
], function () {
    Route::get('/', [AdminController::class, 'index'])
        ->name('admin');
    Route::get('/settings', [AdminController::class, 'settings'])
        ->name('admin.settings');
    Route::get('/doctors', [AdminController::class, 'doctors'])
        ->name('admin.doctors');
    Route::get('/doctors/add', [AdminController::class, 'addDoctor'])
        ->name('admin.doctors.add');
    Route::get('/doctors/{id}', [AdminController::class, 'doctor'])
        ->name('admin.doctors.show');
    Route::post('/doctors/search', [AdminController::class, 'searchDoctor'])
        ->name('admin.doctors.search');
    Route::post('/doctors/create', [AdminController::class, 'createDoctor'])
        ->name('admin.doctors.create');
});
