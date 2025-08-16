import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../App';

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
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">SV</span>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">SmartVend360</CardTitle>
            <p className="text-slate-600 mt-2">Integrated Vending Machine Management Platform</p>
            <p className="text-xs text-slate-500">Powered by GRN Engineering</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700" 
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-slate-600 text-center mb-4">Demo Login Options:</p>
              <div className="grid grid-cols-1 gap-2">
                {['Admin', 'Regional Manager', 'Operator', 'Technician', 'Analyst'].map(role => (
                  <Button
                    key={role}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(role)}
                    className="text-xs"
                    disabled={isSubmitting || isLoading}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;