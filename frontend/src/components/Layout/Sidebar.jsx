import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  BarChart3, 
  Wrench, 
  Users, 
  Settings 
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';
import { rolePermissions } from '../../mock/mockData';

const Sidebar = () => {
  const { user } = useAuth();
  const { language } = useSettings();
  
  const menuItems = [
    { 
      path: '/dashboard', 
      icon: LayoutDashboard, 
      label: language === 'en' ? 'Dashboard' : 'ダッシュボード',
      permission: 'dashboard'
    },
    { 
      path: '/inventory', 
      icon: Package, 
      label: language === 'en' ? 'Inventory' : '在庫管理',
      permission: 'inventory'
    },
    { 
      path: '/analytics', 
      icon: BarChart3, 
      label: language === 'en' ? 'Analytics' : '分析',
      permission: 'analytics'
    },
    { 
      path: '/maintenance', 
      icon: Wrench, 
      label: language === 'en' ? 'Maintenance' : 'メンテナンス',
      permission: 'maintenance'
    },
    { 
      path: '/users', 
      icon: Users, 
      label: language === 'en' ? 'Users' : 'ユーザー',
      permission: 'users'
    }
  ];

  const userPermissions = rolePermissions[user?.role] || [];

  const filteredMenuItems = menuItems.filter(item => 
    userPermissions.includes(item.permission)
  );

  return (
    <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Role Badge */}
        <div className="mt-8 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
            {language === 'en' ? 'Current Role' : '現在の役割'}
          </div>
          <div className="font-medium text-slate-800 dark:text-white">
            {user?.role}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;