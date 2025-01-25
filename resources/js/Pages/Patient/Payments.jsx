import { useTable, useSortBy } from 'react-table';
import { useMemo, useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";  // Import Font Awesome Icons

const Payments = ({payments}) => {
    // Sample data
    const data = useMemo(() => payments, []);

    // Columns definition for the table
    const columns = useMemo(() => [
        { Header: 'Payment ID', accessor: 'payment_id' },
        { Header: 'Transaction ID', accessor: 'trx_id' },
        { Header: 'Amount', accessor: 'amount' },
        { Header: 'Type', accessor: 'type' },
        { Header: 'Payer Account', accessor: 'payer_account' },
        { Header: 'Payment Execute Time', accessor: 'paymentExecuteTime' },
    ], []);

    // State for the filter
    const [filter, setFilter] = useState({
        trx_id: '',
    });

    // Filter function for searching by Transaction ID
    const filteredData = useMemo(() => {
        return data.filter(item => {
            return (
                (!filter.trx_id || item.trx_id.toLowerCase().includes(filter.trx_id.toLowerCase()))
            );
        });
    }, [filter, data]);

    // Initialize react-table with filtered data and sorting functionality
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state: { sortBy } } = useTable({
        columns,
        data: filteredData,
        initialState: { sortBy: [{ id: 'trx_id', desc: false }] }, // Default sorting by Transaction ID
    }, useSortBy);

    // Handle input changes for filtering
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    return (
        <PatientLayout title={"Payments"}>
            <div className="flex flex-col w-full mx-auto h-[80vh]">
                {/* Filter Inputs */}
                <div className="mb-6 flex gap-4">
                    <input
                        type="text"
                        name="trx_id"
                        placeholder="Search by Transaction ID"
                        value={filter.trx_id}
                        onChange={handleFilterChange}
                        className="p-3 w-full md:w-1/3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Table */}
                <div className="flex flex-col overflow-y-auto h-[100%] shadow-xl rounded-lg bg-white [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#f58532]
  ">
                    <table {...getTableProps()} className="min-w-full table-auto text-sm text-left">
                        <thead className="bg-orange-400 text-white">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="py-3 px-6 font-semibold tracking-wide cursor-pointer"
                                    >
                                        {column.render('Header')}
                                        {/* Custom sorting icons from Font Awesome */}
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <FaSortDown className="w-5 h-5 inline ml-2"/>
                                            ) : (
                                                <FaSortUp className="w-5 h-5 inline ml-2"/>
                                            )
                                        ) : (
                                            <FaSort className="w-5 h-5 inline ml-2 text-gray-300"/>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody className={'overflow-y-auto'} {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                className="py-4 px-6 text-gray-700 border-b border-gray-300"
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </PatientLayout>
    );
};

export default Payments;
