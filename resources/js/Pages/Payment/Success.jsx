import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import {Link} from "@inertiajs/react";

export default function Success({appointment}) {
    function convertToAmPm(time24) {
        const [hours, minutes] = time24.split(':');
        const hoursInt = parseInt(hours, 10);
        const suffix = hoursInt >= 12 ? 'PM' : 'AM';
        const hours12 = hoursInt % 12 || 12;
        return `${hours12}:${minutes} ${suffix}`;
    }

    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <PatientLayout title={"Payment Success"}>
            <div className={'flex flex-col h-[80vh] justify-center items-center'}>
                <h1 className="text-2xl font-bold text-center text-orange-500 ">Payment Successful</h1>
                <p className="text-center">You have successfully booked your appointment with {appointment.name} on {`${new Date(appointment.date).getDate()}, ${
                        monthsOfYear[new Date(appointment.date).getMonth()]
                    } ${new Date(appointment.date).getFullYear()}`} at {convertToAmPm(appointment.time)}</p>
                {/*book new appointments*/}
                <div className="mt-5">
                    <Link href="/patient/appointments" className="bg-orange-500 text-white px-4 py-2 rounded-md">Book New Appointment</Link>
                </div>
            </div>
        </PatientLayout>
    )
}
