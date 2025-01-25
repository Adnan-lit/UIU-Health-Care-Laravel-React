import React, { useState, useMemo } from "react";
import {Link, useForm} from "@inertiajs/react";
import {usePage} from "@inertiajs/react";

const Calendar = ({doctors, initialAppointments, previousAppointments}) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDay = new Date();

    const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());
    const [selectedDate, setSelectedDate] = useState(currentDay);
    const [showEventPopup, setShowEventPopup] = useState(false);

    const [paymentAppID, setPaymentAppID] = useState(0);
    console.log(usePage().props);


    // Initialize appointments with passed-in appointments
    const [appointments, setAppointments] = useState(
        initialAppointments.map(appt => ({
            ...appt,
            date: new Date(appt.date)
        }))
    );

    const [pastAppointments, sePastAppointments] = useState(
        previousAppointments.map(appt => ({
            ...appt,
            date: new Date(appt.date)
        }))
    );


    // Doctor search state
    const [doctorSearch, setDoctorSearch] = useState('');
    const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);

    // Use Inertia's useForm hook for form handling
    const { data, setData, post, processing, errors, reset } = useForm({
        date: null,
        time: '',
        doc_id: '',
        problems: ''
    });

    // Filtered doctors based on search
    const filteredDoctors = useMemo(() => {
        if (!doctorSearch) return doctors;
        return doctors.filter(doctor =>
            doctor.name.toLowerCase().includes(doctorSearch.toLowerCase())
        );
    }, [doctorSearch, doctors]);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    }

    const colorAppointments = (date) => {
        const appointment = appointments.find((appointment) => isSameDay(appointment.date, date));
        return appointment ? "bg-[#f97316]" : "";
    }

    const hasAppointmentConflict = (newDate, newTime) => {

        newDate = newDate.toISOString().split('T')[0];
        newTime = newTime.split(':').slice(0, 2).join(':');

        const newAppointmentDate = new Date(new Date(`${newDate} ${newTime}`).getTime() + 24 * 60 * 60 * 1000);

        return appointments.some(appointment => {
            const existingAppointmentDate = new Date(`${appointment.date.toISOString().split('T')[0]} ${appointment.time.split(':').slice(0, 2).join(':')}`);
            const diffInMinutes = Math.abs((newAppointmentDate - existingAppointmentDate) / (1000 * 60));
            return diffInMinutes < 15; // Conflict if the difference is less than 15 minutes
        });
    };


    const handleDayClick = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();

        if(clickedDate >= today || isSameDay(clickedDate, today)) {
            setSelectedDate(clickedDate);
            setShowEventPopup(true);

            // Reset form data
            setData({
                date: clickedDate,
                time: '',
                doc_id: '',
                problems: ''
            });

            // Reset doctor search
            setDoctorSearch('');
            setShowDoctorDropdown(false);
        }
    }

    const handleDoctorSelect = (doctor) => {
        setData(prevData => ({
            ...prevData,
            doc_id: doctor.doc_id
        }));
        setDoctorSearch(doctor.name);
        setShowDoctorDropdown(false);
    }

    const handleAppointmentSubmit = (e) => {
        e.preventDefault();


        // Submit form using Inertia
        post('/patient/appointments/create', {
            preserveScroll: true,
            onSuccess: () => {
                // Add the new appointment to local state
                const selectedDoctor = doctors.find(d => d.id === data.doc_id);
                const date = new Date(data.date);
                const newAppointment = {
                    date: data.date,
                    time: data.time,
                    doctor: selectedDoctor,
                    problems: data.problems,
                    status: 'pending'
                };
                setAppointments([...appointments, newAppointment]);

                // Close popup and reset form
                setShowEventPopup(false);
                reset();
            }
        });

    }

    const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

    function convertToAmPm(time24) {
        const [hours, minutes] = time24.split(':');
        const hoursInt = parseInt(hours, 10);
        const suffix = hoursInt >= 12 ? 'PM' : 'AM';
        const hours12 = hoursInt % 12 || 12;
        return `${hours12}:${minutes} ${suffix}`;
    }

    return (
        <div className="p-10 overflow-y-auto h-[80vh]">
            <h1 className="text-4xl font-bold mb-5">MY APPOINTMENTS</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Calendar Grid */}
                <div>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-bold">
                            {monthsOfYear[currentMonth]} {currentYear}
                        </h2>
                        <div className="flex gap-3">
                            <button
                                onClick={prevMonth}
                                className="h-10 w-10 bg-gray-200 p-2 rounded-2xl flex items-center justify-center"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button
                                onClick={nextMonth}
                                className="h-10 w-10 bg-gray-200 p-2 rounded-2xl flex items-center justify-center"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-3 text-center">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="font-medium text-gray-400">
                                {day}
                            </div>
                        ))}
                        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                            <button key={`empty-${index}`} className="text-gray-400 p-2 rounded-lg"></button>
                        ))}
                        {[...Array(daysInMonth).keys()].map((day) => (
                            <button
                                key={`day-${day+1}`}
                                onClick={() => handleDayClick(day + 1)}
                                className={`${
                                    day + 1 === currentDay.getDate() &&
                                    currentMonth === currentDay.getMonth() &&
                                    currentYear === currentDay.getFullYear()
                                        ? "bg-gray-600 text-white"
                                        : "text-gray-800"
                                } p-2 rounded-lg ${colorAppointments(new Date(currentYear, currentMonth, day + 1))}`}
                            >
                                {day + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Event Popup */}
                {showEventPopup && (
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-2xl font-bold">
                                {selectedDate.toDateString()}
                            </h2>
                            <button
                                onClick={() => setShowEventPopup(false)}
                                className="text-[#f5852a] text-lg bg-white hover:text-gray-400"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleAppointmentSubmit} className="flex flex-col items-start gap-6">
                            <div className="flex gap-3 items-center">
                                <p className="text-gray-800 font-bold">Time:</p>
                                <input
                                    required
                                    type="time"
                                    value={data.time}
                                    onChange={(e) => setData('time', e.target.value)}
                                    onChangeCapture={() => {

                                        const conflict = hasAppointmentConflict(selectedDate, data.time)
                                        console.log(conflict);
                                        //shift 15 minutes
                                        const newTime = new Date(`${selectedDate.toISOString().split('T')[0]} ${data.time.split(':').slice(0, 2).join(':')}`);
                                        newTime.setMinutes(newTime.getMinutes() + 15);
                                        if (conflict) {
                                            alert('Appointment time conflicts with another appointment. Please select another time');
                                            console.log(`${newTime.getHours()}:${newTime.getMinutes()}`);
                                            setData('time', `${newTime.getHours()}:${newTime.getMinutes()}`);
                                        }

                                    }
                                }
                                    className="border border-gray-300 p-2 rounded-lg"
                                />
                                {errors.time && <div className="text-red-500">{errors.time}</div>}
                            </div>

                            <div className="flex gap-3 items-center w-full relative">
                                <p className="text-gray-800 font-bold">Doctor:</p>
                                <div className="w-full relative">
                                    <input
                                        required
                                        type="text"
                                        value={doctorSearch}
                                        onChange={(e) => {
                                            setDoctorSearch(e.target.value);
                                            setShowDoctorDropdown(true);
                                        }}
                                        onFocus={() => setShowDoctorDropdown(true)}
                                        placeholder="Search doctors"
                                        className="border w-full border-gray-300 p-2 rounded-lg"
                                    />
                                    {showDoctorDropdown && (
                                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                                            {filteredDoctors.map((doctor) => (
                                                <div
                                                    key={doctor.doc_id}
                                                    onClick={() => handleDoctorSelect(doctor)}
                                                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                                                >
                                                    <img
                                                        src={doctor.image || "https:placeholder.com/40/40"}
                                                        alt={doctor.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <div className="font-medium">{doctor.name}</div>
                                                        <div className="text-sm text-gray-500">{doctor.specialty}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {errors.doctor_id && <div className="text-red-500">{errors.doctor_id}</div>}
                            </div>

                            <div className="flex gap-3 w-full">
                                <p className="text-gray-800 font-bold">Problems:</p>
                                <textarea
                                    placeholder="Describe your problems"
                                    value={data.problems}
                                    onChange={(e) => setData('problems', e.target.value)}
                                    className="border w-full border-gray-300 p-2 rounded-lg resize-vertical min-h-[100px]"
                                />
                                {errors.problems && <div className="text-red-500">{errors.problems}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-[#f97316] text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-[#ea580c] transition-colors w-full"
                            >
                                {processing ? 'Submitting...' : 'Book Appointment'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Appointments List */}
                <div className={'h-[55vh] overflow-y-auto'}>
                    <h3 className="text-2xl font-bold mb-4">Upcoming Appointments</h3>
                    {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                            <div
                                key={`appointment-${index}`}
                                className={`flex items-center justify-between p-4 rounded-lg mb-4 ${
                                    isSameDay(currentDay, appointment.date)
                                        ? "bg-[#f97316]"
                                        : "bg-orange-300"
                                }`}
                            >
                                <div>
                                    <h3 className="text-lg font-bold">
                                        {`${appointment.date.getDate()}, ${
                                            monthsOfYear[appointment.date.getMonth()]
                                        } ${appointment.date.getFullYear()}`}
                                    </h3>
                                    <h6 className="text-sm">{convertToAmPm(appointment.time)}</h6>
                                    <div className="flex items-center gap-2 mt-1 ml-auto">

                                        <p className="text-lg font-bold text-gray-800">{appointment.name || 'N/A'}</p>
                                        {appointment.specialty && (
                                            <span className="text-xs text-gray-600">
                                                ({appointment.specialty})
                                            </span>
                                        )}
                                    </div>
                                    {appointment.problem && (
                                        <p className="text-xs text-gray-600 mt-1">
                                            Problems: {appointment.problem}
                                        </p>
                                    )}
                                </div>
                                <div className={'flex justify-center items-center gap-5'}>

                                    {appointment.status === 'pending' &&
                                    <form className={'flex flex-col w-40 justify-center text-center  items-center gap-2'}>


                                        <a key={appointment.app_id}
                                        href={`/patient/bkash/create-payment?id=${appointment.app_id}&amount=1&purpose=Appointment&callback=${window.location.origin}/patient/bkash/callback&paymentOrigin=${window.location.href}`}
                                                className="text-sm text-gray-800 hover:text-white transition-colors">
                                            <img className={'h-10 ml-auto'} src="/images/patient/bkash.png"
                                                 alt="Bkash"/>
                                        </a>
                                        <p className={'text-sm text-gray-800'}>Please Pay 50BDT to Confirm your
                                            appointment.</p>

                                    </form>
                                    }
                                    <button className="text-sm text-gray-800 hover:text-white transition-colors">
                                        <i className={'text-lg fas fa-edit ml-2'}/>
                                    </button>
                                </div>
                                </div>
                                ))
                                ) : (
                                <p className="text-gray-500">No Upcoming appointments</p>
                                )}
                                <h3 className="text-2xl font-bold mb-4">Past Appointments</h3>
                    {pastAppointments.length > 0 ? (
                        pastAppointments.map((appointment, index) => (
                            <div
                                key={`appointment-${index}`}
                                className={`flex items-center justify-between p-4 rounded-lg mb-4 ${
                                    isSameDay(currentDay, appointment.date)
                                        ? "bg-[#f97316]"
                                        : "bg-orange-300"
                                }`}
                            >
                                <div>
                                    <h3 className="text-lg font-bold">
                                        {`${appointment.date.getDate()}, ${
                                            monthsOfYear[appointment.date.getMonth()]
                                        } ${appointment.date.getFullYear()}`}
                                    </h3>
                                    <h6 className="text-sm">{convertToAmPm(appointment.time)}</h6>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-lg font-bold text-gray-800">{appointment.name || 'N/A'}</p>
                                        {appointment.specialty && (
                                            <span className="text-xs text-gray-600">
                                                ({appointment.specialty})
                                            </span>
                                        )}
                                    </div>
                                    {appointment.problem && (
                                        <p className="text-xs text-gray-600 mt-1">
                                            Problems: {appointment.problem}
                                        </p>
                                    )}
                                </div>
                                <button className="text-sm text-gray-800 hover:text-white transition-colors">
                                    Edit
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No Past appointments</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
