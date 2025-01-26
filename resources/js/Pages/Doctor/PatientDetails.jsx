import React, { useState } from 'react';
import DoctorLayout from './Layout/DoctorLayout';
import { Head, Link } from '@inertiajs/react';
import { Tab } from '@headlessui/react';

const PatientDetails = ({ patient, healthRecords, medicalHistory, testRecords, appointments }) => {
    const [activeTab, setActiveTab] = useState(0);

    // Parse health record details
    const parseHealthRecord = (record) => {
        try {
            return JSON.parse(record.record_details);
        } catch (e) {
            console.error('Error parsing health record:', e);
            return {};
        }
    };

    const details = parseHealthRecord(healthRecords);


    return (
        <DoctorLayout>
            <Head title={`Patient - ${patient.name}`} />

            <div className="mx-auto w-full py-2 px-4 sm:px-6 lg:px-8">
                {/* Patient Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center space-x-6">
                        <img
                            src={patient.profile_photo_path || "/default-avatar.png"}
                            alt={patient.name}
                            className="h-24 w-24 rounded-full"
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                            <div className="mt-1 grid grid-cols-2 gap-x-6 text-sm text-gray-500">
                                <p>Email: {patient.email}</p>
                                <p>Phone: {patient.phone}</p>
                                <p>Age: {patient.age} years</p>
                                <p>Gender: {patient.gender}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-[#ff914d]/20 p-1">
                        {['Health Records', 'Medical History', 'Test Records', 'Past Appointments'].map((category, idx) => (
                            <Tab
                                key={category}
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                                    ${selected 
                                        ? 'bg-white text-[#ff914d] shadow'
                                        : 'text-gray-700 hover:bg-white/[0.12] hover:text-[#ff914d]'
                                    }`
                                }
                            >
                                {category}
                            </Tab>
                        ))}
                    </Tab.List>

                    <Tab.Panels className="mt-2">
                        {/* Health Records Panel */}
                        <Tab.Panel className="bg-white rounded-xl p-6 h-[40vh]">
                            <div className="space-y-6 h-full">
                            
                            {healthRecords && (
                                        <div key={healthRecords.id} className="border-b pb-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    Health Record
                                                </h3>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(healthRecords.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-500">Weight</p>
                                                    <p className="text-lg font-medium text-gray-900">{details.weight} kg</p>
                                                </div>
                                                
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-500">Height</p>
                                                    <p className="text-lg font-medium text-gray-900">{details.height} cm</p>
                                                </div>
                                                
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-500">Heart Rate</p>
                                                    <p className="text-lg font-medium text-gray-900">{details.heartRate} bpm</p>
                                                </div>
                                                
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-500">Blood Pressure</p>
                                                    <p className="text-lg font-medium text-gray-900">
                                                        {details.systolic}/{details.diastolic} mmHg
                                                    </p>
                                                </div>
                                                
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-500">Chest</p>
                                                    <p className="text-lg font-medium text-gray-900">{details.chest} inches</p>
                                                </div>
                                                
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-500">Waist</p>
                                                    <p className="text-lg font-medium text-gray-900">{details.waist} inches</p>
                                                </div>
                                                
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-500">Hip</p>
                                                    <p className="text-lg font-medium text-gray-900">{details.hip} inches</p>
                                                </div>

                                                {/* BMI Calculation */}
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <p className="text-sm text-gray-500">BMI</p>
                                                    <p className="text-lg font-medium text-gray-900">
                                                        {(details.weight / Math.pow(details.height/100, 2)).toFixed(1)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        )}
                                
                            

                                {!healthRecords && (
                                    <div className="text-center text-gray-500 py-8">
                                        No health records available
                                    </div>
                                )}
                            </div>
                        </Tab.Panel>

                        {/* Medical History Panel */}
                        <Tab.Panel className="bg-white rounded-xl p-6 h-[40vh]">
                            <div className="space-y-4">
                                {medicalHistory.map((history) => (
                                    <div key={history.id} className="border-b pb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {history.condition}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {history.notes}
                                                </p>
                                                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>Diagnosed: {new Date(history.diagnosed_date).toLocaleDateString()}</span>
                                                    <span>Status: {history.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab.Panel>

                        {/* Test Records Panel */}
                        <Tab.Panel className="bg-white rounded-xl p-6 h-[40vh]">
                            <div className="space-y-4">
                                {testRecords.map((test) => (
                                    <div key={test.id} className="border-b pb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">
                                                    {test.test_name}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {test.results}
                                                </p>
                                                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>Date: {new Date(test.date).toLocaleDateString()}</span>
                                                    <span>Status: {test.status}</span>
                                                </div>
                                            </div>
                                            {test.file_path && (
                                                <a 
                                                    href={test.file_path}
                                                    className="text-[#ff914d] hover:text-[#ff7920] text-sm"
                                                    target="_blank"
                                                >
                                                    View Report
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab.Panel>

                        {/* Past Appointments Panel */}
                        <Tab.Panel className="bg-white rounded-xl p-6 overflow-y-scroll h-[40vh]">
                            <div className="space-y-6 ">
                                {appointments.map((appointment) => (
                                    <div key={appointment.id} className="border-b pb-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-start space-x-4">
                                                {/* Doctor Info */}
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={appointment.doctor_photo || "/default-avatar.png"}
                                                        alt={appointment.doctor_name}
                                                        className="h-12 w-12 rounded-full"
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        Dr. {appointment.doctor_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {appointment.specialty}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Appointment Status */}
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                appointment.status === 'completed' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : appointment.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {appointment.status}
                                            </span>
                                        </div>

                                        {/* Appointment Details */}
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Date & Time</p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                                                </p>
                                            </div>

                                            {appointment.problems && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Problems/Symptoms</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {appointment.problems}
                                                    </p>
                                                </div>
                                            )}

                                            {appointment.notes && (
                                                <div>
                                                    <p className="text-sm text-gray-500">Doctor's Notes</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {appointment.notes}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        {appointment.status === 'confirmed' && (
                                            <div className="mt-4 flex justify-end">
                                                <Link
                                                    href={`/doctor/appointment/${appointment.id}`}
                                                    className="text-sm text-[#ff914d] hover:text-[#ff7920]"
                                                >
                                                    View Full Report →
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {appointments.length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        No past appointments found
                                    </div>
                                )}
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </DoctorLayout>
    );
};

export default PatientDetails; 