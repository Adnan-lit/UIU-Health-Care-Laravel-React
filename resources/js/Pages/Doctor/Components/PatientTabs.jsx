import { useState } from "react";

export default function PatientTabs({ health }) {
    const [activeTab, setActiveTab] = useState("Health");

    const tabs = ["Health", "Medicine", "Test Records", "History"];

    return (
        <div>
            {/* Tab Navigation */}
            <div className="mt-4 flex justify-center gap-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`py-2 px-4 rounded ${
                            activeTab === tab ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === "Health" && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium">Heart Rate</h4>
                            <p>{health.heartRate}</p>
                        </div>
                        <div>
                            <h4 className="font-medium">Blood Pressure</h4>
                            <p>{health.bloodPressure}</p>
                        </div>
                        <div>
                            <h4 className="font-medium">Pulse</h4>
                            <p>{health.pulse}</p>
                        </div>
                        <div>
                            <h4 className="font-medium">Oxygen</h4>
                            <p>{health.oxygen}</p>
                        </div>
                        <div>
                            <h4 className="font-medium">BMI</h4>
                            <p>{health.bmi}</p>
                        </div>
                        <div>
                            <h4 className="font-medium">Blood Group</h4>
                            <p>{health.bloodGroup}</p>
                        </div>
                        <div>
                            <h4 className="font-medium">Special Diseases</h4>
                            <p>{health.specialDiseases}</p>
                        </div>
                    </div>
                )}
                {activeTab === "Medicine" && <p>Medicine Information Coming Soon</p>}
                {activeTab === "Test Records" && <p>Test Records Coming Soon</p>}
                {activeTab === "History" && <p>History Information Coming Soon</p>}
            </div>
        </div>
    )
}
