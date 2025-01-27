import { Head } from "@inertiajs/react";
import DoctorLayout from "./Layout/DoctorLayout";
import DoctorAppointments from "./Components/DoctorApppointments";

export default function Appointments({ appointments }) {

    console.log(appointments);

    return (
        <DoctorLayout title="Appointments">
            <Head title="Appointments" />

            <div className={'h-[80vh] overflow-y-scroll'}>
                <DoctorAppointments initialAppointments={appointments} />
            </div>
        </DoctorLayout>
    );
}
