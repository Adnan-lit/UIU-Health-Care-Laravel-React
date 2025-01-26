import React, { useState } from "react";
import Pagination from "./Components/Pagination";
import SearchFilter from "./Components/SearchFilter";
import {Link} from "@inertiajs/react";

const PatientsPage = ({ patients }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all"); // all, consultation, appointment

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.patient_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || patient.type.toLowerCase() === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <main className="p-8">
            <h2 className="text-2xl font-semibold text-[#ff914d] mb-6">
                All Patients
            </h2>

            <div className="mb-6 flex gap-4">
                <input
                    type="text"
                    placeholder="Search patients..."
                    className="px-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="px-4 py-2 border rounded-lg"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">All Types</option>
                    <option value="consultation">Consultations</option>
                    <option value="appointment">Appointments</option>
                </select>
            </div>

            <div className="bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Patient
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPatients.map((patient) => (
                            <tr key={`${patient.type}-${patient.id}`}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full"
                                                src={patient.profile_photo_path || "/default-avatar.png"}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {patient.patient_name}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        patient.type === 'Consultation'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {patient.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(patient.time).toLocaleTimeString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        patient.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : patient.status === 'completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {patient.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link
                                        href={`/doctor/patient/${patient.patient_id}`}
                                        className="text-[#ff914d] hover:text-[#ff7920]"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default PatientsPage;
