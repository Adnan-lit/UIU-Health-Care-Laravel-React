import DoctorLayout from "@/Pages/Doctor/Layout/DoctorLayout.jsx";
import AppointmentCalendar from "./Components/AppointmentCalender";
import PatientManagement from "./Components/PatientManagement";
import { Cards } from "./Components/Cards";

export default function Dashboard() {

    const cardData = [
        {
            name: "Tasks Completed",
            icon: "fas fa-calendar-check",
            color: "#FFEDD5", // Light orange background
            iconColor: "#F97316", // Orange icon
            value: "42",
            percentage: "15",
        },
        {
            name: "Call Consultancy",
            icon: "fas fa-phone-alt",
            color: "#FEE2E2", // Light pink background
            iconColor: "#EF4444", // Pink icon
            value: "1,002",
            percentage: "20",
        },
    ];


    const dates = [
        null, null, null, null, null, null, null, // Empty slots for the first week
        { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 },
        { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 },
        { day: 15 }, { day: 16, isToday: true }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 },
        { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 },
        { day: 29 }, { day: 30 }, { day: 31 }
    ];
    
    const appointments = [
        {
            patientName: "Patient 5",
            appointmentType: "Video Consultancy",
            image: "https://placehold.co/40x40",
            icon: "fas fa-video"
        },
        {
            patientName: "Patient 6",
            appointmentType: "Clinic Appointment",
            image: "https://placehold.co/40x40",
            icon: "fas fa-hospital"
        },
        {
            patientName: "Patient 7",
            appointmentType: "Back Surgery",
            image: "https://placehold.co/40x40",
            icon: "fas fa-user-md"
        },
        {
            patientName: "Patient 8",
            appointmentType: "Hospital Appointment",
            image: "https://placehold.co/40x40",
            icon: "fas fa-ambulance"
        }
    ];



    const patientsData = [
        {
            id: 1,
            name: "Patient 1",
            age: 40,
            image: "https://placehold.co/100x100",
            health: {
                heartRate: "120 bpm",
                bloodPressure: "130/90 mm Hg",
                pulse: "81 beats/min",
                oxygen: "93%",
                bmi: 24,
                bloodGroup: "B+",
                specialDiseases: "Not Specified",
            },
        },
        {
            id: 2,
            name: "Patient 2",
            age: 35,
            image: "https://placehold.co/100x100",
            health: {
                heartRate: "110 bpm",
                bloodPressure: "120/80 mm Hg",
                pulse: "75 beats/min",
                oxygen: "96%",
                bmi: 22,
                bloodGroup: "A+",
                specialDiseases: "Diabetes",
            },
        },
        {
            id: 3,
            name: "Patient 3",
            age: 45,
            image: "https://placehold.co/100x100",
            health: {
                heartRate: "130 bpm",
                bloodPressure: "140/90 mm Hg",
                pulse: "85 beats/min",
                oxygen: "92%",
                bmi: 26,
                bloodGroup: "O+",
                specialDiseases: "Not Specified",
            },
        },
        
    ];


    return (
        <DoctorLayout title="Doctor Dashboard">
            <div class="flex justify-between">
                <div class="w-full">
                    {/* Cards Section */}
                    <Cards cards={cardData}/>


                    {/* Patient Records Section  */}
                    <section >
                        <h3 class="text-lg font-medium mb-4">
                            Patient's Records
                        </h3>

                        <PatientManagement patients={patientsData} />
                    </section>
                </div>

                <div class="right-0">
                    {/* Calendar Section */}
                    <AppointmentCalendar year={2024} month="January" dates={dates} appointments={appointments} />
                </div>
            </div>
        </DoctorLayout>
    );
}
