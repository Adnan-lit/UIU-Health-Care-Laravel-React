<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Doctor;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $user = User::create([
            'name' => fake()->name(),
            'email' => fake()->email(),
            'password' => bcrypt('12345678'),
            'role' => 1,
            "user_type" => "doctor",
        ]);

        Doctor::create([
            'doc_id' => $user->id,
            'name' => fake()->name(),
            'email' => fake()->email(),
            'phone' => fake()->phoneNumber(),
            'specialty' => fake()->jobTitle(),
            'educations' => json_encode(['SD', 'SMP', 'SMA']),
            'experiences' => json_encode(['2010-2012', '2012-2014', '2014-2016']),
        ]); 
    }
}

