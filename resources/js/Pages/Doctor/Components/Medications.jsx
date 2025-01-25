import React from "react";

const Medications = ({ medications }) => (
  <div className="bg-gray-100 rounded-lg p-4">
    <h3 className="text-gray-500 font-medium mb-4 flex items-center gap-2">
      <i className="fas fa-capsules text-[#FFA351]"></i> Medications
    </h3>
    {medications.map((medication, index) => (
      <div key={index} className="mb-6">
        <p className="font-semibold">{medication.name}</p>
        <p className="text-gray-500">
          {medication.dosage} • {medication.time}
        </p>
        <p className="mt-2 text-gray-500">{medication.type}</p>
        <p>{medication.notes}</p>
      </div>
    ))}
  </div>
);

export default Medications;
