import {Head, Link} from "@inertiajs/react";
import SideBar from "@/Pages/Admin/Components/SideBar.jsx";


import TopBar from "@/Pages/Admin/Components/TopBar.jsx";
import CustomerVsRetention from "@/Pages/Admin/Components/CustomerVsRetention.jsx";
import AdminLayout from "@/Pages/Admin/Layout/AdminLayout.jsx";
import DashboardLayout from "@/Layouts/DashboardLayout.jsx";

export default function Dashboard() {
    // Define menu items


    const data = [
        {
            name: 'Jan',
            sell: 4000,
            retention: 2400,
        },
        {
            name: 'Feb',
            sell: 3000,
            retention: 1398,
        },
        {
            name: 'Mar',
            sell: 2000,
            retention: 9800,
        },
        {
            name: 'Apr',
            sell: 2780,
            retention: 3908,
        },
        {
            name: 'May',
            sell: 1890,
            retention: 4800,
        },
        {
            name: 'Jun',
            sell: 2390,
            retention: 3800,
        },
        {
            name: 'Jul',
            sell: 3490,
            retention: 4300,

        },
        {
            name: 'Aug',
            sell: 3490,
            retention: 4300,

        },
        {
            name: 'Sep',
            sell: 3490,
            retention: 4300,

        },
        {
            name: 'Oct',
            sell: 3490,
            retention: 4300,

        },
        {
            name: 'Nov',
            sell: 3490,
            retention: 4300,

        },
        {
            name: 'Dec',
            sell: 3490,
            retention: 4300,

        },
    ];
    const menuItems = [
        { href: "/admin", icon: "fa-solid fa-house", label: "Dashboard" },
        { href: "/admin/doctors", icon: "fa-solid fa-user-doctor", label: "Doctors" },
        { href: "/admin/posts", icon: "fa-solid fa-calendar-check", label: "Appointments" },
        { href: "/admin/patients", icon: "fa-solid fa-square-phone", label: "Consultation" },

    ];

    const notifications = [
        { id: 1, message: "New user registered" },
        { id: 2, message: "New post published" },
    ];

    const user = {
        name: "Rifat",
        userType: "Pharmacist",
        avatar: "https://placehold.co/40x40",

    }

    return (
        <AdminLayout >
        <Head title="Admin Dashboard" />
            <div className={'flex h-[35%] gap-10'}>
                <div className={'w-[33.33%] flex flex-col h-full bg-[#FFF6EC] rounded-2xl'}>
                    <div className={'h-[50%] w-full  px-6 gap-5 flex  justify-start items-center'}>
                        <div
                            className={'h-16 w-16 flex justify-center items-center rounded-full bg-[#ECECFF] p-2'}>
                            <img src={'../images/admin/totalSell.png'} alt={''}/>
                        </div>
                        <div className={'flex flex-col '}>
                            <p>Total Medicine Sell</p>
                            <p className={'text-[#6E6D7A]'}>This Month</p>
                        </div>
                    </div>
                    <div className={'h-[50%] w-full px-6  flex justify-start items-center'}>
                        <p className={'font-semibold text-4xl'}>৳1,250
                            <span>
                                        <i className={'fa-solid fa-arrow-up text-sm text-green-500 p-2'}>40%</i>

                                    </span>
                            <span className={'font-light text-sm'}>from last week</span>
                        </p>
                    </div>
                </div>
                <div className={'w-[33.33%] flex flex-col h-full bg-[#FFF6EC] rounded-2xl'}>
                    <div className={'h-[50%] w-full  px-6 gap-5 flex  justify-start items-center'}>
                        <div
                            className={'h-16 w-16 flex justify-center items-center rounded-full bg-[#FFDFE4] p-2'}>
                            <img src={'../images/admin/appointments.png'} alt={''}/>
                        </div>
                        <div className={'flex flex-col '}>
                            <p>Total Medicine Sell</p>
                        </div>
                    </div>
                    <div className={'h-[50%] w-full px-6  flex justify-start items-center'}>
                        <p className={'font-semibold text-4xl'}>250
                            <span>
                                        <i className={'fa-solid fa-arrow-up text-sm text-green-500 p-2'}>40%</i>

                                    </span>
                            <span className={'font-light text-sm'}>from last week</span>
                        </p>
                    </div>
                </div>
                <div className={'w-[33.33%] flex flex-col h-full bg-[#FFF6EC] rounded-2xl'}>
                    <div className={'h-[50%] w-full  px-6 gap-5 flex  justify-start items-center'}>
                        <div
                            className={'h-16 w-16 flex justify-center items-center rounded-full bg-[#ECECFF] p-2'}>
                            <img src={'../images/admin/call.png'} alt={''}/>
                        </div>
                        <div className={'flex flex-col '}>
                            <p>Call Consultancy</p>
                        </div>
                    </div>
                    <div className={'h-[50%] w-full px-6  flex justify-start items-center'}>
                        <p className={'font-semibold text-4xl'}>250
                            <span>
                                        <i className={'fa-solid fa-arrow-up text-sm text-green-500 p-2'}>40%</i>

                                    </span>
                            <span className={'font-light text-sm'}>from last week</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={'flex flex-col justify-center items-center mt-8 h-[65%] gap-2'}>
                <h1 className={'text-xl font-semibold'}>Medicine Sell Vs Customer Retention</h1>
                <CustomerVsRetention data={data}/>

            </div>
        </AdminLayout>

    );
}
