import React from 'react';
import { jsPDF } from 'jspdf';

const TestReportModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Function to print the report
    const handlePrint = () => {
        const printContent = document.getElementById('modal-content');
        const printWindow = window.open('', '' );
        // Include styles from your modal content to the print window
        const styles = document.querySelector('style') ? document.querySelector('style').innerHTML : '';

        printWindow.document.write('<html><head><title>Test Report</title>');
        printWindow.document.write('<style>' + styles + '</style>');
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    // Function to download PDF
    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Get the content you want to include in the PDF
        const content = document.getElementById('modal-content').innerHTML;

        const styles = document.querySelector('style') ? document.querySelector('style').innerHTML : '';

        //css
        doc.html(styles);

        doc.html(content); // Place text at x=10, y=10
        doc.save('test-report.pdf'); // Save as a PDF
    };

    return (
        <div className="modal-overlay fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center" onClick={onClose}>
            <div
                id={'modal-content'}
                className="modal-content relative bg-white shadow-lg rounded-lg mt-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <section id="test_report" className="section">
                    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 ">
                        <header className="bg-orange-400 text-white py-6 px-4 shadow-lg">
                            <div className="container mx-auto">
                                <h1 className="text-3xl font-bold">Patient Test Report</h1>
                                <p className="text-sm mt-1">Detailed medical test results for patient assessment.</p>
                            </div>
                        </header>

                        <main className="container mx-auto py-8 px-4">
                            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h2 className="text-xl font-bold text-orange-400 mb-4">Patient Information</h2>
                                <div className="grid grid-cols-4 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Full Name:</label>
                                        <p className="text-gray-800 font-medium">John Doe</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Age:</label>
                                        <p className="text-gray-800 font-medium">23</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Gender:</label>
                                        <p className="text-gray-800 font-medium">Male</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">DOB:</label>
                                        <p className="text-gray-800 font-medium">2002-07-12</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">University
                                            Mail:</label>
                                        <p className="text-gray-800 font-medium">john.doe@university.edu</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">University
                                            ID:</label>
                                        <p className="text-gray-800 font-medium">011221493</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Patient ID:</label>
                                        <p className="text-gray-800 font-medium">#12345678</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Date of Test:</label>
                                        <p className="text-gray-800 font-medium">2024-12-05</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Doctor:</label>
                                        <p className="text-gray-800 font-medium">Dr. Jane Smith</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600">Test Center:</label>
                                        <p className="text-gray-800 font-medium">United Medical lab</p>
                                    </div>

                                </div>
                            </section>

                            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h2 className="text-xl font-bold text-orange-400 mb-4">Test Results</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border-collapse border border-gray-200 text-sm">
                                        <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-2">Test Name</th>
                                            <th className="border border-gray-300 px-4 py-2">Result</th>
                                            <th className="border border-gray-300 px-4 py-2">Reference Range</th>
                                            <th className="border border-gray-300 px-4 py-2">Flag</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Blood Pressure</td>
                                            <td className="border border-gray-300 px-4 py-2">120/80 mmHg</td>
                                            <td className="border border-gray-300 px-4 py-2">90/60 - 120/80 mmHg</td>
                                            <td className="border border-gray-300 px-4 py-2 text-green-600">Normal</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Cholesterol</td>
                                            <td className="border border-gray-300 px-4 py-2">240 mg/dL</td>
                                            <td className="border border-gray-300 px-4 py-2">Below 200 mg/dL</td>
                                            <td className="border border-gray-300 px-4 py-2 text-red-600">High</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Blood Sugar (Fasting)</td>
                                            <td className="border border-gray-300 px-4 py-2">95 mg/dL</td>
                                            <td className="border border-gray-300 px-4 py-2">70 - 100 mg/dL</td>
                                            <td className="border border-gray-300 px-4 py-2 text-green-600">Normal</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 px-4 py-2">Hemoglobin</td>
                                            <td className="border border-gray-300 px-4 py-2">13.5 g/dL</td>
                                            <td className="border border-gray-300 px-4 py-2">12 - 15 g/dL</td>
                                            <td className="border border-gray-300 px-4 py-2 text-green-600">Normal</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h2 className="text-xl font-bold text-orange-400 mb-4">Recommendations</h2>
                                <p className="text-lg text-gray-800 font-medium">
                                    Based on your results, we recommend the following actions:
                                </p>
                                <ul className="list-disc pl-6 text-lg text-gray-800 font-medium">
                                    <li>Follow up with your primary care physician for cholesterol management.</li>
                                    <li>Maintain a healthy diet and exercise to manage blood pressure.</li>
                                    <li>Continue monitoring your blood sugar levels regularly.</li>
                                    <li>Regular check-ups for optimal health.</li>
                                </ul>

                            </section>


                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    className="bg-gray-200 px-6 py-3 rounded-lg hover:bg-gray-300 shadow-md text-sm"
                                    onClick={handlePrint}
                                >
                                    Print Report
                                </button>
                                <button
                                    className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 shadow-md text-sm"
                                    onClick={handleDownloadPDF}
                                >
                                    Download PDF
                                </button>
                            </div>

                        </main>

                    </div>
                </section>
            </div>
        </div>
    );
};

export default TestReportModal;
