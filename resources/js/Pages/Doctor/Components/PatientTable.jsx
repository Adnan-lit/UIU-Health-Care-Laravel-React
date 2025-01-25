import React from "react";
import { Link } from "@inertiajs/react";

const PatientTable = () => {
    const patients = [
        { id: 1, name: "Rifat Hridoy", age: 25, type: "Student" },
        { id: 2, name: "Jiyasmim Sinthiya", age: 30, type: "Student" },
        { id: 3, name: "Mithila Arunima", age: 30, type: "Student" },
        { id: 4, name: "Koushik Roy", age: 20, type: "Faculty" },
    ];

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-sm font-medium text-gray-700">
                            Patient Name{" "}
                            <i className="fas fa-sort text-gray-400"></i>
                        </th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-700">
                            Age <i className="fas fa-sort text-gray-400"></i>
                        </th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-700">
                            Type <i className="fas fa-sort text-gray-400"></i>
                        </th>
                        <th className="px-6 py-4 text-sm font-medium text-gray-700">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-gray-700">{patient.name}</td>
                            <td className="px-6 py-4 text-gray-700">{patient.age}</td>
                            <td className="px-6 py-4 text-gray-700">{patient.type}</td>
                            <td className="px-6 py-4 text-[#ff914d] font-medium">
                                <Link
                                    href={route('doctor.patient.show', patient.id)}
                                    className="hover:underline"
                                >
                                    View Full Details <i className="fas fa-chevron-right"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientTable;
