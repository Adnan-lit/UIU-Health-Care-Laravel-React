
import { Head } from "@inertiajs/react";
import DashboardLayout from "./Layout/DashboardLayout";
import { useState } from "react";
import MedicineTable from "./Components/MedicineTable";
import { Tab } from "@headlessui/react";
import TabsAndSearch from "./Components/TabsAndSearch";
import Pagination from "./Components/Pagination";
import StockUpdateModal from "./Components/StockUpdateModal";


export default function Dashboard({allMedicines, inventory, groupNames, queryParams=null}) {

    const menuItems = [
        { href: route('pharmacist'),
             icon: "fa-solid fa-house", label: "Dashboard" },
        { href: route('pharmacist.medicine'),
             icon: "fa-solid fa-pills", label: "Medicine" },
        { href: "/admin/posts", icon: "fa-solid fa-box", label: "Orders" },
        { href: "/admin/patients", icon: "fa-solid fa-credit-card", label: "Payments" },

    ];

    const [medicines, setMedicines] = useState(allMedicines.data);


    queryParams = queryParams || {};



    const [isModalOpen, setIsModalOpen] = useState(false);

    

    return (
        <DashboardLayout menuItems={menuItems} title="Medicine">
            <Head title="Medicine" />
        
        {/* <pre>{JSON.stringify(allMedicines, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(inventory, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(groupNames, null, 2)}</pre> */}
        <TabsAndSearch queryParams={queryParams} groupNames={groupNames}/>
        <MedicineTable medicineList={medicines} inventory={inventory}/>
        <Pagination links={allMedicines.links} />


        </DashboardLayout>
    
    );
}
