import React from "react";

const TestReports = ({ testReports }) => (
  <div className="bg-gray-100 rounded-lg p-4">
    <h3 className="text-gray-500 font-medium mb-4 flex items-center gap-2">
      <i className="fas fa-file-medical text-[#FFA351]"></i> Test Reports
    </h3>
    {testReports.map((report, index) => (
      <div key={index} className="mb-6">
        <p className="font-semibold">{report.name}</p>
        <p className="text-gray-500">{report.time}</p>
        <p className="mt-2 text-gray-500">{report.details}</p>
      </div>
    ))}
  </div>
);

export default TestReports;
