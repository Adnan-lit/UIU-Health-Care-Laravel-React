<?php

use App\Http\Controllers\CallingNotificationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SslCommerzPaymentController;
use App\Notifications\CallingNotification;
use App\Http\Controllers\DoctorController;
use App\Models\Doctor;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/landing', function () {
    return Inertia::render('LandingPage');
})->name('landing');


Route::post('calling-notification',CallingNotificationController::class);

Route::post('send-message',[MessageController::class,'sendMessage']);

Route::get('/search-users',[MessageController::class,'searchUsers']);


// SSLCOMMERZ Start
Route::get('/example1', [SslCommerzPaymentController::class, 'exampleEasyCheckout']);
Route::get('/example2', [SslCommerzPaymentController::class, 'exampleHostedCheckout']);

Route::post('/pay', [SslCommerzPaymentController::class, 'index']);
Route::post('/pay-via-ajax', [SslCommerzPaymentController::class, 'payViaAjax']);

Route::post('/success', [SslCommerzPaymentController::class, 'success']);
Route::post('/fail', [SslCommerzPaymentController::class, 'fail']);
Route::post('/cancel', [SslCommerzPaymentController::class, 'cancel']);

Route::post('/ipn', [SslCommerzPaymentController::class, 'ipn']);
//SSLCOMMERZ END

Route::get('/bkash/payment', [App\Http\Controllers\BkashTokenizePaymentController::class,'index']);
Route::get('/bkash/create-payment', [App\Http\Controllers\BkashTokenizePaymentController::class,'createPayment'])->name('bkash-create-payment');
Route::get('/bkash/callback', [App\Http\Controllers\BkashTokenizePaymentController::class,'callBack'])->name('bkash-callBack');

//search payment
Route::get('/bkash/search/{trxID}', [App\Http\Controllers\BkashTokenizePaymentController::class,'searchTnx'])->name('bkash-serach');

//refund payment routes
Route::get('/bkash/refund', [App\Http\Controllers\BkashTokenizePaymentController::class,'refund'])->name('bkash-refund');
Route::get('/bkash/refund/status', [App\Http\Controllers\BkashTokenizePaymentController::class,'refundStatus'])->name('bkash-refund-status');



// Route::get('/doctor', function () {
//     return Inertia::render('Doctor/Dashboard');
// })->middleware(['auth', 'verified','role:doctor'])->name('doctor');



Route::get('/pharmacist', function () {
    return Inertia::render('Pharmacist/Dashboard');
})->middleware(['auth', 'verified','role:pharmacist'])->name('pharmacist');

//Route::get('/patient', function () {
//    return Inertia::render('Patient/Consultations');
//})->middleware(['auth', 'verified','role:patient'])->name('patient');


//Route::middleware(['auth', 'verified','role:patient'])->group(function () {
//    Route::controller(PatientController::class, 'patient')->group(function () {
//        Route::prefix('patient')->group(function () {
//            Route::get('/',  'index')->name('patient');
//        });
//    });
//});



Route::get('/notification', function () {
    $user = auth()->user();
    $callDetails = [
        'caller_id' => auth()->id(),
        'caller_name' => auth()->user()->name,
        'message' => 'You have an incoming call!',
        'call_time' => now(),
    ];
    $user->notify(new CallingNotification($callDetails));
    return "Notification";
})->name('notification');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/messages', [MessageController::class, 'send'])->name('messages.send');

});



Route::middleware(['auth', 'verified', 'role:doctor'])
    ->group(function () {
        Route::redirect('/', '/doctor'); // Redirect root to /doctor

        Route::prefix('doctor')->group(function () {
            Route::get('/', [DoctorController::class, 'index'])->name('doctor.index');
            Route::get('/patient', [DoctorController::class, 'patient'])->name('doctor.patient');
            Route::get('/patient/{id}', [DoctorController::class, 'showPatient'])->name('doctor.patient.show');

        });
    }

);

Route::fallback(function () {
     return Inertia::render('Error', ['status' => 404]);
});



require __DIR__.'/auth.php';
require __DIR__.'/patient.php';
require __DIR__.'/admin.php';
require __DIR__.'/doctor.php';

//require __DIR__.'/payment.php';
