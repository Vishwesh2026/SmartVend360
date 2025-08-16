import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Inventory from "./components/Inventory/Inventory";
import Analytics from "./components/Analytics/Analytics";
import Maintenance from "./components/Maintenance/Maintenance";
import Users from "./components/Users/Users";
import Login from "./components/Auth/Login";
import { mockUsers, rolePermissions } from "./mock/mockData";

// Auth Context
const AuthContext = React.createContext();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Settings Context for language and theme
const SettingsContext = React.createContext();

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [selectedCountry, setSelectedCountry] = useState('India');

  // Simulate authentication check
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('smartvend_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('smartvend_user');
        }
      }
      setIsLoading(false);
    };

    const timer = setTimeout(checkAuth, 1000);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password) { // Simple validation for demo
      setUser(foundUser);
      localStorage.setItem('smartvend_user', JSON.stringify(foundUser));
      setSelectedCountry(foundUser.country);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('smartvend_user');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ja' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Protected Route Component
  const ProtectedRoute = ({ children, requiredPermission }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (requiredPermission && !rolePermissions[user.role]?.includes(requiredPermission)) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to vending machines...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      <SettingsContext.Provider value={{ 
        language, 
        theme, 
        selectedCountry, 
        setSelectedCountry,
        toggleLanguage, 
        toggleTheme 
      }}>
        <div className={`App ${theme === 'dark' ? 'dark' : ''}`}>
          <BrowserRouter>
            <Routes>
              <Route 
                path="/login" 
                element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
              />
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute requiredPermission="dashboard">
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="inventory" 
                  element={
                    <ProtectedRoute requiredPermission="inventory">
                      <Inventory />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="analytics" 
                  element={
                    <ProtectedRoute requiredPermission="analytics">
                      <Analytics />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="maintenance" 
                  element={
                    <ProtectedRoute requiredPermission="maintenance">
                      <Maintenance />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="users" 
                  element={
                    <ProtectedRoute requiredPermission="users">
                      <Users />
                    </ProtectedRoute>
                  } 
                />
              </Route>
            </Routes>
            <Toaster />
          </BrowserRouter>
        </div>
      </SettingsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;