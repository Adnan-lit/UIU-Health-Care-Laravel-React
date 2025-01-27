import React from "react";
import { Link } from "@inertiajs/react";

const MedicineDetails = ({ medicine, inventory=null }) => {
    return (
        <>
        <div className="mb-8 max-h-[50vh] overflow-y-auto">
            {/* <pre>{JSON.stringify(medicine, null, 2)}</pre> */}
            <h2 className="text-xl font-semibold mb-4">{medicine.brand_name}</h2>

            <div className="overflow-x-auto mb-6">
                <table className="min-w-full table-auto text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-2 text-sm font-semibold text-gray-700">Medicine</th>
                            <th className="py-2 px-2 text-sm font-semibold text-gray-700">Group</th>
                            <th className="py-2 px-2 text-sm font-semibold text-gray-700">Inventory in Qty</th>
                            <th className="py-2 px-2 text-sm font-semibold text-gray-700">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="py-2 px-4 text-gray-800">{medicine.brand_name}</td>
                            <td className="py-2 px-4 text-gray-800">{medicine.generic_name}</td>
                            <td className="py-2 px-4 text-gray-800">{inventory.stock? inventory.stock : 0}</td>
                            <td className="py-2 px-4 text-gray-800">BDT{medicine.price}</td>
                            {/* <td className="py-2 px-4 text-gray-800">{medicine.brand_name}</td> */}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="overflow-x-auto mb-2">
                <table className="min-w-full table-auto text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-2 text-sm font-semibold text-gray-700">Medicine ID</th>
                            <th className="py-2 px-2 text-sm font-semibold text-gray-700">Strength</th>
                            <th className="py-2 px-2 text-sm font-semibold text-gray-700">Pack Size</th>
                            <th className="py-2 px-2 text-sm font-semibold text-gray-700">Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="py-2 px-2 text-gray-800">{medicine.medicine_id}</td>
                            <td className="py-2 px-2 text-gray-800">{medicine.strength}</td>
                            <td className="py-2 px-2 text-gray-800">{medicine.packsize}</td>
                            <td className="py-2 px-2 text-gray-800">{medicine.form}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between ">
                {/* <button className="bg-[#FF6A00] text-white px-6 py-2 rounded-lg">Update Stock</button> */}
                <button className="bg-[#FF4C4C] text-white px-6 py-2 rounded-lg">
                    <i className="fas fa-trash mr-2"></i> Delete Medicine
                </button>
            </div>
        </div>

        <div>
            <h3 className="text-xl font-semibold mb-2">How to Use</h3>
            <p className="text-gray-800 text-sm mb-4">{medicine.adult_dose}</p>
            <hr />
            <p className="text-gray-800 text-sm mt-2">{medicine.child_dose}</p>

            <h3 className="text-xl font-semibold mb-2">Side Effects</h3>
            <p className="text-gray-800 text-sm">
                {medicine.side_effect}
            </p>
        </div>

        </>
    );
};

export default MedicineDetails;
