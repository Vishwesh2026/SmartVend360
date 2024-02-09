import React, { useState } from 'react';
import loginImg from '../images/warehouse-management-software.png';

const LoginForm = ({ setIsAuthenticated }) => {
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        // Set isAuthenticated to true
        setIsAuthenticated(true);
        // Navigate to dashboard page
        window.location.href = '/dashboard';
    };

    return (
        <div>
            <div className='fixed w-screen py-4 px-2 bg-gray-900 text-white flex justify-between'>
                <div className='container mx-auto flex items-center'>
                    <h1 className="text-2xl md:text-4xl font-semibold">StockFlow</h1>
                </div>
            </div>

            <div className="flex h-screen ">
                <div className="w-1/2 bg-gray-200 flex justify-center items-center">
                    <img src={loginImg} alt="Login" className="max-w-2xl" />
                </div>

                <div className="w-1/2 flex justify-center items-center">
                    <div className="w-1/2 max-w-2xl p-8 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6">Welcome Back!</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}> {/* Add onSubmit attribute */}
                            <div className="flex items-center border rounded-lg">
                                <span className="px-3">
                                    <i className="fa fa-user text-gray-500"></i>
                                </span>
                                <input type="text" placeholder="Username" className="w-full py-3 px-4 outline-none" />
                            </div>
                            <div className="flex items-center border rounded-lg">
                                <span className="px-3">
                                    <i className="fa fa-lock text-gray-500"></i>
                                </span>
                                <input type="password" placeholder="Password" className="w-full py-3 px-4 outline-none" />
                            </div>
                            <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
