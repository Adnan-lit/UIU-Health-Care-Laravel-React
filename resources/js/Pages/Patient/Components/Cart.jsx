import React, { useState } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Napa', strength: '500mg', price: 100, quantity: 1 },
        { id: 2, name: 'Aspra', strength: '500mg', price: 100, quantity: 1 }
    ]);

    const updateQuantity = (id, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const shippingCost = 30;
    const total = calculateSubtotal() + shippingCost;

    return (
            <div className="bg-white shadow-md rounded-lg p-6">
                {/* Cart Items Table */}
                <table className="w-full mb-8">
                    <thead className="bg-gray-100 text-gray-700 text-left text-sm font-semibold">
                    <tr>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Strength</th>
                        <th className="py-3 px-4">Quantity</th>
                        <th className="py-3 px-4">Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id} className="border-b">
                            <td className="py-4 px-4 flex items-center space-x-4">
                                <img src="../images/patient/pill.png" alt={item.name} className="w-8 h-8" />
                                <div>
                                    <p className="font-bold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">Paracetamol</p>
                                </div>
                            </td>
                            <td className="py-4 px-4">{item.strength}</td>
                            <td className="py-4 px-4">
                                <div className="flex items-center relative w-20">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        max="99"
                                        className="w-full h-10 text-center border border-gray-300 rounded-lg pr-8"
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    />
                                </div>
                            </td>
                            <td className="py-4 px-4">৳{item.price * item.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Cart Summary and Delivery Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {/* Cart Total */}
                    <div className="border p-6 rounded-lg mt-14">
                        <h3 className="text-lg font-bold mb-4">Cart Total</h3>
                        <div className="flex justify-between text-gray-700 mb-2">
                            <span>Subtotal:</span>
                            <span>৳{calculateSubtotal()}</span>
                        </div>
                        <div className="flex justify-between text-gray-700 mb-2">
                            <span>Shipping:</span>
                            <span>৳{shippingCost}</span>
                        </div>
                        <div className="flex justify-between text-gray-800 font-semibold">
                            <span>Total:</span>
                            <span>৳{total}</span>
                        </div>
                        <button className="mt-6 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-400 transition">
                            Proceed to checkout
                        </button>
                    </div>

                    {/* Delivery Address */}
                    <div className="mt-14">
                        <label className="block text-gray-700 font-bold mb-2">
                            Delivery Address
                            <i className="bx bx-question-mark-circle text-gray-400 ml-1"></i>
                        </label>
                        <textarea
                            className="w-full border p-3 rounded-lg text-sm"
                            rows="5"
                            placeholder="Enter your delivery address"
                        ></textarea>
                    </div>
                </div>
            </div>
    );
};

export default Cart;
