import { Head } from "@inertiajs/react";
import DoctorLayout from "./Layout/DoctorLayout";
import PatientsPage from "./PatientsPage";

export default function Patient({ patients }) {

    console.log(patients);

    return (
        <DoctorLayout title="Patients">
            <Head title="Patients" />

            <div className={'h-[80vh] overflow-y-scroll'}>
                <PatientsPage patients={patients} />
            </div>
        </DoctorLayout>
    );
}
