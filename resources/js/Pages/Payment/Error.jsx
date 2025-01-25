import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import {Link} from "@inertiajs/react";

export default function Error({message}) {
    return (
        <PatientLayout title={"Payment Error"}>
            <div className={'flex flex-col h-[80vh] justify-center items-center'}>
                <h1 className="text-2xl font-bold text-center text-orange-500 ">Payment Error</h1>
                <p className="text-center">{message}</p>
                {/*book new appointments*/}
                <div className="mt-5">
                    <Link href="/patient/appointments" className="bg-orange-500 text-white px-4 py-2 rounded-md">Book New Appointment</Link>
                </div>
            </div>
        </PatientLayout>
    )
}
