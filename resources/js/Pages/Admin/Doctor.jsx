import AdminLayout from "@/Pages/Admin/Layout/AdminLayout.jsx";

export default function Doctor({doctor}) {
    console.log('doctor', doctor);
    return (
        <AdminLayout>
            <div className="w-full mx-auto overflow-y-auto px-10">
                <div className="mb-5">
                    <button onClick={
                        () => window.history.back()
                    } className="flex items-center text-orange-500 hover:underline">
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                        Back to List
                    </button>
                </div>

                <div className="bg-[#e4cfc1] shadow-md rounded-lg p-6">
                    <div className="flex items-center space-x-6">
                        <img src={doctor.profile_photo_path?doctor.profile_photo_path:"https://via.placeholder.com/150"} alt="Doctor" className="w-32 h-32 rounded-full"/>
                        <div>
                            <h1 className="text-2xl font-bold">{doctor.name}</h1>
                            <p className="text-orange-500 font-medium">{doctor.specialty}</p>
                            <p className="text-gray-500">{doctor.educations[0].degree}, {doctor.educations[0].institution}</p>
                            <p className="text-sm text-gray-500 mt-2 flex items-center">
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M8 7V3m8 4V3m-4 8v8m-4-4h8"/>
                                </svg>
                                {doctor.appointment_count} Appointments
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">About the Doctor</h2>
                    <div className={'flex gap-4 w-full h-fit'}>
                        <div className={'flex flex-col w-[50%] '}>
                            <p className="text-gray-700 leading-relaxed font-bold">Educations</p>
                            {doctor.educations.map((education) => (
                                <div key={education.id} className="flex items-center gap-4">
                                    <p className="text-gray-500">{education.degree}, {education.institution}</p>
                                </div>
                            ))}

                        </div>
                        <div className={'flex flex-col w-[50%] '}>
                            <p className="text-gray-700 leading-relaxed font-bold">Experiences</p>
                            {doctor.experiences.map((experience) => (
                                <div key={experience.id} className="flex items-center gap-4">
                                    <p className="text-gray-500">{experience.designation}, {experience.hospital}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Appointment History</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                            <div>
                                <p className="font-medium">Patient Name: John Doe</p>
                                <p className="text-sm text-gray-500">Date: 12th December 2024</p>
                            </div>
                            <button className="text-orange-500 hover:underline">View Details</button>
                        </li>
                        <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                            <div>
                                <p className="font-medium">Patient Name: Jane Smith</p>
                                <p className="text-sm text-gray-500">Date: 10th December 2024</p>
                            </div>
                            <button className="text-orange-500 hover:underline">View Details</button>
                        </li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    )
}
