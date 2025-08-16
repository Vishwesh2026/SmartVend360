import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Users as UsersIcon, 
  UserPlus, 
  Shield, 
  Mail,
  MapPin,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';
import { useSettings } from '../../contexts/SettingsContext';
import { mockUsers, rolePermissions } from '../../mock/mockData';

const Users = () => {
  const { selectedCountry, language } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter users by country and search/filter criteria
  const filteredUsers = mockUsers.filter(user => {
    const matchesCountry = selectedCountry === 'all' || user.country === selectedCountry;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesCountry && matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: filteredUsers.length,
    active: filteredUsers.filter(u => u.status === 'active').length,
    inactive: filteredUsers.filter(u => u.status === 'inactive').length,
    admins: filteredUsers.filter(u => u.role === 'Admin').length
  };

  // Role statistics
  const roleStats = filteredUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Regional Manager': return 'bg-purple-100 text-purple-800';
      case 'Operator': return 'bg-blue-100 text-blue-800';
      case 'Technician': return 'bg-green-100 text-green-800';
      case 'Analyst': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'inactive': return 'text-slate-400';
      default: return 'text-slate-600';
    }
  };

  const formatLastLogin = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return language === 'en' ? 'Just now' : 'たった今';
    if (diffInHours < 24) return language === 'en' ? `${Math.floor(diffInHours)}h ago` : `${Math.floor(diffInHours)}時間前`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {language === 'en' ? 'User Management' : 'ユーザー管理'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {language === 'en' 
              ? `${selectedCountry} - ${stats.total} Users` 
              : `${selectedCountry} - ${stats.total}人のユーザー`
            }
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <UserPlus className="w-4 h-4" />
          <span>{language === 'en' ? 'Add User' : 'ユーザー追加'}</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Total Users' : '総ユーザー数'}
                </div>
              </div>
              <UsersIcon className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Active' : 'アクティブ'}
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-400">{stats.inactive}</div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Inactive' : '非アクティブ'}
                </div>
              </div>
              <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Admins' : '管理者'}
                </div>
              </div>
              <Shield className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder={language === 'en' ? 'Search users by name, email, or role...' : 'ユーザーを名前、メール、役割で検索...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">{language === 'en' ? 'All Roles' : '全ての役割'}</option>
              {Object.keys(rolePermissions).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">{language === 'en' ? 'All Status' : '全ステータス'}</option>
              <option value="active">{language === 'en' ? 'Active' : 'アクティブ'}</option>
              <option value="inactive">{language === 'en' ? 'Inactive' : '非アクティブ'}</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Role Overview */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Role Distribution' : '役割の分布'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(roleStats).map(([role, count]) => (
              <div key={role} className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-800">{count}</div>
                <div className="text-sm text-slate-600">{role}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {rolePermissions[role]?.length || 0} {language === 'en' ? 'permissions' : '権限'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'User Directory' : 'ユーザー一覧'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'User' : 'ユーザー'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Role' : '役割'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Location' : '場所'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Last Login' : '最終ログイン'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Status' : 'ステータス'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Actions' : 'アクション'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{user.name}</div>
                          <div className="text-sm text-slate-500 flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                      <div className="text-xs text-slate-500 mt-1">
                        {rolePermissions[user.role]?.length || 0} {language === 'en' ? 'permissions' : '権限'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-600">{user.country}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-600">
                          {formatLastLogin(user.lastLogin)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          user.status === 'active' ? 'bg-green-500' : 'bg-slate-400'
                        }`}></div>
                        <span className={`text-sm ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            {language === 'en' ? 'Edit User' : 'ユーザー編集'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {language === 'en' ? 'Change Role' : '役割変更'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {language === 'en' ? 'Reset Password' : 'パスワードリセット'}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            {language === 'en' ? 'Deactivate' : '無効化'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;