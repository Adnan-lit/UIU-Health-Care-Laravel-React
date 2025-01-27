
import { Head } from "@inertiajs/react";
import DashboardLayout from "./Layout/DashboardLayout";


export default function Dashboard() {

    const menuItems = [
        { href: route('pharmacist'),
             icon: "fa-solid fa-house", label: "Dashboard" },
        { href: route('pharmacist.medicine'),
             icon: "fa-solid fa-pills", label: "Medicine" },
        { href: "/admin/posts", icon: "fa-solid fa-box", label: "Orders" },
        { href: "/admin/patients", icon: "fa-solid fa-credit-card", label: "Payments" },

    ];


    return (
        <>
        <DashboardLayout menuItems={menuItems} title="Dashboard">
            <Head title="Pharmacist Dashboard" />
        <h1>Hello</h1>
        </DashboardLayout>
        </>
    );
}
