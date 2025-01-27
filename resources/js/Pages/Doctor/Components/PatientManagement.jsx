import { useState } from "react";
import PatientCarousel from "./PatientCarousel";
import PatientDetails from "./PatientDetails";
import PatientTabs from "./PatientTabs";

export default function PatientManagement({ patients }) {
    console.log("@patients", patients);
    // State for selected patient
    const [selectedPatient, setSelectedPatient] = useState(patients[0]);

    return (
        <div className="w-full p-6 flex flex-col justify-center">
            {/* Pass data and selection handler to PatientCarousel */}
            <PatientCarousel
                patients={patients}
                onSelectPatient={setSelectedPatient}
                selectedPatient={selectedPatient}
            />
            
            {/* Pass selected patient details */}
            {selectedPatient && (
                <PatientDetails patient={selectedPatient} />
            )}

            {/* Pass selected patient details */}
            {selectedPatient && (
            <PatientTabs health={selectedPatient.health} />

            )}
            {/* Pass selected patient health data */}
        </div>
    )
}
