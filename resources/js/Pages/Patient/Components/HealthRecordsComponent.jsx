import React, { useState } from 'react';
import MedicalHistoryModal from "@/Pages/Patient/Components/MedicalHistoryModal.jsx";
import TestReportModal from "@/Pages/Patient/Components/TestReportModal.jsx";

const HealthRecords = ({healthRecords}) => {
    const [activeTab, setActiveTab] = useState('record');
    const [isMedicalHistoryOpen, setIsMedicalHistoryOpen] = useState(false);
    const [isTestReportOpen, setIsTestReportOpen] = useState(false);

    const handleViewMedicalHistory = () => {
        setIsMedicalHistoryOpen(true);
    };

    const handleViewTestReport = () => {
        setIsTestReportOpen(true);
    };

    const handleCloseMedicalHistory = () => {
        setIsMedicalHistoryOpen(false);
    };

    const handleCloseTestReport = () => {
        setIsTestReportOpen(false);
    };


    const TabButton = ({ id, title, isActive }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`pb-2 ${
                isActive
                    ? 'border-orange-500 text-orange-500 border-b-2'
                    : 'hover:text-orange-500'
            }`}
        >
            {title}
        </button>
    );

    const BasicHealthRecord = () => (
        <div className="mt-6 bg-white rounded-lg shadow-md">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-200">
                <tr>
                    <th className="py-3 px-4 text-gray-600 text-sm">#</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Date Of Checkup</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Weight (Kg)</th>
                    <th className={"py-3 px-4 text-gray-600 text-sm"}>Height (Cm)</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Heart Rate (BPM)</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Blood Pressure (MmHg)</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Chest (In)</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Waist (In)</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Hip (Cm)</th>
                </tr>
                </thead>
                <tbody>

                {/*<tr className="bg-gray-50">*/}
                {/*    <td className="py-3 px-4 text-sm">1</td>*/}
                {/*    <td className="py-3 px-4 text-sm">*/}
                {/*        <div className="font-medium">Tuesday</div>*/}
                {/*        <div className="text-gray-500">19/11/2024</div>*/}
                {/*    </td>*/}
                {/*    <td className="py-3 px-4 text-sm">60Kg</td>*/}
                {/*    <td className="py-3 px-4 text-sm">170cm</td>*/}
                {/*    <td className="py-3 px-4 text-sm">120bpm</td>*/}
                {/*    <td className="py-3 px-4 text-sm">80/120mmHg</td>*/}
                {/*    <td className="py-3 px-4 text-sm">36in</td>*/}
                {/*    <td className="py-3 px-4 text-sm">30in</td>*/}
                {/*    <td className="py-3 px-4 text-sm">28in</td>*/}
                {/*</tr>*/}

                {healthRecords && healthRecords.map((record, index) => {
                    const recordDetails = JSON.parse(record.record_details)
                    return (
                        <tr key={index} className="bg-gray-50">
                            <td className="py-3 px-4 text-sm">{index + 1}</td>
                            <td className="py-3 px-4 text-sm">{record.date}</td>
                            <td className="py-3 px-4 text-sm">{recordDetails.weight==='N/A' ? 'N/A' : recordDetails.weight}</td>
                            <td className="py-3 px-4 text-sm">{recordDetails.height==='N/A' ? 'N/A' : recordDetails.height}</td>
                            <td className="py-3 px-4 text-sm">{recordDetails.heartRate==='N/A' ? 'N/A' : recordDetails.heartRate}</td>

                            <td className="py-3 px-4 text-sm">{recordDetails.systolic==='N/A' || recordDetails.diastolic==='N/A' ? 'N/A' : recordDetails.systolic + '/' + recordDetails.diastolic}</td>

                            <td className="py-3 px-4 text-sm">{recordDetails.chest==='N/A' ? 'N/A' : recordDetails.chest}</td>
                            <td className="py-3 px-4 text-sm">{recordDetails.waist==='N/A' ? 'N/A' : recordDetails.waist}</td>
                            <td className="py-3 px-4 text-sm">{recordDetails.hip==='N/A' ? 'N/A' : recordDetails.hip}</td>

                        </tr>
                    )
                })}

                </tbody>
            </table>
        </div>
    );

    const MedicalHistory = () => (
        <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-200">
                <tr>
                    <th className="py-3 px-4 text-gray-600 text-sm">Prescription ID</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Date</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Doctor</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Details</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-gray-50">
                    <td className="py-3 px-4 text-sm">PR001</td>
                    <td className="py-3 px-4 text-sm">18/11/2024</td>
                    <td className="py-3 px-4 text-sm">Dr. Smith</td>
                    <td className="py-3 px-4 text-sm">General checkup prescription</td>
                    <td className="py-3 px-4 text-sm">
                        <button onClick={handleViewMedicalHistory} className="text-blue-500 hover:underline">View Medical History</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );

    const TestReport = () => (
        <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-200">
                <tr>
                    <th className="py-3 px-4 text-gray-600 text-sm">Report ID</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Test Name</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Date</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Result</th>
                    <th className="py-3 px-4 text-gray-600 text-sm">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-gray-50">
                    <td className="py-3 px-4 text-sm">TR001</td>
                    <td className="py-3 px-4 text-sm">Blood Test</td>
                    <td className="py-3 px-4 text-sm">17/11/2024</td>
                    <td className="py-3 px-4 text-sm">Normal</td>
                    <td className="py-3 px-4 text-sm">
                        <button onClick={handleViewTestReport} className="text-blue-500 hover:underline">View Report</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-gray-100 h-[80vh] overflow-y-hidden">
            <div className="bg-gray-50 min-h-screen">
                <div className="flex space-x-6 border-b  text-gray-600 text-lg font-semibold">
                    <TabButton id="record" title="Basic Health Checkup" isActive={activeTab === 'record'} />
                    <TabButton id="medical_history" title="Medical History" isActive={activeTab === 'medical_history'} />
                    <TabButton id="test_report" title="Test Report" isActive={activeTab === 'test_report'} />
                </div>

                <div className="overflow-y-auto h-[75vh] p-4 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#f58532]">
                    {activeTab === 'record' && <BasicHealthRecord />}
                    {activeTab === 'medical_history' && <MedicalHistory />}
                    {activeTab === 'test_report' && <TestReport />}
                </div>
            </div>

            <MedicalHistoryModal isOpen={isMedicalHistoryOpen} onClose={handleCloseMedicalHistory} />
            <TestReportModal isOpen={isTestReportOpen} onClose={handleCloseTestReport} />
        </div>


    );
};

export default HealthRecords;
