<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\WelcomeEmail;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }
    public function settings()
    {
        return Inertia::render('Admin/Settings');
    }

    public function searchDoctor(Request $request)
    {


        $doctors = DB::table('doctors')
            ->join('users', 'doctors.doc_id', '=', 'users.id')
            ->select('doctors.*', 'users.profile_photo_path', 'users.email', 'users.phone')
            ->where('users.name', 'like', '%' . $request->search . '%')
            ->get();



        // educations and experiences are stored as JSON in the database
        // so we need to decode them
        $doctors->each(function ($doctor) {
            $doctor->educations = json_decode($doctor->educations);
            $doctor->experiences = json_decode($doctor->experiences);
        });

        return Inertia::render('Admin/Doctors', [
            'doctors' => $doctors,
            'search' => $request->search,
        ]);
    }

    public function doctors()
    {
//   run raw sql query
        $doctors = DB::select('
    SELECT
        doctors.doc_id,
        doctors.name,
        doctors.specialty,
        doctors.educations,
        doctors.experiences,
        users.profile_photo_path,
        users.email,
        users.phone,
        COUNT(appointments.app_id) AS appointment_count
    FROM
        doctors
    INNER JOIN
        users ON doctors.doc_id = users.id
    LEFT JOIN
        appointments ON doctors.doc_id = appointments.doc_id
    GROUP BY
        doctors.doc_id,
        doctors.name,
        doctors.specialty,
        doctors.educations,
        doctors.experiences,
        users.profile_photo_path,
        users.email,
        users.phone
');

        $doctors = collect($doctors);
        // educations and experiences are stored as JSON in the database
        // so we need to decode them
        $doctors->each(function ($doctor) {
            $doctor->educations = json_decode($doctor->educations);
            $doctor->experiences = json_decode($doctor->experiences);
        });



        return Inertia::render('Admin/Doctors', [
            'doctors' => $doctors,
        ]);
    }
    public function addDoctor()
    {
        return Inertia::render('Admin/AddDoctor');
    }
    public function createDoctor(Request $request)
    {
        // Validate the input data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'specialty' => 'required|string|max:255',
            'educations' => 'required|array',
            'educations.*.degree' => 'required|string|max:255',
            'educations.*.institution' => 'required|string|max:255',
            'experiences' => 'required|array',
            'experiences.*.designation' => 'required|string|max:255',
            'experiences.*.hospital' => 'required|string|max:255',
        ]);

        // Check if the email or phone already exists
        $emailExists = User::where('email', $validatedData['email'])->exists();
        $phoneExists = User::where('phone', $validatedData['phone'])->exists();

        if ($emailExists || $phoneExists) {
            return response()->json([
                'errors' => [
                    'email' => $emailExists ? 'This email is already in use.' : null,
                    'phone' => $phoneExists ? 'This phone number is already in use.' : null,
                ]
            ], 422); // 422 Unprocessable Entity
        }
        else{
            //send email to the doctor
            $to_name = $validatedData['name'];
            $to_email = $validatedData['email'];
            $subject = "Welcome to our system";
            $password = fake()->unique()->randomNumber(8);
            $data = array('name'=>$to_name, "body" => "You have been added as a doctor in our system. Your default password is {$password}. Please change it after logging in.");

            Mail::to($to_email)->send(new WelcomeEmail($data));


            // Create the user first
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'role' => 1,
                'phone' => $validatedData['phone'],
                'password' => bcrypt($password), // Use a default password or generate one
            ]);

            // Add doctor-specific data to the validated data
            $validatedData['doc_id'] = fake()->unique()->randomNumber(8);
            $validatedData['educations'] = json_encode($validatedData['educations']);
            $validatedData['experiences'] = json_encode($validatedData['experiences']);

            // Create the doctor and associate with the user
            $doctor = new Doctor($validatedData);
            $doctor->doc_id = $user->id; // Assuming the Doctor model has a user_id field
            $doctor->save();

            return response()->json([
                'message' => 'Doctor added successfully.',
            ]);
        }


    }

    public function doctor($id)
    {
        // Get the doctor
        $doctors = DB::select('
    SELECT
        doctors.doc_id,
        doctors.name,
        doctors.specialty,
        doctors.educations,
        doctors.experiences,
        users.profile_photo_path,
        users.email,
        users.phone,
        COUNT(appointments.app_id) AS appointment_count
    FROM
        doctors
    INNER JOIN
        users ON doctors.doc_id = users.id
    LEFT JOIN
        appointments ON doctors.doc_id = appointments.doc_id
    WHERE doctors.doc_id = ?
    GROUP BY
        doctors.doc_id,
        doctors.name,
        doctors.specialty,
        doctors.educations,
        doctors.experiences,
        users.profile_photo_path,
        users.email,
        users.phone
', [$id]);
        $doctor = collect($doctors)->first();


        // educations and experiences are stored as JSON in the database
        // so we need to decode them
        $doctor->educations = json_decode($doctor->educations);
        $doctor->experiences = json_decode($doctor->experiences);

        return Inertia::render('Admin/Doctor', [
            'doctor' => $doctor,
        ]);
    }

}
