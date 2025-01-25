import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import Video from "@/Pages/Patient/Components/VIdeo.jsx";
import { usePage } from "@inertiajs/react";
import DoctorLayout from "@/Pages/Doctor/Layout/DoctorLayout.jsx";

export default function VideoCall({ id, name }) {
    const { auth } = usePage().props;

    return (
        auth.user.role === 0 ? (
            <PatientLayout title="Video Call">
                <Video id={id} name={name} />
            </PatientLayout>
        ) : (
            <DoctorLayout title="Video Call">
                <Video id={id} name={name} />
            </DoctorLayout>
        )
    );
}
