import React from "react";
import MedicineDetails from "./Components/MedicineDetails";
import DashboardLayout from "./Layout/DashboardLayout";

const MedicineShow = ({ medicine, inventory }) => {

    inventory = inventory || {};

    const menuItems = [
        {
            href: route("pharmacist"),
            icon: "fa-solid fa-house",
            label: "Dashboard",
        },
        {
            href: route("pharmacist.medicine"),
            icon: "fa-solid fa-pills",
            label: "Medicine",
        },
        { href: "/admin/posts", icon: "fa-solid fa-box", label: "Orders" },
        {
            href: "/admin/patients",
            icon: "fa-solid fa-credit-card",
            label: "Payments",
        },
    ];

    return (
        <DashboardLayout menuItems={menuItems} title="Medicine">
            <MedicineDetails medicine={medicine} inventory={inventory} />
        </DashboardLayout>
    );
};

export default MedicineShow;
