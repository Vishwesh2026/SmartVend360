import React from 'react'

// Component for a single product card
const ProductCard = ({ product, onDelete }) => {
    const handleDelete = () => {
        onDelete(product.id);
    };

    return (
        <div className="border border-gray-200 rounded-md p-4 mb-4">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-600">Quantity: {product.quantity}</p>
            <button onClick={handleDelete} className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
            </button>
            {/* Add update functionality if needed */}
        </div>
    );
};

export default ProductCard
