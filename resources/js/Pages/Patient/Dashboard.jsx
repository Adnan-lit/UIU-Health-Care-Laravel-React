import DashboardLayout from "@/Layouts/DashboardLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import MedicineAndAppointment from "@/Pages/Patient/Components/MedicineAndAppointment.jsx";
import HealthMetrics from "@/Pages/Patient/Components/HealthMetrics.jsx";
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";

export default function Dashboard({healthRecords,nextAppointment}) {

    console.log(healthRecords);
    return (

        <PatientLayout title={'Patient Dashboard'}>
            <Head title="Dashboard"/>
            <div className="flex h-full w-full ">
                <div className={'flex flex-col h-full w-[60%] '}>
                    <div className={'grid gap-2 h-[40%] grid-cols-2 '}>
                        <div className={'rounded-2xl bg-[#151515]'}>
                            <Link href="/patient/emergency"
                               className="flex flex-col items-center justify-center  text-white">
                                <img className="h-12 w-12 mt-2" src="../images/patient/emergency-services.png" alt="Emergency Service"
                                     />
                                <span className="text-xl">Emergency Service</span>
                            </Link>
                        </div>


                        <div className={'rounded-2xl bg-[#151515]'}>
                            <a href="/patient/medicines#order_medicine"
                               className="flex flex-col items-center justify-center  text-white">
                               <img className="h-12 w-12 mt-2" src="../images/patient/medicine.png" alt="Buy Medicines" />
                               <span class="text-xl">Buy Medicines</span>
                            </a>
                        </div>
                        <div className={'rounded-2xl bg-[#151515]'}>
                            <a href="Emergency.html"
                               className="flex flex-col items-center justify-center  text-white">
                                <img className="h-12 w-12 mt-2" src="../images/patient/blood.png" alt="Request Blood"/>
                                <span className="text-xl">Request for Blood</span>
                            </a>
                        </div>
                        <div className={'rounded-2xl bg-[#151515]'}>
                            <Link href="/patient/addHealthRecord"
                               className="flex flex-col items-center justify-center  text-white">
                                <img className="h-12 w-12 mt-2" src="../images/patient/health.png" alt="Update Health Metrics"/>
                                <span class="text-xl">Update Health Metrics</span>
                            </Link>
                        </div>
                    </div>
                    <div className={'flex h-[60%] w-full '}>
                        <MedicineAndAppointment nextAppointment={nextAppointment} />
                    </div>
                </div>
                <div className={'flex h-full w-[40%] pl-5'}>
                    <HealthMetrics date={healthRecords?healthRecords.date:new Date()} health_details={healthRecords?JSON.parse(healthRecords.record_details):{
                        weight: 0,
                        height: 0,
                        heartRate: 0,
                        systolic: 0,
                        diastolic: 0
                    }} />
                </div>
            </div>

        </PatientLayout>
    )
}
