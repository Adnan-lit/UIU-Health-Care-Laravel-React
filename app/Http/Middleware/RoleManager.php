<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleManager
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        if(!Auth::check()) {
            return redirect()->route('landing');

        }
        $authUserRole = Auth::user()->role;

        switch ($role) {
            case 'patient':
                if($authUserRole == 0) {
                    return $next($request);
                }
                break;
            case 'doctor':
                if($authUserRole == 1) {
                    return $next($request);
                }
                break;
            case 'pharmacist':
                if($authUserRole == 2) {
                    return $next($request);
                }
                break;
            case 'admin':
                if($authUserRole == 3) {
                    return $next($request);
                }
                break;
        }

        switch ($authUserRole) {
            case 0:
                return redirect()->route('patient');
                break;
            case 1:
                return redirect()->route('doctor');
                break;
            case 2:
                return redirect()->route('pharmacist');
                break;
            case 3:
                return redirect()->route('admin');
                break;
        }

        return  redirect()->route('landing');
    }
}
