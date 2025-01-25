import React from "react";
import { usePage } from "@inertiajs/react";

const PatientDetailPage = () => {
    const { patient } = usePage().props; // Access patient data passed from the Laravel controller

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 border border-gray-200 rounded-lg shadow">
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <p>Age: {patient.age}</p>
            <p>Type: {patient.type}</p>
            {/* Add more details as needed */}
        </div>
    );
};

export default PatientDetailPage;
