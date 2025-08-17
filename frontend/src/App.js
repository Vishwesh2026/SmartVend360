import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role) => {
    const credentials = {
      Admin: 'raj.patel@grn.co.in',
      'Regional Manager': 'a.tanaka@grn.co.jp',
      Operator: 'priya.s@grn.co.in',
      Technician: 'h.sato@grn.co.jp',
      Analyst: 'arun.k@grn.co.in'
    };
    setEmail(credentials[role]);
    setPassword('demo123');
    alert(`Logged in as ${role}: ${credentials[role]}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6">
        <div className="text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">SV</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800">SmartVend360</h1>
          <p className="text-slate-600 mt-2">Integrated Vending Machine Management Platform</p>
          <p className="text-xs text-slate-500">Powered by GRN Engineering</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button 
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            onClick={() => alert('Login functionality working!')}
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-slate-600 text-center mb-4">Demo Login Options:</p>
          <div className="grid grid-cols-1 gap-2">
            {['Admin', 'Regional Manager', 'Operator', 'Technician', 'Analyst'].map(role => (
              <button
                key={role}
                onClick={() => handleLogin(role)}
                className="text-xs py-2 px-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Login as {role}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">SmartVend360 Features:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Real-time machine monitoring (India & Japan)</li>
            <li>• Inventory management with alerts</li>
            <li>• Sales analytics & revenue tracking</li>
            <li>• Maintenance scheduling & alerts</li>
            <li>• Multi-role user management</li>
            <li>• Currency conversion (INR ↔ JPY)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;