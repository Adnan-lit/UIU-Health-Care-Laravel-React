<?php


use App\Http\Controllers\Doctor\DoctorController;
use App\Http\Controllers\Patient\PatientController;
use Illuminate\Support\Facades\Route;


Route::group([
    'prefix'     => 'doctor',
    'middleware' => ['auth', 'verified','role:doctor'],
], function () {
    Route::get('/consultation', [DoctorController::class, 'consultations'])
        ->name('doctor.consultations');
    Route::get('/consultation/{id}', [PatientController::class, 'videoCall'])
        ->name('doctor.consultations.call');
});
