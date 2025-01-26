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
            ->select('consultations.id','consultations.created_at as time', 'consultations.status as status' ,'users.id as patientID', 'users.name as patientName', 'users.profile_photo_path as patientPhoto')
            ->get();
       //history
        $history = DB::table('consultations')
            ->join('users', 'consultations.user_id', '=', 'users.id')
            ->join('doctors', 'consultations.doc_id', '=', 'doctors.doc_id')
            ->select('consultations.id','consultations.created_at as time', 'consultations.status as status' , 'users.name as patientName', 'users.profile_photo_path as patientPhoto')
            ->where('consultations.status', 'completed')
            ->get();

        return Inertia::render('Doctor/Consultations', ['consultations' => $consultations, 'history' => $history]);
    }

    public function patients()
    {
        // Get today's consultations
        $consultations = DB::table('consultations')
            ->join('users', 'consultations.user_id', '=', 'users.id')
            ->select(
                'consultations.id',
                'consultations.created_at as time',
                'consultations.status',
                'users.id as patient_id',
                'users.name as patient_name',
                'users.profile_photo_path',
                DB::raw("'Consultation' as type")
            )
            ->where('consultations.doc_id', auth()->id());

        // Get today's appointments
        $appointments = DB::table('appointments')
            ->join('users', 'appointments.user_id', '=', 'users.id')
            ->select(
                'appointments.app_id as id',
                'appointments.time',
                'appointments.status',
                'users.id as patient_id',
                'users.name as patient_name',
                'users.profile_photo_path',
                DB::raw("'Appointment' as type")
            )
            ->where('appointments.doc_id', auth()->id());

        // Combine and sort by time
        $patients = $consultations->union($appointments)
            ->orderBy('time')
            ->get();


        return Inertia::render('Doctor/Patient', [
            'patients' => $patients
        ]);
    }

    public function patientDetails($patientId)
    {
        // Get patient basic info
        $patient = DB::table('users')
            ->where('users.id', $patientId)
            ->first();

        // Get health records
        $healthRecords = DB::table('health_records')
            ->where('user_id', $patientId)
            ->orderBy('date', 'desc')
            ->first();

        // Get medical history
        // $medicalHistory = DB::table('medical_histories')
        //     ->where('user_id', $patientId)
        //     ->orderBy('date', 'desc')
        //     ->get();

        // // Get test records
        // $testRecords = DB::table('test_records')
        //     ->where('user_id', $patientId)
        //     ->orderBy('date', 'desc')
        //     ->get();

        //for now, dummy data for medical history and test records
        $medicalHistory = [];
        $testRecords = [];

        // Get past appointments with doctor details
        $appointments = DB::table('appointments')
            ->join('users as doctors', 'appointments.doc_id', '=', 'doctors.id')
            ->join('doctors as doc_details', 'doctors.id', '=', 'doc_details.doc_id')
            ->where('appointments.user_id', $patientId)
            ->select(
                'appointments.app_id as id',
                'appointments.date',
                'appointments.time',
                'appointments.status',
                'appointments.problem',
                'doctors.name as doctor_name',
                'doctors.profile_photo_path as doctor_photo',
                'doc_details.specialty',
            )
            ->orderBy('appointments.date', 'desc')
            ->orderBy('appointments.time', 'desc')
            ->get();


        return Inertia::render('Doctor/PatientDetails', [
            'patient' => $patient,
            'healthRecords' => $healthRecords,
            'medicalHistory' => $medicalHistory,
            'testRecords' => $testRecords,
            'appointments' => $appointments
        ]);
    }

    public function consultationReport($id)
    {
        $consultation = DB::table('consultations')
            ->join('users', 'consultations.user_id', '=', 'users.id')
            ->select(
                'consultations.*',
                'users.name as patient_name',
                'users.email as patient_email',
                'users.profile_photo_path as patient_photo',
                'users.phone as patient_phone'
            )
            ->where('consultations.id', $id)
            ->where('consultations.doc_id', auth()->id())
            ->first();

        if (!$consultation) {
            return redirect()->back()->with('error', 'Consultation not found');
        }

        return Inertia::render('Doctor/ConsultationReport', [
            'consultation' => $consultation
        ]);
    }
}
