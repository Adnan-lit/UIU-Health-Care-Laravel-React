import React from "react";
import Pagination from "./Components/Pagination";
import PatientTable from "./Components/PatientTable";
import SearchFilter from "./Components/SearchFilter";

const PatientsPage = () => {
    return (
        <main className="p-8">
            <h2 className="text-2xl font-semibold text-[#ff914d] mb-6">
                Today's Patients
            </h2>
            <SearchFilter />
            <PatientTable />
            <Pagination />
        </main>
    );
};

export default PatientsPage;
