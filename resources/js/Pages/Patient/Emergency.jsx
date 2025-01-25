import React, { useState } from 'react';
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";

const EmergencyActions = () => {
    // State for handling popup visibility and form content
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupData, setPopupData] = useState({ title: '', form: false, numbers: [] });

    // Data for the popups
    const data = {
        ambulance: {
            title: "Request an Ambulance",
            form: true,
            numbers: []
        },
        consultation: {
            title: "Consultation Numbers",
            form: false,
            numbers: ["+1122334455", "+5566778899"]
        }
    };

    // Show the popup based on the type (ambulance or consultation)
    const showPopup = (type) => {
        setPopupData(data[type]);
        setPopupVisible(true);
    };

    // Hide the popup
    const hidePopup = () => {
        setPopupVisible(false);
    };

    return (
        <PatientLayout title={"Emergency Actions"}>
            <div className="bg-gray-100 flex items-center justify-center h-screen">
                {/* Main Content */}
                <div className="flex space-x-8">
                    {/* Call for Ambulance */}
                    <div className="text-center">
                        <img src="../images/patient/Ambulance-bro.png" alt="Ambulance" height="400" width="400"/>
                        <button
                            onClick={() => showPopup('ambulance')}
                            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                        >
                            Call for Ambulance
                        </button>
                    </div>

                    {/* Emergency Consultation */}
                    <div className="text-center">
                        <img src="../images/patient/Emergency call-bro.png" alt="Emergency Consultation" height="400"
                             width="400"/>
                        <button
                            onClick={() => showPopup('consultation')}
                            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                        >
                            Emergency Consultation
                        </button>
                    </div>
                </div>

                {/* Pop-up Modal */}
                {popupVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg text-center max-w-lg w-full">
                            <h2 className="text-lg font-semibold mb-4">{popupData.title}</h2>

                            {/* Dynamic Form */}
                            {popupData.form && (
                                <form className="space-y-4 text-left">
                                    <div>
                                        <label htmlFor="destination"
                                               className="block text-sm font-medium">Destination</label>
                                        <input
                                            type="text"
                                            id="destination"
                                            placeholder="Example: Khulna"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="ambulanceType" className="block text-sm font-medium">Ambulance
                                            Type</label>
                                        <select id="ambulanceType"
                                                className="w-full border border-gray-300 rounded px-3 py-2">
                                            <option>Select</option>
                                            <option>Basic Life Support</option>
                                            <option>Advanced Life Support</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium">Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:ring"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
                                        <div className="flex">
                                            <span
                                                className="inline-flex items-center bg-gray-100 px-3 border border-gray-300 rounded-l">+880</span>
                                            <input
                                                type="tel"
                                                id="phone"
                                                placeholder="Phone number"
                                                className="w-full border border-gray-300 rounded-r px-3 py-2 focus:ring focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500"
                                    >
                                        Send Ambulance Request
                                    </button>

                                    <div className="text-left text-sm mt-6 flex text-gray-400">
                                        <i className="bx bx-info-circle mt-1 mr-3 text-lg"
                                           style={{color: '#078ef7'}}></i>
                                        <p>One of our agents will get back to you within 30 minutes with the update of
                                            the ambulance</p>
                                    </div>
                                </form>
                            )}

                            {/* Numbers List */}
                            {!popupData.form && (
                                <ul className="text-left space-y-2">
                                    {popupData.numbers.map((number, index) => (
                                        <li key={index}>
                                            <a href={`tel:${number}`} className="text-blue-500 hover:underline">
                                                {number}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <button
                                onClick={hidePopup}
                                className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PatientLayout>
    );
};

export default EmergencyActions;
