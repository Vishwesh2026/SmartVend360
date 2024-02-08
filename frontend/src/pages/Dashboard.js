import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalTurnover, setTotalTurnover] = useState(0);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch total products
        axios.get('/products')
            .then(response => {
                setTotalProducts(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching total products:', error);
            });

        // Fetch total orders
        axios.get('/orders')
            .then(response => {
                setTotalOrders(response.data.length);
            })
            .catch(error => {
                console.error('Error fetching total orders:', error);
            });

        // Fetch total turnover (sum of all transaction amounts)
        axios.get('/transactions/total-turnover')
            .then(response => {
                setTotalTurnover(response.data.totalTurnover);
            })
            .catch(error => {
                console.error('Error fetching total turnover:', error);
            });

        // Fetch recent transactions
        axios.get('/transactions?limit=5') // Assuming API supports fetching recent transactions with a query parameter 'limit'
            .then(response => {
                setRecentTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching recent transactions:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-1">
                <main className="flex-1 p-6">

                    <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Total Products</h2>
                            <p className="text-gray-600">{totalProducts}</p>
                        </div>

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
                            <p className="text-gray-600">{totalOrders}</p>
                        </div>

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Total Turnover</h2>
                            <p className="text-gray-600">{totalTurnover}</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Data Visualization</h2>
                            {/* Add your chart component here */}
                            {loading ? (
                                <p>Loading chart...</p>
                            ) : (
                                // Add your chart component here. If no data is available, display a blank graph
                                <p>No data available to visualize</p>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
                            {loading ? (
                                <p>Loading...</p>
                            ) : recentTransactions.length > 0 ? (
                                <ul className="text-gray-600">
                                    {recentTransactions.map(transaction => (
                                        <li key={transaction.id}>{transaction.description}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No recent transactions</p>
                            )}
                            <Link to="/transactions" className="text-blue-500 hover:underline">View all transactions</Link>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
