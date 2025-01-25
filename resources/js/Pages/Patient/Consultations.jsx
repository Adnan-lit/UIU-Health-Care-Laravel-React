import { useState } from "react";
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import DoctorCard from "@/Pages/Patient/Components/DoctorCard.jsx";
import { router } from "@inertiajs/react";

export default function Consultations({doctors,consultations}) {
    const [activeTab, setActiveTab] = useState("book"); // Manage active tab state

    

    return (
        <PatientLayout title={"Consultation"}>

            <div className={'h-[80vh] flex flex-col overflow-y-auto'}>
                {/* Tabs */}
                <div className="flex justify-start space-x-4 border-b-2 pb-2">

                    <button
                        className={`px-4 py-2 font-semibold ${
                            activeTab === "book"
                                ? "text-[#f49e2a] border-b-2 border-[#f49e2a]"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("book")}
                    >
                        Book New Consultation
                    </button>
                    <button
                        className={`px-4 py-2 font-semibold ${
                            activeTab === "history"
                                ? "text-[#f49e2a] border-b-2 border-[#f49e2a]"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("history")}
                    >
                        History
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === "history" && (
                    <div className="p-6 bg-white shadow-md rounded-lg w-full overflow-y-auto">
                        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
                            Consultation History
                        </h2>

                        {/* Check if consultation history exists */}
                        {consultations && consultations.length > 0 ? (
                            <div className="space-y-4 h-[70vh] overflow-y-auto">
                                {consultations.map((history) => (
                                    <div
                                        key={history.id}
                                        className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200"
                                    >
                                        <div>
                                            <h3 className="text-lg font-bold text-orange-500">{history.name}</h3>
                                            <p className="text-sm text-gray-500">{history.status}</p>
                                            <p className="text-sm text-gray-400">{history.created_at}</p>
                                        </div>
                                        <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                            <button
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                                                onClick={() => viewDetails(history.id)}
                                            >
                                                View Details
                                            </button>
                                            <button
                                                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-300"
                                                onClick={() => downloadReceipt(history.id)}
                                            >
                                                Download Receipt
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-[70vh] flex justify-center items-center">
                                <p className="text-center text-gray-500">
                                    No consultation history available.
                                </p>
                            </div>
                        )}
                    </div>

                )}

                {activeTab === "book" && (
                    <div className="p-4 overflow-y-auto">
                        <h2 className="text-2xl font-bold text-center text-orange-500">
                            Popular Specialist
                        </h2>
                        <div className="h-[70vh] flex flex-wrap justify-evenly items-start ">
                            {/* Replace with actual doctor cards */}
                            {doctors.map((doctor) => (
                                <DoctorCard
                                    key={doctor.doc_id}
                                    doctor={doctor}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PatientLayout>
    );
}
