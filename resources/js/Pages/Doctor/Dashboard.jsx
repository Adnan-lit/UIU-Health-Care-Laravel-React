import DoctorLayout from "@/Pages/Doctor/Layout/DoctorLayout.jsx";
import AppointmentCalendar from "./Components/AppointmentCalender";
import PatientManagement from "./Components/PatientManagement";
import { Cards } from "./Components/Cards";

export default function Dashboard({ appointments, cardData }) {
    return (
        <DoctorLayout title="Doctor Dashboard">
            <div className="flex justify-between w-[75vw] h-[75vh] gap-6">
                <div className="w-[65vw] h-[75vh] overflow-y-scroll">
                    {/* Cards Section */}
                    <Cards cards={cardData}/>

                    {/* Patient Records Section */}
                    {appointments.length > 0 && (
                    <section>
                        <h3 className="text-lg font-medium mb-4">
                            Patient's Records
                        </h3>
                        <PatientManagement patients={appointments.map(a => a.user)} />
                    </section>
                    )}
                    {appointments.length === 0 && (
                     <section>

                        <div className="flex justify-center items-center h-full">
                            <h3 className="text-lg font-medium">No appointments found</h3>
                        </div>
                    </section>
                    )}
                </div>

                <div className="w-[25vw] h-[80vh]">
                    {/* Calendar Section */}
                    <AppointmentCalendar appointments={appointments} />
                </div>
            </div>
        </DoctorLayout>
    );
}
