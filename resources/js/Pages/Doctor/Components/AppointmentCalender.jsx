import { Link } from "@inertiajs/react";

export default function AppointmentCalendar({  appointments }) {
    return (
        <div className="w-full h-full rounded-lg bg-[#161616] text-white p-6">
    

            {/* Appointments Section */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Today's Appointments</h2>
                    <Link 
                        href="/doctor/appointments"
                        className="text-[#FF8C47] text-sm">
                        View All
                    </Link>
                </div>
                <div className="space-y-4 h-full">
                    {appointments.slice(0, 5).map((appointment, index) => (
                        <a href={`/doctor/patient/${appointment.user.id}`} className="block">
                        <div
                            key={index}
                            className="flex items-center bg-[#262626] p-4 rounded-lg"
                        >
                            <img
                                src={appointment.user.profile_photo_path || "/images/user.jpg"}
                                alt={appointment.user.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-3">
                                <p className="text-white font-medium">
                                    {appointment.user.name}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Clinic Appointment
                                </p>
                            </div>
                            <i
                                className={`fas fa-hospital ml-auto text-[#FF8C47]`}
                            ></i>
                        </div>
                        </a>
                    ))}
                    {appointments.length === 0 && (
                        <div className="flex justify-center items-center h-full">
                            <h3 className="text-lg font-medium">No appointments found</h3>
                        </div>
                    )}
                </div>
            </div>
    );
}
