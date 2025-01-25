import AdminLayout from "@/Pages/Admin/Layout/AdminLayout.jsx";
import {Head, Link, useForm} from "@inertiajs/react";
import React from "react";

export default function Doctors({doctors}) {
    const { data, setData, post, errors, reset,processing } = useForm({
        search: '',
    });
        console.log('doctors', doctors);

    return (
        <AdminLayout>
            <Head title="Doctors"/>
            <div className="flex gap-6 w-full h-[10%]">
                <h1 className="text-2xl font-bold">Doctor List</h1>
                <Link
                    className="bg-[#f68b1f] rounded-lg text-white font-bold h-10 items-center pt-2 w-28 text-center justify-center"
                    href="/admin/doctors/add"
                >
                    Add Doctor
                </Link>

                <form className="w-60 ml-auto"

                >
                    <label htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="search"
                               name={'search'}
                               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                               placeholder="Search Doctors" required/>
                        <button type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-[#f68b1f] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">Search
                        </button>
                    </div>
                </form>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto">
                {
                    doctors.length === 0 && (
                        <div className="col-span-4 w-full h-full flex items-center justify-center">
                            <p className="text-lg font-semibold">No Doctors Found</p>
                        </div>
                    )
                }

                {
                    doctors.length >0 &&   doctors.map((doctor) => (
                    <Link key={doctor.doc_id} className="bg-white rounded-lg shadow-md p-5 flex flex-col items-center hover:border-orange-200 hover:border-2"
                            href={`/admin/doctors/${doctor.doc_id}`}
                    >
                        <img src={doctor.profile_photo_path?doctor.profile_photo_path:"https://via.placeholder.com/150"} alt="Doctor"
                             className="w-24 h-24 rounded-full mb-4"/>
                        <div className="text-center">
                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                            <p className="text-orange-500 font-medium">{doctor.specialty}</p>
                            <p className="text-gray-500">{doctor.educations[0].degree},{doctor.educations[0].institution}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M8 7V3m8 4V3m-4 8v8m-4-4h8"/>
                                </svg>
                                {doctor.appointment_count} Appointments
                            </div>
                        </div>
                    </Link>
                ))
                }

            </div>
        </AdminLayout>
    );
}
