import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import HealthRecordsComponent from "@/Pages/Patient/Components/HealthRecordsComponent.jsx";

export default function HealthRecords({ msg,healthRecords }) {
    // Show toast notification when the component renders if `msg` is provided
    if (msg) {
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <PatientLayout title={"Health Records"}>
            <ToastContainer />
            <HealthRecordsComponent healthRecords={healthRecords} />
        </PatientLayout>
    );
}
