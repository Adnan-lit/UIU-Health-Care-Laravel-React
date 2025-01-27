import { Link } from "@inertiajs/react";
import React from "react";

const MedicineTable = ({ medicineList, inventory }) => {
    // Create an inventory map for faster lookup
    const inventoryMap = inventory.reduce((acc, inv) => {
        acc[inv.medicine_id] = inv.stock;
        return acc;
    }, {});

    return (
        <div className="bg-[#f9f5f4] rounded-3xl">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead className="bg-gray-100">
                    <tr className="text-left text-gray-600 text-sm font-medium">
                        <th className="py-4 px-6">
                            Medicine Name{" "}
                            <i className="fa-solid fa-caret-down ml-1"></i>
                        </th>
                        <th className="py-4 px-6">
                            Medicine ID{" "}
                            <i className="fa-solid fa-caret-down ml-1"></i>
                        </th>
                        <th className="py-4 px-6">
                            Group Name{" "}
                            <i className="fa-solid fa-caret-down ml-1"></i>
                        </th>
                        <th className="py-4 px-6">
                            Stock in Qty{" "}
                            <i className="fa-solid fa-caret-down ml-1"></i>
                        </th>
                        <th className="py-4 px-6">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
                    {medicineList.map((medicine) => {
                        const stock = inventoryMap[medicine.medicine_id] || "Empty";
                        return (
                            <tr className="border-t hover:bg-gray-50" key={medicine.medicine_id}>
                                <td className="py-4 px-6">{medicine.brand_name}</td>
                                <td className="py-4 px-6">{medicine.medicine_id}</td>
                                <td className="py-4 px-6">{medicine.generic_name}</td>
                                <td className="py-4 px-6">{stock}</td>
                                <td className="py-4 px-6 text-orange-400 font-medium">
                                    <Link
                                        href={route(
                                            "pharmacist.medicine.show",
                                            medicine.medicine_id
                                        )}
                                    >
                                        View Full Detail{" "}
                                        <i className="fa-solid fa-chevron-right ml-1"></i>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MedicineTable;
