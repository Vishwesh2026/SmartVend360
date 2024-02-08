import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ProductCard from '../components/ProductCard';

const InventoryPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch all products
        axios.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleDeleteProduct = (productId) => {
        // Implement delete functionality
        // Send DELETE request to backend
        // Update state accordingly
    };

    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-semibold">Inventory</h1>
                <Link to="/inventory/add-product" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Add New Product
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
                ))}
            </div>
        </div>
    );
};

export default InventoryPage;
