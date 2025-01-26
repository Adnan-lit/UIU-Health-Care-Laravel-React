import { useState, useEffect } from "react";
import DoctorLayout from "@/Pages/Doctor/Layout/DoctorLayout.jsx";
import { router, Link } from "@inertiajs/react";
import DoctorCard from "@/Pages/Patient/Components/DoctorCard.jsx";

function makeCall(receiverID, consultationID) {
    console.log("Making call to patient with ID:", receiverID);
    console.log("Consultation ID:", consultationID);
    router.post("/calling-notification", {
        receiverID: receiverID,
        consultationID: consultationID,
    });

    window.open(`/doctor/consultation/${consultationID}`);
}

function updateStatus(consultationID, newStatus) {
    router.post("/update-consultation-status", {
        consultationID: consultationID,
        status: newStatus,
    });
}

export default function Consultations({ consultations, history }) {
    const [activeTab, setActiveTab] = useState("requests");
    const [consultationRequests, setConsultationRequests] = useState([]);
    const [consultationHistory, setConsultationHistory] = useState([]);

    useEffect(() => {
        setConsultationRequests(consultations);
        setConsultationHistory(history);
    }, []);

    // Format date function
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

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
                    <div className="w-full bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                            Consultation Requests
                        </h2>
                        {consultationRequests.length > 0 ? (
                            <div className="space-y-4">
                                {consultationRequests.map((request) => (
                                    <div
                                        key={request.id}
                                        className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                {/* Patient Image */}
                                                <img
                                                    src={request.patientPhoto || "/default-avatar.png"}
                                                    alt={request.patientName}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                
                                                {/* Patient Details */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {request.patientName}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {formatDate(request.time)}
                                                    </p>
                                                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                                                        request.status === 'pending' 
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : request.status === 'running'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {request.status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Updated Action Buttons */}
                                            <div className="flex items-center space-x-2">
                                                {request.status === 'pending' && (
                                                    <>
                                                        <button
                                                            className="px-4 py-2 bg-[#f49e2a] text-white rounded hover:bg-[#e38d19] transition flex items-center space-x-2"
                                                            onClick={() => makeCall(request.patientID, request.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            <span>Call</span>
                                                        </button>
                                                        
                                                    </>
                                                )}
                                                
                                                {request.status === 'running' && (
                                                    <>
                                                        <button
                                                            className="px-4 py-2 bg-[#f49e2a] text-white rounded hover:bg-[#e38d19] transition flex items-center space-x-2"
                                                            onClick={() => makeCall(request.patientID, request.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                            </svg>
                                                            <span>Rejoin</span>
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition flex items-center space-x-2"
                                                            onClick={() => updateStatus(request.id, 'completed')}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            <span>Complete</span>
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">
                                No consultation requests available.
                            </p>
                        )}
                    </div>
                )}

                {activeTab === "history" && (
                    <div className="w-full bg-white rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                            Consultation History
                        </h2>
                        {consultationHistory.length > 0 ? (
                            <div className="space-y-4">
                                {consultationHistory.map((consultation) => (
                                    <div
                                        key={consultation.id}
                                        className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-4">
                                                {/* Patient Image */}
                                                <img
                                                    src={consultation.patientPhoto || "/default-avatar.png"}
                                                    alt={consultation.patientName}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                                />
                                                
                                                {/* Patient Details */}
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-800">
                                                        {consultation.patientName}
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {formatDate(consultation.time)}
                                                    </p>
                                                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                                                        consultation.status === 'completed' 
                                                            ? 'bg-green-100 text-green-800'
                                                            : consultation.status === 'cancelled'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center space-x-2">
                                                {consultation.status === 'completed' && (
                                                    <Link
                                                        href={`/doctor/consultation/history/${consultation.id}`}
                                                        className="px-4 py-2 bg-[#f49e2a] text-white rounded hover:bg-[#e38d19] transition flex items-center space-x-2"
                                                    >
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="h-5 w-5" 
                                                            viewBox="0 0 24 24" 
                                                            fill="none" 
                                                            stroke="currentColor"
                                                        >
                                                            <path 
                                                                strokeLinecap="round" 
                                                                strokeLinejoin="round" 
                                                                strokeWidth="2" 
                                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                                            />
                                                        </svg>
                                                        <span>View Report</span>
                                                    </Link>
                                                )}
                                                {consultation.status === 'cancelled' && (
                                                    <span className="text-sm text-red-600">
                                                        Consultation Cancelled
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Additional Details */}
                                        {consultation.diagnosis && (
                                            <div className="mt-3 ml-16 p-3 bg-white rounded-lg border border-gray-100">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Diagnosis:</span> {consultation.diagnosis}
                                                </p>
                                                {consultation.prescription && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        <span className="font-medium">Prescription:</span> {consultation.prescription}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <svg 
                                    className="mx-auto h-12 w-12 text-gray-400" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth="2" 
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                    />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">
                                    No consultation history available
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DoctorLayout>
    );
}
