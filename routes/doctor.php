<?php


use App\Http\Controllers\Doctor\DoctorController;
use App\Http\Controllers\Patient\PatientController;
use Illuminate\Support\Facades\Route;


Route::group([
    'prefix'     => 'doctor',
    'middleware' => ['auth', 'verified','role:doctor'],
], function () {
    Route::get('/patient', [DoctorController::class, 'patients'])
        ->name('doctor.patient');
    Route::get('/patient/{id}', [DoctorController::class, 'patientDetails'])
        ->name('doctor.patient.details');
    Route::get('/consultation', [DoctorController::class, 'consultations'])
        ->name('doctor.consultations');
    Route::get('/consultation/{id}', [PatientController::class, 'videoCall'])
        ->name('doctor.consultations.call');
    Route::get('/consultation/history/{id}', [DoctorController::class, 'consultationReport'])
        ->name('doctor.consultation.details');
});
