import React from 'react';
import DoctorLayout from '@/Pages/Doctor/Layout/DoctorLayout';
import { Head, Link } from '@inertiajs/react';

const ConsultationReport = ({ consultation }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <DoctorLayout>
            <Head title="Consultation Report" />

            <div className="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    href={route('doctor.consultations')}
                    className="inline-flex items-center text-[#f49e2a] hover:text-[#e38d19] mb-6"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Consultations
                </Link>

                {/* Report Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src={consultation.patient_photo || "/default-avatar.png"}
                                alt={consultation.patient_name}
                                className="h-16 w-16 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {consultation.patient_name}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Consultation Date: {formatDate(consultation.created_at)}
                                </p>
                            </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Completed
                        </span>
                    </div>
                </div>

                {/* Report Content */}
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    {/* Patient Information */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-sm font-medium text-gray-900">{consultation.patient_email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="text-sm font-medium text-gray-900">{consultation.patient_phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Consultation Details */}
                    <div className="border-t pt-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Consultation Details</h2>
                        
                        {/* Problems/Symptoms */}
                        {consultation.problems && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">Problems/Symptoms</p>
                                <p className="mt-1 text-sm font-medium text-gray-900">{consultation.problems}</p>
                            </div>
                        )}

                        {/* Diagnosis */}
                        {consultation.diagnosis && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">Diagnosis</p>
                                <p className="mt-1 text-sm font-medium text-gray-900">{consultation.diagnosis}</p>
                            </div>
                        )}

                        {/* Prescription */}
                        {consultation.prescription && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">Prescription</p>
                                <div className="mt-1 text-sm font-medium text-gray-900 whitespace-pre-line">
                                    {consultation.prescription}
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        {consultation.notes && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">Additional Notes</p>
                                <p className="mt-1 text-sm font-medium text-gray-900">{consultation.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Follow-up Instructions */}
                    {consultation.follow_up && (
                        <div className="border-t pt-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Follow-up Instructions</h2>
                            <p className="text-sm font-medium text-gray-900">{consultation.follow_up}</p>
                        </div>
                    )}
                </div>
            </div>
        </DoctorLayout>
    );
};

export default ConsultationReport; 