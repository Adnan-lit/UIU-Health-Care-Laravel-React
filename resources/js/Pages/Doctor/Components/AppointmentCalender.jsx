export default function AppointmentCalendar({ year, month, dates, appointments }) {
    return (
        <div className="w-full rounded-lg bg-[#161616] text-white p-6">
            {/* Calendar Section */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Calendar</h2>
                    <div className="text-gray-400">{year}</div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-gray-400">
                    {/* Days of the Week */}
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                        <p key={day}>{day}</p>
                    ))}
                    {/* Calendar Dates */}
                    {dates.map((date, index) =>
                        date ? (
                            <p
                                key={index}
                                className={`${
                                    date.isToday
                                        ? "bg-[#FF8C47] text-white rounded-full py-1"
                                        : "text-gray-400"
                                }`}
                            >
                                {date.day}
                            </p>
                        ) : (
                            <span key={index}></span>
                        )
                    )}
                </div>
            </div>

            {/* Appointments Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium">Today's Appointments</h2>
                    <a href="#" className="text-[#FF8C47] text-sm">
                        View All
                    </a>
                </div>
                <div className="space-y-4">
                    {appointments.map((appointment, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-[#262626] p-4 rounded-lg"
                        >
                            <img
                                src={appointment.image}
                                alt={appointment.patientName}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-3">
                                <p className="text-white font-medium">
                                    {appointment.patientName}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {appointment.appointmentType}
                                </p>
                            </div>
                            <i
                                className={`${appointment.icon} ml-auto text-[#FF8C47]`}
                            ></i>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
