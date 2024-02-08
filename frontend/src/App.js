import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LeftNav from './components/LeftNav';
import Footer from './components/Footer';
import Header from './components/Header';
import InventoryPage from './pages/Inventory';
import AddProductForm from './components/AddProductForm';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import TransactionsPage from './pages/TransactionsPage';

const App = () => {
    return (
        <Router>
            <div>
                <div className='flex overflow-x-hidden'>
                    <LeftNav />
                    <main className='lg:w-[85%] h-screen'>
						<Header />
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/inventory" element={<InventoryPage />} />
                            <Route path="/inventory/add-product" element={<AddProductForm />} />
                            <Route path="/categories" element={<CategoriesPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                            <Route path="/transactions" element={<TransactionsPage />} />
                        </Routes>
                    </main>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
