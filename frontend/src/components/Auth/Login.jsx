import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.message);
    }
    
    setIsSubmitting(false);
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      Admin: { email: 'raj.patel@grn.co.in', password: 'demo123' },
      'Regional Manager': { email: 'a.tanaka@grn.co.jp', password: 'demo123' },
      Operator: { email: 'priya.s@grn.co.in', password: 'demo123' },
      Technician: { email: 'h.sato@grn.co.jp', password: 'demo123' },
      Analyst: { email: 'arun.k@grn.co.in', password: 'demo123' }
    };

    setFormData(demoCredentials[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl border-0 rounded-lg p-6">
          <div className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">SV</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">SmartVend360</h1>
            <p className="text-slate-600 mt-2">Integrated Vending Machine Management Platform</p>
            <p className="text-xs text-slate-500">Powered by GRN Engineering</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium py-2 px-4 rounded-lg transition-colors" 
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-slate-600 text-center mb-4">Demo Login Options:</p>
            <div className="grid grid-cols-1 gap-2">
              {['Admin', 'Regional Manager', 'Operator', 'Technician', 'Analyst'].map(role => (
                <button
                  key={role}
                  onClick={() => handleDemoLogin(role)}
                  className="text-xs py-2 px-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  disabled={isSubmitting || isLoading}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;