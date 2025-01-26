import React, { useState } from "react";

export default function MedicineAndAppointment({nextAppointment}) {
    const [activeTab, setActiveTab] = useState("next-medicine");

    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    return (
            <div className="bg-white w-full shadow-lg rounded-lg p-5">
                {/* Tab Header */}
                <div className="flex justify-between bg-orange-500 rounded-t-lg">
                    <button
                        className={`flex-1 py-3 text-white font-bold text-center transition rounded-tl-lg ${
                            activeTab === "next-medicine" ? "bg-orange-400" : "hover:bg-orange-500"
                        }`}
                        onClick={() => showTab("next-medicine")}
                    >
                        Next Medicine
                    </button>
                    <button
                        className={`flex-1 py-3 text-white font-bold text-center transition rounded-tr-lg ${
                            activeTab === "next-appointment" ? "bg-orange-400" : "hover:bg-orange-500"
                        }`}
                        onClick={() => showTab("next-appointment")}
                    >
                        Next Appointment
                    </button>
                </div>

                {/* Content Sections */}
                {activeTab === "next-medicine" && (
                    <div id="next-medicine" className="max-h-64 overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#f58532]
">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-200 sticky top-0">
                            <tr>
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Type</th>
                                <th className="py-2 px-4 border-b">Dosage Time</th>
                                <th className="py-2 px-4 border-b">Schedule</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">Napa</td>
                                <td className="py-2 px-4 border-b">Tablet</td>
                                <td className="py-2 px-4 border-b">After Meal</td>
                                <td className="py-2 px-4 border-b">8:30 AM - 12:00 AM</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">Aspra</td>
                                <td className="py-2 px-4 border-b">Capsule</td>
                                <td className="py-2 px-4 border-b">Before Meal</td>
                                <td className="py-2 px-4 border-b">8:30 AM - 12:00 AM</td>
                            </tr>
 <tr className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">Napa</td>
                                <td className="py-2 px-4 border-b">Tablet</td>
                                <td className="py-2 px-4 border-b">After Meal</td>
                                <td className="py-2 px-4 border-b">8:30 AM - 12:00 AM</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">Aspra</td>
                                <td className="py-2 px-4 border-b">Capsule</td>
                                <td className="py-2 px-4 border-b">Before Meal</td>
                                <td className="py-2 px-4 border-b">8:30 AM - 12:00 AM</td>
                            </tr>
 <tr className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">Napa</td>
                                <td className="py-2 px-4 border-b">Tablet</td>
                                <td className="py-2 px-4 border-b">After Meal</td>
                                <td className="py-2 px-4 border-b">8:30 AM - 12:00 AM</td>
                            </tr>
                            <tr className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">Aspra</td>
                                <td className="py-2 px-4 border-b">Capsule</td>
                                <td className="py-2 px-4 border-b">Before Meal</td>
                                <td className="py-2 px-4 border-b">8:30 AM - 12:00 AM</td>
                            </tr>



                            {/* Repeat other rows */}
                            </tbody>
                        </table>
                    </div>

                )}
                {console.log(nextAppointment)}

                {activeTab === "next-appointment" && nextAppointment && (
                    <div id="next-appointment" className="p-6">
                        <div
                            className="p-6 bg-gradient-to-r from-orange-100 to-white rounded-lg shadow-md flex flex-col sm:flex-row items-center">
                            {/* Doctor's Details */}
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 mb-2">{nextAppointment.specialty}</p>
                                <h3 className="text-xl font-bold text-gray-900">{nextAppointment.name}</h3>
                                <p className="text-orange-500 font-medium">

                                    {
                                        JSON.parse(nextAppointment.educations)[0].degree
                                    }

                                </p>
                                <p className="text-gray-600 mb-4">
                                    {
                                        JSON.parse(nextAppointment.educations)[0].institute
                                    }
                                </p>

                                {/* Appointment Info */}
                                <div className="flex items-center text-gray-600 space-x-4">
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-orange-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                        <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="ml-2 text-sm">{nextAppointment.time}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-orange-500"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 7V3m8 4V3m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="ml-2 text-sm">{nextAppointment.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Doctor's Image */}
                            <div
                                className="w-40 h-40 bg-cover bg-center rounded-lg ml-2 shadow-lg"
                                style={{ backgroundImage: `url(${nextAppointment.profile_photo_path})` }}
                            ></div>
                        </div>
                    </div>
                )}
                {activeTab === "next-appointment" && !nextAppointment && (
                    <div id="next-appointment" className="p-6">
                        <div
                            className="p-6 bg-gradient-to-r from-orange-100 to-white rounded-lg shadow-md flex flex-col sm:flex-row items-center">
                            {/* Doctor's Details */}
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-500 mb-2">No Upcoming Appointments</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    );
}
