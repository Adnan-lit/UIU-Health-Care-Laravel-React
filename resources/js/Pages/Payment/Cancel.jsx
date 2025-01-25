import {Link} from "@inertiajs/react";
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";

export default function Cancel() {
    return (
        <PatientLayout title={"Payment Cancelled"}>
            <div className={'flex flex-col h-[80vh] justify-center items-center'}>
                <h1 className="text-2xl font-bold text-center text-orange-500 ">Payment Cancelled</h1>
                <p className="text-center">Your payment has been cancelled. Please try again.</p>
                {/*book new appointments*/}
                <div className="mt-5">
                    <Link href="/patient/appointments" className="bg-orange-500 text-white px-4 py-2 rounded-md">Book New Appointment</Link>
                </div>
            </div>
        </PatientLayout>
    )
}
