import React, { useState } from 'react';
import Cart from "@/Pages/Patient/Components/Cart.jsx";
import PatientLayout from "@/Pages/Patient/Layout/PatientLayout.jsx";

const Medicines = () => {
    const [activeTab, setActiveTab] = useState('medicine');
    const [cartItems, setCartItems] = useState([
        { name: 'Napa', strength: '500mg', quantity: 1, subtotal: 100 },
        { name: 'Aspra', strength: '500mg', quantity: 1, subtotal: 100 },
    ]);
    const [searchQuery, setSearchQuery] = useState('');

    const switchTab = (tabId) => {
        setActiveTab(tabId);
    };

    const handleQuantityChange = (index, operation) => {
        const updatedItems = [...cartItems];
        const item = updatedItems[index];
        if (operation === 'increment') {
            item.quantity += 1;
        } else if (operation === 'decrement' && item.quantity > 1) {
            item.quantity -= 1;
        }
        item.subtotal = item.quantity * 100; // Assuming price per item is 100
        setCartItems(updatedItems);
    };

    return (
        <PatientLayout title={'Medicines'}>
            <div className="bg-gray-50 h-[80vh] w-full overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[#f58532] p-8 rounded-lg">
                {/* Tabs Navigation */}
                <div className="flex space-x-6 border-b pb-4 mb-6 text-gray-600 text-lg font-semibold">
                    <a
                        href="#medicine"
                        className={`tab ${activeTab === 'medicine' ? 'border-orange-500 text-orange-500 border-b-2 pb-2' : ''}`}
                        onClick={() => switchTab('medicine')}
                    >
                        My Medicine
                    </a>
                    <a
                        href="#order_medicine"
                        className={`tab ${activeTab === 'order_medicine' ? 'border-orange-500 text-orange-500 border-b-2 pb-2' : ''}`}
                        onClick={() => switchTab('order_medicine')}
                    >
                        Order Medicine
                    </a>
                    <a
                        href="#order_history"
                        className={`tab ${activeTab === 'order_history' ? 'border-orange-500 text-orange-500 border-b-2 pb-2' : ''}`}
                        onClick={() => switchTab('order_history')}
                    >
                        Order History
                    </a>
                    <a
                        href="#cart"
                        className={`tab ${activeTab === 'cart' ? 'border-orange-500 text-orange-500 border-b-2 pb-2' : ''} flex gap-2 justify-center items-center text-center`}
                        onClick={() => switchTab('cart')}
                    >
                        {/*cart icon*/}

                        <i className="fas fa-shopping-cart"></i>
                        Cart
                    </a>
                </div>

                {/* Sections */}
                <section id="medicine" className={`section ${activeTab === 'medicine' ? '' : 'hidden'} overflow-y-auto `}>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-semibold mb-4">My Medicine</h2>
                        <table className="w-full text-center text-sm text-gray-600">
                            <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-6">Name</th>
                                <th className="py-3 px-6">Strength</th>
                                <th className="py-3 px-6">Quantity</th>
                                <th className="py-3 px-6">Dosage Time</th>
                                <th className="py-3 px-6">Schedule</th>
                                <th className="py-3 px-6">Duration</th>
                                <th className="py-3 px-6">Process</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6 flex items-center space-x-4">
                                    <img src="../images/patient/pill.png" alt="napa"/>
                                    <div className="ml-4 text-left">
                                        <p className="font-bold">Napa</p>
                                        <p className="text-gray-400">Paracetamol</p>
                                    </div>
                                </td>
                                <td className="py-4 px-6">500mg</td>
                                <td className="py-4 px-6">1</td>
                                <td className="py-4 px-6">After Meal</td>
                                <td className="py-4 px-6">8:30AM - 12:00 AM</td>
                                <td className="py-4 px-6">3 Months</td>
                                <td className="py-4 px-6">
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                        <div className="bg-orange-500 h-2 rounded-full" style={{width: '50%'}}></div>
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6 flex items-center space-x-4">
                                    <img src="../images/patient/capsule.png" alt="aspra"/>
                                    <div className="ml-4 text-left">
                                        <p className="font-bold">Aspra</p>
                                        <p className="text-gray-400">Omeprazole</p>
                                    </div>
                                </td>
                                <td className="py-4 px-6">500mg</td>
                                <td className="py-4 px-6">1</td>
                                <td className="py-4 px-6">Before Meal</td>
                                <td className="py-4 px-6">8:30AM - 12:00 AM</td>
                                <td className="py-4 px-6">2 Months</td>
                                <td className="py-4 px-6">
                                    <p className="text-gray-400 text-xs">Start Date: 05 Oct 2024</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                        <div className="bg-orange-500 h-2 rounded-full" style={{width: '50%'}}></div>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="order_medicine" className={`section ${activeTab === 'order_medicine' ? '' : 'hidden'} overflow-y-auto`}>
                    <h2 className="text-lg font-semibold text-orange-500 mb-4">Order Your Medicine</h2>
                    <div className="bg-white shadow-md p-4 rounded-lg mb-4">
                        <input
                            type="text"
                            placeholder="Search Medicine"
                            className="w-full p-2 text-sm bg-gray-100 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Single Medicine Card */}
                        <div className="bg-white shadow-lg rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                                <img src="../images/patient/pill.png" alt="napa"/>
                                <div>
                                    <p className="font-semibold text-gray-700">Napa</p>
                                    <p className="text-sm text-gray-400">Paracetamol 500mg</p>
                                </div>
                            </div>
                            <select className="w-full mt-4 border rounded-lg p-2 text-sm">
                                <option>1 Piece</option>
                                <option>2 Pieces</option>
                                <option>3 Pieces</option>
                            </select>
                            <p className="mt-2 text-gray-700">৳3.00</p>
                            <button className="mt-4 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">Add to
                                cart
                            </button>
                        </div>

                        {/* Single Medicine Card (Buy Now Button Version) */}
                        <div className="bg-white shadow-lg rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                                <img src="../images/patient/capsule.png" alt="aspra"/>
                                <div>
                                    <p className="font-semibold text-gray-700">Aspra</p>
                                    <p className="text-sm text-gray-400">Omeprazole 500mg</p>
                                </div>
                            </div>
                            <select className="w-full mt-4 border rounded-lg p-2 text-sm">
                                <option>1 Piece</option>
                                <option>2 Pieces</option>
                                <option>3 Pieces</option>
                            </select>
                            <p className="mt-2 text-gray-700">৳3.00</p>
                            <button
                                className="mt-4 w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Buy
                                Now
                            </button>
                        </div>
                    </div>
                </section>

                <section id="cart" className={`section ${activeTab === 'cart' ? '' : 'hidden'} overflow-y-auto`}>
                    <Cart></Cart>
                </section>
            </div>
        </PatientLayout>
    );
};

export default Medicines;
