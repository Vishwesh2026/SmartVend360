import React from 'react';
import { Bell, Globe, Moon, Sun, LogOut, Settings, User } from 'lucide-react';
import { Button } from '../ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { useAuth, useSettings } from '../../App';
import { mockMaintenanceAlerts } from '../../mock/mockData';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { language, theme, selectedCountry, setSelectedCountry, toggleLanguage, toggleTheme } = useSettings();

  const pendingAlerts = mockMaintenanceAlerts.filter(alert => alert.status === 'pending').length;

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="flex items-center justify-between h-full px-6">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SV</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">SmartVend360</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">GRN Engineering</p>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Country Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>{selectedCountry}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleCountryChange('India')}>
                🇮🇳 India
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCountryChange('Japan')}>
                🇯🇵 Japan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Toggle */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleLanguage}
            className="text-xs"
          >
            {language === 'en' ? 'EN' : 'JA'}
          </Button>

          {/* Theme Toggle */}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {pendingAlerts > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {pendingAlerts}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-semibold">Maintenance Alerts</h3>
              </div>
              {mockMaintenanceAlerts.slice(0, 3).map(alert => (
                <DropdownMenuItem key={alert.id} className="flex-col items-start p-3">
                  <div className="flex justify-between w-full">
                    <span className="font-medium">{alert.machineId}</span>
                    <Badge variant={alert.priority === 'critical' ? 'destructive' : 'secondary'}>
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">{user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="p-2 border-b">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-slate-600">{user?.role}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;