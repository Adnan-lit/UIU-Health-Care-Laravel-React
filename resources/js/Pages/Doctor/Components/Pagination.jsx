import React from 'react';

const Pagination = () => {
    return (
        <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">Showing 1 - 8 results of 298</p>
            <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"><i className="fas fa-chevron-left"></i></button>
                <p className="text-sm">Page 01</p>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"><i className="fas fa-chevron-right"></i></button>
            </div>
        </div>
    );
};

export default Pagination;
