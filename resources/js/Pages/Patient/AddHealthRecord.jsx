import React, { useState } from "react";
import axios from "axios";
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";
import {router} from "@inertiajs/react";
import {data} from "autoprefixer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddHealthRecord() {
    const [formData, setFormData] = useState({
        weight: "",
        height: "",
        heartRate: "",
        systolic: "",
        diastolic: "",
        chest: "",
        waist: "",
        hip: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // check any field is empty or not, if empty then add N/A
        for (const key in formData) {
            if (formData[key] === "") {
                formData[key] = "N/A";
            }
        }

        try {

            await  router.post("/patient/addHealthRecord", formData);
            //redirect to health records page
        } catch (err) {
            setError("Failed to add health record. Please try again.");
        } finally {
            setLoading(false);

            toast.success("Health Record Added Successfully",
                {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }


    };

    return (
        <PatientLayout title={"Add Health Record"}>
            <ToastContainer />
            <section id="measurements" className="section h-[80vh] w-full overflow-y-auto">
                <div className="bg-gray-50 ">
                    <form
                        className="mt-8 space-y-6 bg-white p-6 rounded-lg shadow-md"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex justify-center mb-6">
                            <div className="text-orange-500 text-xl">
                                <img
                                    src="../images/patient/medical-record_10531098.png"
                                    height="50"
                                    width="60"
                                    alt="records"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <i className="fas fa-weight"></i> Weight (kg)
                                </label>
                                <input
                                    type="text"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="Weight"
                                    className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <i className="fas fa-text-height"></i> Height (cm)
                                </label>
                                <input
                                    type="text"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    placeholder="Height"
                                    className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <i className="fas fa-heartbeat"></i> Heart Rate (bpm)
                                </label>
                                <input
                                    type="text"
                                    name="heartRate"
                                    value={formData.heartRate}
                                    onChange={handleChange}
                                    placeholder="Heart Rate"
                                    className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Blood Pressure
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-tachometer-alt"></i> Systolic
                                        (mmHg)
                                    </label>
                                    <input
                                        type="text"
                                        name="systolic"
                                        value={formData.systolic}
                                        onChange={handleChange}
                                        placeholder="Systolic"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-tachometer-alt"></i> Diastolic
                                        (mmHg)
                                    </label>
                                    <input
                                        type="text"
                                        name="diastolic"
                                        value={formData.diastolic}
                                        onChange={handleChange}
                                        placeholder="Diastolic"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Body Measurements
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-ruler"></i> Chest (In)
                                    </label>
                                    <input
                                        type="text"
                                        name="chest"
                                        value={formData.chest}
                                        onChange={handleChange}
                                        placeholder="Chest"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-ruler-combined"></i> Waist (In)
                                    </label>
                                    <input
                                        type="text"
                                        name="waist"
                                        value={formData.waist}
                                        onChange={handleChange}
                                        placeholder="Waist"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <i className="fas fa-ruler"></i> Hip (In)
                                    </label>
                                    <input
                                        type="text"
                                        name="hip"
                                        value={formData.hip}
                                        onChange={handleChange}
                                        placeholder="Hip"
                                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className={`bg-orange-500 text-white px-6 py-2 rounded-lg shadow mt-10 ${
                                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
                                }`}
                                disabled={loading}
                            >
                                {loading ? "Adding..." : "Add Record"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </PatientLayout>
    );
}
