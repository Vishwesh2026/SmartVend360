import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LeftNav from './components/LeftNav';
import Footer from './components/Footer';
import Header from './components/Header';

import Dashboard from './pages/Dashboard';
import InventoryPage from './pages/Inventory';
import AddProductForm from './components/AddProductForm';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import TransactionsPage from './pages/TransactionsPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

const App = () => {
    // Assuming isAuthenticated is a state variable to track user authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log("Current Location:", window.location.pathname);
    }, []);

    return (
        <Router>
            <div>
                {isAuthenticated ? (
                    // Render components for authenticated users
                    <div className='flex overflow-x-hidden'>
                        <LeftNav />
                        <div className='lg:w-[85%]'>
                            <div className='h-screen'>
                                <Header />
                                <main>
                                    <Routes>
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/inventory" element={<InventoryPage />} />
                                        <Route path="/inventory/add-product" element={<AddProductForm />} />
                                        <Route path="/categories" element={<CategoriesPage />} />
                                        <Route path="/orders" element={<OrdersPage />} />
                                        <Route path="/transactions" element={<TransactionsPage />} />
                                        <Route path="/" element={<Navigate to="/dashboard" />} />
                                    </Routes>
                                </main>
                            </div>
                            <Footer />
                        </div>
                    </div>
                ) : (
                    // Render components for guest users
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
