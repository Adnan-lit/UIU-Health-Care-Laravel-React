import { Head } from "@inertiajs/react";
import DoctorLayout from "./Layout/DoctorLayout";
import PatientsPage from "./PatientsPage";

export default function Patient() {

    
    return (
        <DoctorLayout title="Patients">
            <Head title="Patients" />

            <PatientsPage />
        </DoctorLayout>
    );
}
