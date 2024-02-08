import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 bottom-0">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; 2024 Inventory Management System</p>
                <div className="mt-2">
                    <a href="/" className="text-gray-300 hover:text-white mx-2">About Us</a>
                    <a href="/" className="text-gray-300 hover:text-white mx-2">Contact Us</a>
                    <a href="/" className="text-gray-300 hover:text-white mx-2">Terms of Service</a>
                    <a href="/" className="text-gray-300 hover:text-white mx-2">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
