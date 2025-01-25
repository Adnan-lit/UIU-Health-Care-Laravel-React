<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
       $authenticateRole = Auth::user()->role;
       if($authenticateRole == 0 ){
           return redirect()->intended(route('patient', absolute: false));
       }
       elseif($authenticateRole == 1 ){
           return redirect()->intended(route('doctor', absolute: false));
       }
       elseif($authenticateRole == 2 ){
           return redirect()->intended(route('pharmacist', absolute: false));
       }
       elseif($authenticateRole == 3 ){
           return redirect()->intended(route('admin', absolute: false));
       }
       else{
           return redirect()->intended(route('login', absolute: false));
       }

       $request->session()->regenerate();

        // return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
