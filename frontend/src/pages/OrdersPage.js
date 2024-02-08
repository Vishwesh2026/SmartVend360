import React, { useState, useEffect } from 'react';
import axios from 'axios';

import OrderCard from '../components/OrderCard';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch all orders
        axios.get('/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const handleDeleteOrder = (orderId) => {
        // Implement delete functionality
        // Send DELETE request to backend
        // Update state accordingly
    };

    return (
        <div className="flex flex-col p-6">
            <h1 className="text-3xl font-semibold">Orders</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {orders.map(order => (
                    <OrderCard key={order.id} order={order} onDelete={handleDeleteOrder} />
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;
