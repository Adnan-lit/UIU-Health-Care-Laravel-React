import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import {Link} from "@inertiajs/react";

export default function ConsultationSuccess() {
    return (
        <PatientLayout title={"Consultation Success"}>
            <div className={'flex flex-col h-[80vh] justify-center items-center'}>
                <h1 className="text-2xl font-bold text-center text-orange-500 ">Consultation Successful</h1>
                <p className="text-center">You have successfully booked your consultation</p>
                {/*book new consultations*/}
                <div className="mt-5">
                    <Link href="/patient/consultation" className="bg-orange-500 text-white px-4 py-2 rounded-md">Book New Consultation</Link>
                </div>
            </div>
        </PatientLayout>
    )
}
