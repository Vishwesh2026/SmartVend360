import React from 'react';

const OrderCard = ({ order, onDelete }) => {
    const handleDelete = () => {
        onDelete(order.id); // Call the onDelete function passed from parent component
    };

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            <p className="text-gray-600">Total Items: {order.totalItems}</p>
            <p className="text-gray-600">Total Amount: ${order.totalAmount}</p>
            <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2">
                Delete
            </button>
        </div>
    );
};

export default OrderCard;
