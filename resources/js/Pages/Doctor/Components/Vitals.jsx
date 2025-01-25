import React from "react";

const Vitals = ({ vitals }) => (
  <div className="bg-gray-100 rounded-lg p-4">
    <h3 className="text-gray-500 font-medium mb-4 flex items-center gap-2">
      <i className="fas fa-heart text-[#FFA351]"></i> Vitals
    </h3>
    <div className="grid grid-cols-2 gap-4 text-sm">
      {vitals.map((vital, index) => (
        <div key={index}>
          <p className="text-lg font-semibold">{vital.value}</p>
          <p className="text-gray-500">{vital.label}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Vitals;
