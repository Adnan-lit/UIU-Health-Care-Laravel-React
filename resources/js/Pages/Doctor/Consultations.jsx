import { useState, useEffect } from "react";
import DoctorLayout from "@/Pages/Doctor/Layout/DoctorLayout.jsx";
import { router } from "@inertiajs/react";
import DoctorCard from "@/Pages/Patient/Components/DoctorCard.jsx";

function makeCall(receiverID,consultationID) {
    console.log("Making call to patient with ID:", receiverID);
    console.log("Consultation ID:", consultationID);
    router.post(
        "/calling-notification",
        {
            receiverID: receiverID,
            consultationID: consultationID,
        },
    );

    //open new window in the browser
    window.open(`/doctor/consultation/${consultationID}`);

}

export default function Consultations({consultations,history}) {
    const [activeTab, setActiveTab] = useState("requests"); // State to manage active tab
    const [consultationRequests, setConsultationRequests] = useState([]); // Store consultation requests
    const [consultationHistory, setConsultationHistory] = useState([]); // Store consultation history

    useEffect(() => {
        // Fetch consultation requests and history from your API or database
        // For now, we will mock some data
        setConsultationRequests(consultations);

        setConsultationHistory(history);
    }, []);

    return (
        <DoctorLayout title={"Consultations"}>
            <div className={'h-[80vh] flex flex-col overflow-y-auto'}>
                {/* Tabs */}
                <div className="flex justify-start space-x-4 border-b-2 pb-2">

                    <button
                        className={`px-4 py-2 font-semibold ${
                            activeTab === "requests"
                                ? "text-[#f49e2a] border-b-2 border-[#f49e2a]"
                                : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("requests")}
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
                {activeTab === "requests" && (
                    <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Consultation Requests</h2>
                        {consultationRequests.length > 0 ? (
                            <div className="space-y-4">
                                {consultationRequests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {request.patientName}
                                        </h3>
                                        <p className="text-sm text-gray-600">{request.time}</p>
                                        <p className="text-sm text-gray-600">Status: {request.status}</p>
                                        <button
                                            className="mt-3 px-4 py-2 bg-[#f49e2a] text-white rounded hover:bg-[#f49e2a]"
                                            onClick={() => makeCall(request.patientID,request.id)}
                                        >
                                            Make Call
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No consultation requests available.</p>
                        )}
                    </div>

                )}

                {activeTab === "history" && (
                    <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Consultation History</h2>
                        {consultationHistory.length > 0 ? (
                            <div className="space-y-4">
                                {consultationHistory.map((history) => (
                                    <div
                                        key={history.id}
                                        className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {history.patientName}
                                        </h3>
                                        <p className="text-sm text-gray-600">{history.date}</p>
                                        <p className="text-sm text-gray-600">Status: {history.status}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No consultation history available.</p>
                        )}
                    </div>
                )}
            </div>
        </DoctorLayout>
    );
}
