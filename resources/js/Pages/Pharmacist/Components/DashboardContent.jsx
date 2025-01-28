import React from "react";
import Card from "./Card";

const DashboardContent = () => {
    return (
    <div className="px-10 space-y-2">
      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card title="Good" subtitle="Inventory Status" linkText="View Detailed Report" color="green" />
        <Card title="BDT. 8,55,875" subtitle="Revenue : Jan 2024" linkText="View Detailed Report" color="yellow" />
        <Card title="298" subtitle="Medicines Available" linkText="Visit Inventory" color="blue" />
        <Card title="01" subtitle="Medicine Shortage" linkText="Resolve Now" color="red" />
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-700">Inventory</p>
            <a href="#" className="text-orange-400 font-medium flex items-center">
              Go to Configuration <i className="fa-solid fa-chevron-right ml-1"></i>
            </a>
          </div>
          <div className="mt-2 flex justify-between">
            <p className="text-gray-500">298</p>
            <p className="text-gray-500">Total no of Medicines</p>
          </div>
          <div className="mt-2 flex justify-between">
            <p className="text-gray-500">24</p>
            <p className="text-gray-500">Medicine Groups</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-700">Quick Report</p>
            <p className="text-gray-500 text-sm">January 2022</p>
          </div>
          <div className="mt-2 flex justify-between">
            <p className="text-gray-500">70,856</p>
            <p className="text-gray-500">Qty of Medicines Sold</p>
          </div>
          <div className="mt-2 flex justify-between">
            <p className="text-gray-500">5,288</p>
            <p className="text-gray-500">Invoices Generated</p>
          </div>
        </div>
      </div>
      {/* Additional Sections */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200">
          <h2 className="font-semibold text-orange-400">Top Customer</h2>
          <div className="mt-1 mx-10">
            {["Huston Carr", "Roza Marquez", "Jayden Terry"].map((name, index) => (
              <div key={index} className="flex items-center mb-1 bg-gray-400 rounded-2xl p-4">
                <img src="https://placehold.co/40x40" alt="Customer" className="w-10 h-10 rounded-full" />
                <div className="ml-2">
                  <p className="font-medium text-gray-700">{name}</p>
                  <p className="text-sm text-gray-500">Customer Role</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h2 className="font-semibold text-orange-400">Sales Overview</h2>
          <p className="text-sm text-gray">More in 2021</p>
          <div className="mt-2">
            <img src="https://placehold.co/400x200" alt="Sales Chart" className="w-3/4 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
    );
};

export default DashboardContent;