import React, { useState } from 'react';

const MedicalHistoryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <section id="medical_history" className="section">
                    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 ">
                        {/* Modal Header */}
                        <header className="bg-orange-400 text-white py-6 px-4 shadow-lg">
                            <h1 className="text-3xl font-bold">Patient Medical Records</h1>
                            <p className="text-sm mt-1">Detailed medical test results for patient assessment.</p>
                        </header>

                        {/* Modal Main Content */}
                        <main className="container mx-auto py-8 px-4">
                            {/* Patient Information */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Patient Information</h2>
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Full Name:</label>
                                        <p className="text-gray-800 font-medium">John Doe</p>
                                    </div>
                                    {/* Add other patient info fields here */}
                                </div>
                            </div>

                            {/* Test Report History */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">Test Report History</h2>
                                <table className="w-full mt-4 text-left border-collapse">
                                    <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-3 px-4 text-gray-600 text-sm">Date</th>
                                        <th className="py-3 px-4 text-gray-600 text-sm">Test Type</th>
                                        <th className="py-3 px-4 text-gray-600 text-sm">Result</th>
                                        <th className="py-3 px-4 text-gray-600 text-sm">Remarks</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="bg-gray-50">
                                        <td className="py-3 px-4 text-sm">2024-11-10</td>
                                        <td className="py-3 px-4 text-sm">Blood Sugar</td>
                                        <td className="py-3 px-4 text-sm">7.8 mmol/L</td>
                                        <td className="py-3 px-4 text-sm">High</td>
                                    </tr>
                                    {/* Add more test report history rows here */}
                                    </tbody>
                                </table>
                            </div>
                        </main>

                        {/* Modal Footer */}
                        <div className="text-right">
                            <button className="bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MedicalHistoryModal;
