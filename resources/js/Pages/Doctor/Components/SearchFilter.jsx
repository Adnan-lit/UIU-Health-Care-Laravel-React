import React from 'react';

const SearchFilter = () => {
    return (
        <div className="flex items-center gap-4 mb-6">
            <div className="relative w-full max-w-md">
                <input type="text" placeholder="Search Patient.." className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#ff914d] focus:outline-none" />
                <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
            </div>
            <div className="relative">
                <button className="border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 text-gray-700">
                    <i className="fas fa-filter"></i>
                    <span>Select Status</span>
                    <i className="fas fa-chevron-down"></i>
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;
