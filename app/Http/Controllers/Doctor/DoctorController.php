<?php

namespace App\Http\Controllers\Doctor;
use App\Models\Appointment;
use App\Models\HealthRecord;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index()
    {
        $doctorId = auth()->id();

        // Get total completed appointments
        $completedAppointments = DB::table('appointments')
            ->where('doc_id', $doctorId)
            ->where('status', 'confirmed')
            ->count();

        // Get total completed consultations
        $completedConsultations = DB::table('consultations')
            ->where('doc_id', $doctorId)
            ->where('status', 'completed')
            ->count();

        // Get total appointments for today
        $todayAppointments = DB::table('appointments')
            ->where('doc_id', $doctorId)
            ->whereDate('date', now())
            ->count();

        // Get total patients
        $totalPatients = DB::table('appointments')
            ->where('doc_id', $doctorId)
            ->distinct('user_id')
            ->count('user_id');

        // Calculate percentage changes (example: compared to last month)
        $lastMonthAppointments = DB::table('appointments')
            ->where('doc_id', $doctorId)
            ->where('status', 'confirmed')
            ->whereMonth('date', now()->subMonth())
            ->count();

        $appointmentGrowth = $lastMonthAppointments > 0
            ? round((($completedAppointments - $lastMonthAppointments) / $lastMonthAppointments) * 100)
            : 0;


        $appointments = Appointment::with('user')
            ->where('doc_id', auth()->user()->id)
            ->get()
            ->map(function($appointment) {
                $appointment->user->health = HealthRecord::where('user_id', $appointment->user_id)->get();
                return $appointment;
            });

        return Inertia::render('Doctor/Dashboard', [
            'cardData' => [
                [
                    'name' => 'Total Patients',
                    'icon' => 'fas fa-users',
                    'color' => '#FFEDD5',
                    'iconColor' => '#F97316',
                    'value' => $totalPatients,
                    'percentage' => $appointmentGrowth,
                ],
                [
                    'name' => 'Appointments Completed',
                    'icon' => 'fas fa-calendar-check',
                    'color' => '#FEE2E2',
                    'iconColor' => '#EF4444',
                    'value' => $completedAppointments,
                    'percentage' => $appointmentGrowth,
                ],
                [
                    'name' => 'Today\'s Appointments',
                    'icon' => 'fas fa-calendar-day',
                    'color' => '#E0E7FF',
                    'iconColor' => '#6366F1',
                    'value' => $todayAppointments,
                    'percentage' => null,
                ],
                [
                    'name' => 'Consultations Done',
                    'icon' => 'fas fa-video',
                    'color' => '#D1FAE5',
                    'iconColor' => '#10B981',
                    'value' => $completedConsultations,
                    'percentage' => null,
                ],
            ],
            'appointments' => $appointments ?? [],
        ]);
    }

    public function messages()
    {

        $users = DB::table('users')
            ->where('role', '0')
            ->get();

            $messageHistory = DB::table('messages')
            ->join('users as sender', 'messages.sender_id', '=', 'sender.id')
            ->join('users as receiver', 'messages.receiver_id', '=', 'receiver.id')
            ->select('messages.*', 'sender.name as sender_name', 'receiver.name as receiver_name', 'sender.profile_photo_path as sender_photo', 'receiver.profile_photo_path as receiver_photo', 'sender.user_type as senderRole', 'receiver.user_type as receiverRole')
            ->where('messages.sender_id', auth()->user()->id)
            ->orWhere('messages.receiver_id', auth()->user()->id)
            ->orderBy('messages.timestamp', 'asc') // Specify the table for created_at
            ->get();
            $blobSasUrl = env('BLOB_SAS_URL');

        return Inertia::render('Doctor/Messages', ['users' => $users, 'messageHistory' => $messageHistory, 'blobSasUrl' => $blobSasUrl]);
    }

    public function appointments()
    {
        $appointments = DB::table('appointments')
            ->join('users', 'appointments.user_id', '=', 'users.id')
            ->select('appointments.*', 'users.name as patient_name', 'users.profile_photo_path as patient_photo', 'users.phone as patient_phone')
            ->where('appointments.doc_id', auth()->id())
            ->orderBy('appointments.updated_at', 'desc')
            ->get();


        return Inertia::render('Doctor/Appointments', ['appointments' => $appointments]);
    }
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

    public function updateAppointmentStatus(Request $request)
    {
        $validate = $request->validate([
            'app_id' => 'required',
            'status' => 'required'
        ]);
        DB::table('appointments')   
            ->where('app_id', $validate['app_id'])
            ->update(['status' => $validate['status']]);
        return response()->json(['message' => 'Appointment status updated successfully']);
    }
}
