import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import Calendar from "@/Pages/Patient/Components/Calender.jsx";
import {Head} from "@inertiajs/react";
import React from "react";

export default function Appointments({appointments,previousAppointments,doctors}) {
    return (
        <PatientLayout title={"Appointments"}>
            <Head title="Appointments"/>

            <Calendar doctors={doctors} initialAppointments={appointments} previousAppointments={previousAppointments}/>
        </PatientLayout>
    )
}
