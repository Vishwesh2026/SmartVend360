import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component for adding a new product
const AddProductForm = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories
        axios.get('/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            description,
            sku,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            category,
        };
        onAdd(newProduct);
        setName('');
        setDescription('');
        setSku('');
        setPrice('');
        setQuantity('');
        setCategory('');
    };

    return (
        <div className='p-6'>
            <h2 className="text-3xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="border border-gray-200 rounded-md p-4 flex flex-col items-center m-auto md:w-[50%]">

                <input type="text" placeholder="Product Name" value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                        required 
                />
                
                <input type="text" placeholder="Description" value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                />
                
                <input type="text" placeholder="SKU" value={sku} 
                        onChange={(e) => setSku(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                        required 
                />
                
                <input type="number" placeholder="Price" value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                        required 
                />
                
                <input type="number" placeholder="Quantity" value={quantity} 
                        onChange={(e) => setQuantity(e.target.value)} 
                        className="mb-2 block w-full border border-gray-300 rounded-md p-2" 
                        required 
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mb-2 block w-full border border-gray-300 rounded-md p-2"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))
                    ) : (
                        <option value="">N/A</option>
                    )}
                </select>
                
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;
