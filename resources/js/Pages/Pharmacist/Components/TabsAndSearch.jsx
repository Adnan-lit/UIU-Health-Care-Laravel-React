import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import StockUpdateModal from "./StockUpdateModal";

const TabsAndSearch = ({ groupNames, queryParams }) => {
    // Search Field Change
    const searchFieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("pharmacist.medicine", queryParams));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Open Modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle Stock Update
    const handleUpdateStock = (medicineId, newStock) => {
        const formdata = new FormData();
        formdata.append("medicine_id", medicineId);
        formdata.append("stock", newStock);

        try {
            router.post(
                route("pharmacist.medicine.inventory.update"),
                formdata,
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        closeModal();
                        alert("Stock updated successfully.");
                        router.reload();
                    },
                    onError: () => {
                        alert("Failed to update stock.");
                    },
                }
            );
        } catch (error) {
            alert("Failed to update stock.");
        }
    };
    return (
        <div className="px-7 ">
            <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                    <button className="text-orange-400 border-b-2 border-orange-400 font-medium">
                        Available Medicine
                    </button>
                    <button className="text-gray-500">
                        Stock Out Medicine
                    </button>
                    <button className="text-gray-500">
                        Requested Medicine
                    </button>
                </div>
                <button
                    onClick={openModal}
                    className="bg-orange-400 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <i className="fa-solid fa-plus"></i> Update Stock
                </button>
            </div>

            <div className="mt-2 flex items-center gap-4">
                <div className="relative flex-1">
                    <TextInput
                        className="w-2/5 py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="   Search Medicine Inventory.."
                        defaultValue={queryParams.brand_name}
                        onBlur={(e) =>
                            searchFieldChange("brand_name", e.target.value)
                        }
                        onKeyPress={(e) => onKeyPress("brand_name", e)}
                    />
                    <i className="fa-solid fa-magnifying-glass absolute left-2 top-3 text-gray-400"></i>
                </div>
                <select
                    class="w-1/6 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                    value={queryParams.generic_name || ""}
                    onChange={(e) =>
                        searchFieldChange("generic_name", e.target.value)
                    }
                >
                    <option value="">- Select Group -</option>
                    {groupNames.map((group) => (
                        <option
                            key={group.id}
                            value={group.generic_name}
                            title={group.generic_name} // Show full text on hover
                            className="truncate" // Truncate long text
                        >
                            {group.generic_name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Modal for Stock Update */}
            <StockUpdateModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onUpdateStock={handleUpdateStock}
            />
        </div>
    );
};

export default TabsAndSearch;
