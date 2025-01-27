import React, { useState } from "react";

const StockUpdateModal = ({ isOpen, onClose, onUpdateStock }) => {
    const [medicineId, setMedicineId] = useState("");
    const [stock, setStock] = useState("");

    // Handle Medicine ID Input Change
    const handleMedicineIdChange = (e) => {
        setMedicineId(e.target.value);
    };

    // Handle Stock Input Change
    const handleStockChange = (e) => {
        setStock(e.target.value);
    };

    // Handle Modal Close
    const handleClose = () => {
        onClose();
        setMedicineId(""); // Reset input fields when closing
        setStock("");
    };

    // Handle Stock Update
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!medicineId || !stock || isNaN(stock) || stock < 0) {
            alert("Please enter a valid medicine ID and stock quantity.");
            return;
        }
        onUpdateStock(medicineId, stock);
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-2xl font-semibold text-center text-orange-500">
                    Update Stock
                </h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Medicine ID Input */}
                    <div className="mb-4">
                        <label htmlFor="medicineId" className="block text-gray-700">
                            Medicine ID:
                        </label>
                        <input
                            type="text"
                            id="medicineId"
                            value={medicineId}
                            onChange={handleMedicineIdChange}
                            className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter Medicine ID"
                            required
                        />
                    </div>

                    {/* New Stock Input */}
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-gray-700">
                            New Stock Quantity:
                        </label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            onChange={handleStockChange}
                            className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder="Enter new stock quantity"
                            required
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition-all"
                        >
                            Update Stock
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="text-gray-500 hover:text-gray-700 font-semibold"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StockUpdateModal;
