import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CategoryCard from '../components/CategoryCard';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        // Fetch all categories
        axios.get('/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleDeleteCategory = (categoryId) => {
        // Implement delete functionality
        // Send DELETE request to backend
        // Update state accordingly
    };

    const handleAddCategory = () => {
        if (newCategoryName.trim() !== '') {
            // Implement add functionality
            // Send POST request to backend to add new category
            // Update state accordingly
            axios.post('/categories', { name: newCategoryName })
                .then(response => {
                    setCategories([...categories, response.data]);
                    setNewCategoryName('');
                })
                .catch(error => {
                    console.error('Error adding category:', error);
                });
        }
    };

    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-semibold">Categories</h1>
                <div className="flex items-center">
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded mr-2"
                        placeholder="New Category Name"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <button onClick={handleAddCategory} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        Add New Category
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map(category => (
                    <CategoryCard key={category.id} category={category} onDelete={handleDeleteCategory} />
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
