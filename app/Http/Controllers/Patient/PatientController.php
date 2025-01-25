<?php

namespace App\Http\Controllers\Patient;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        $healthRecords = DB::table('health_records')
            ->select('health_records.*')
            ->where('health_records.user_id', auth()->user()->id)
            ->orderBy('health_records.date', 'desc') // Specify the table for created_at
            ->first();

        $nextAppointment = DB::table('appointments')
            ->join('doctors', 'appointments.doc_id', '=', 'doctors.doc_id')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('appointments.*', 'doctors.*', 'users.profile_photo_path')
            ->where('appointments.user_id', auth()->user()->id)
            ->where('appointments.date', '>=', now())
            ->orderBy('date')
            ->orderBy('time')
            ->first();
        return Inertia::render('Patient/Dashboard', ['healthRecords' => $healthRecords, 'nextAppointment' => $nextAppointment]);
    }
    public function messages()
    {
        $users = DB::table('users')
            ->select('users.*')
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
        return Inertia::render('Patient/Messages', ['messageHistory' => $messageHistory, 'users' => $users, 'blobSasUrl' => $blobSasUrl]);
    }
    public function appointments()
    {
        $doctors = DB::table('doctors')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('doctors.*', 'users.profile_photo_path', 'users.email', 'users.phone')
            ->get();

        // only upcomming appointments
        $appointments = DB::table('appointments')
            ->join('doctors', 'appointments.doc_id', '=', 'doctors.doc_id')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('appointments.*', 'doctors.*', 'users.name', 'users.email', 'users.phone','users.profile_photo_path')
            ->where('appointments.user_id', auth()->user()->id)
            ->where('appointments.date', '>=', now())
            ->orderBy('date',direction: 'desc')
            ->orderBy('time',direction: 'desc')
            ->get();
        // previous appointments
        $previousAppointments = DB::table('appointments')
            ->join('doctors', 'appointments.doc_id', '=', 'doctors.doc_id')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('appointments.*', 'doctors.*', 'users.name', 'users.email', 'users.phone', 'users.profile_photo_path')
            ->where('appointments.user_id', auth()->user()->id)
            ->where('appointments.date', '<', now())
            ->orderBy('date',direction: 'desc')
            ->orderBy('time',direction: 'desc')
            ->get();
        return Inertia::render('Patient/Appointments',
            ['doctors' => $doctors, 'appointments' => $appointments, 'previousAppointments' => $previousAppointments]);
    }
    public function createAppointment(Request $request)
    {
       $validated = $request->validate([
            'doc_id' => 'required|exists:doctors,doc_id',
            'date' => 'required',
            'time' => 'required',
           'problems' => 'nullable',
        ]);

       // convert date to Y-m-d format
        $validated['date'] = date('Y-m-d', strtotime($validated['date']));
        //add one day to the date
        $validated['date'] = date('Y-m-d', strtotime($validated['date'] . ' +1 day'));
        DB::table('appointments')->insert([
            'user_id' => auth()->user()->id,
            'doc_id' => $validated['doc_id'],
            'date' => $validated['date'],
            'time' => $validated['time'],
            'problem' => $validated['problems'],
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
            'status_updated_at' => now(),
        ]);
        //only upcomming appointments
        $appointments = DB::table('appointments')
            ->join('doctors', 'appointments.doc_id', '=', 'doctors.doc_id')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('appointments.*', 'doctors.*', 'users.name', 'users.email', 'users.phone')
            ->where('appointments.user_id', auth()->user()->id)
            ->where('appointments.date', '>=', now())
            ->orderBy('date')
            ->orderBy('time')
            ->get();
        // past appointments
        $previousAppointments = DB::table('appointments')
            ->join('doctors', 'appointments.doc_id', '=', 'doctors.doc_id')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('appointments.*', 'doctors.*', 'users.name', 'users.email', 'users.phone')
            ->where('appointments.user_id', auth()->user()->id)
            ->where('appointments.date', '<', now())
            ->orderBy('date')
            ->orderBy('time')
            ->get();
        $doctors = DB::table('doctors')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('doctors.*', 'users.profile_photo_path', 'users.email', 'users.phone')
            ->get();
        // redirect back
        return redirect()->route('patient.appointments',
            ['doctors' => $doctors, 'appointments' => $appointments, 'previousAppointments' => $previousAppointments]);

    }
    public function consultations(Request $request)
    {
        $doctors = DB::table('doctors')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('doctors.*', 'users.profile_photo_path', 'users.email', 'users.phone')
            ->get();
        $consultations = DB::table('consultations')
            ->join('doctors', 'consultations.doc_id', '=', 'doctors.doc_id')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('consultations.*', 'doctors.name', 'doctors.specialty', 'users.profile_photo_path')
            ->where('consultations.user_id', auth()->user()->id)
            ->orderBy('consultations.created_at', 'asc') // Specify the table for created_at
            ->get();

        return Inertia::render('Patient/Consultations', ['doctors' => $doctors, 'consultations' => $consultations]);
    }
    public function bookConsultation(Request $request)
    {
        $docID = $request->id;
        $doctor = DB::table('doctors')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('doctors.*', 'users.profile_photo_path', 'users.email', 'users.phone')
            ->where('doctors.doc_id', $docID)
            ->first();
        return Inertia::render('Patient/BookConsultation', ['doctor' => $doctor]);
    }
    public function booking(Request $request)
    {
//        $authUser = auth()->user();
//        $validated = $request->validate([
//            'doc_id' => 'required|exists:doctors,doc_id',
//        ]);
//
//        return redirect()->route('patient.consultations', ['doctors' => $doctors]);
    }
    public function videoCall($id)
    {
        $name = auth()->user()->name;
        return Inertia::render('Patient/VideoCall', ['id' => $id, 'name' => $name]);
    }
    public function medicines()
    {
        return Inertia::render('Patient/Medicines');
    }
    public function healthRecords()
    {
        $healthRecords = DB::table('health_records')
            ->select('health_records.*')
            ->where('health_records.user_id', auth()->user()->id)
            ->orderBy('health_records.date', 'desc') // Specify the table for created_at
            ->get();
        return Inertia::render('Patient/HealthRecords', ['healthRecords' => $healthRecords]);
    }
    public function addHealthRecord()
    {
        return Inertia::render('Patient/AddHealthRecord');
    }

    public function storeHealthRecord(Request $request)
    {

//        {"weight":"34","heartRate":"34","systolic":"342","diastolic":"432","chest":"423","waist":"24","hip":"24"}"

        $record_details = $request->validate([
            'weight' => 'required',
            'height' => 'required',
            'heartRate' => 'required',
            'systolic' => 'required',
            'diastolic' => 'required',
            'chest' => 'required',
            'waist' => 'required',
            'hip' => 'required',
        ]);

//        $table->id();
//        $table->json('record_details');
//        $table->unsignedBigInteger('user_id');
//        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
//        $table->timestamp('date')->useCurrent();

        DB::table('health_records')->insert([
            'record_details' => json_encode($record_details),
            'user_id' => auth()->user()->id,
            'date' => now(),
        ]);

    }

    public function payments()
    {
        $payments = DB::table('payments')
            ->select('payments.*')
            ->where('payments.user_id', auth()->user()->id)
            ->orderBy('payments.created_at', 'asc') // Specify the table for created_at
            ->get();
        return Inertia::render('Patient/Payments', ['payments' => $payments]);
    }
    public function profile()
    {
        return Inertia::render('Patient/Profile');
    }
    public function bloodBank()
    {
        return Inertia::render('Patient/BloodBank');
    }
    public function settings()
    {
        return Inertia::render('Patient/Settings');
    }

    public function emergency()
    {
        return Inertia::render('Patient/Emergency');
    }

    public function upload()
    {
        //get BLOB_SAS_URL from env
        $blobSasUrl = env('BLOB_SAS_URL');
        return Inertia::render('Patient/FIleUpload', ['blobSasUrl' => $blobSasUrl]);
    }

}
