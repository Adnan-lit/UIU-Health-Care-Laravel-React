<?php

namespace App\Http\Controllers\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DoctorController extends Controller
{
    //
    public function consultations()
    {
       $consultations = DB::table('consultations')
            ->join('users', 'consultations.user_id', '=', 'users.id')
            ->join('doctors', 'consultations.doc_id', '=', 'doctors.doc_id')
            ->select('consultations.id','consultations.created_at as time', 'consultations.status as status' ,'users.id as patientID', 'users.name as patientName')
            ->get();
       //history
        $history = DB::table('consultations')
            ->join('users', 'consultations.user_id', '=', 'users.id')
            ->join('doctors', 'consultations.doc_id', '=', 'doctors.doc_id')
            ->select('consultations.id','consultations.created_at as time', 'consultations.status as status' , 'users.name as patientName')
            ->where('consultations.status', 'completed')
            ->get();

        return Inertia::render('Doctor/Consultations', ['consultations' => $consultations, 'history' => $history]);
    }
}
