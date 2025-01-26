<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Appointment;
use App\Models\User;
use App\Models\Doctor;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'd@gmail.com')->first();
        $doctor = Doctor::where('doc_id', $user->id)->first();
        Appointment::create([
            'doc_id' => $doctor->doc_id,
            'user_id' => 1,
            'date' => now(),
            'time' => now(),
            'status' => 'Pending',
            "problem" => fake()->text(),
        ]);
    }
}

