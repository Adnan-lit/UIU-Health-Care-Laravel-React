import {Head} from "@inertiajs/react";
import SideBar from "@/Pages/Admin/Components/SideBar.jsx";
import TopBar from "@/Pages/Admin/Components/TopBar.jsx";
import CustomerVsRetention from "@/Pages/Admin/Components/CustomerVsRetention.jsx";

export default function AdminLayout({children}) {
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
    <div className="flex h-screen w-screen bg-gradient-to-r from-[#ffff]  to-[#CEA88E]">
        <SideBar menuItems={menuItems}/>
        <div className="flex flex-col h-full w-full pr-[50px] pb-5">
            <TopBar notifications={notifications} user={user}/>
            <div className={"flex flex-col gap-4 w-full h-[85vh] bg-white rounded-2xl shadow p-5"}>
                {children}
            </div>
        </div>
    </div>
    )
}
