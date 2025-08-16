import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  AlertTriangle, 
  Wrench, 
  CheckCircle, 
  Clock,
  User,
  MapPin,
  Plus
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { mockMachines, mockMaintenanceAlerts, mockUsers } from '../../mock/mockData';

const Maintenance = () => {
  const { selectedCountry, language } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Filter machines and alerts by country
  const filteredMachines = mockMachines.filter(machine => machine.location.country === selectedCountry);
  
  // Enhanced maintenance alerts with machine details
  const enhancedAlerts = mockMaintenanceAlerts.map(alert => {
    const machine = mockMachines.find(m => m.id === alert.machineId);
    const assignedUser = mockUsers.find(u => u.id === alert.assignedTo);
    return {
      ...alert,
      machineName: machine?.name || 'Unknown Machine',
      machineLocation: machine?.location || { city: 'Unknown', country: 'Unknown' },
      assignedUserName: assignedUser?.name || 'Unassigned',
      machineStatus: machine?.status || 'unknown'
    };
  }).filter(alert => alert.machineLocation.country === selectedCountry);

  // Filter alerts
  const filteredAlerts = enhancedAlerts.filter(alert => {
    const matchesSearch = 
      alert.machineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.assignedUserName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Calculate statistics
  const stats = {
    total: filteredAlerts.length,
    pending: filteredAlerts.filter(a => a.status === 'pending').length,
    inProgress: filteredAlerts.filter(a => a.status === 'in-progress').length,
    completed: filteredAlerts.filter(a => a.status === 'completed').length,
    critical: filteredAlerts.filter(a => a.priority === 'critical').length
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'pending': return 'text-amber-600';
      default: return 'text-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Wrench;
      case 'pending': return Clock;
      default: return AlertTriangle;
    }
  };

  // Machines needing maintenance
  const machinesNeedingMaintenance = filteredMachines.filter(machine => 
    machine.status === 'maintenance' || machine.status === 'offline'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {language === 'en' ? 'Maintenance Management' : 'メンテナンス管理'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {language === 'en' 
              ? `${selectedCountry} - ${stats.total} Active Alerts` 
              : `${selectedCountry} - ${stats.total}件のアクティブアラート`
            }
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>{language === 'en' ? 'Create Alert' : 'アラート作成'}</span>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Total Alerts' : '総アラート数'}
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Pending' : '保留中'}
                </div>
              </div>
              <Clock className="w-8 h-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'In Progress' : '進行中'}
                </div>
              </div>
              <Wrench className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Completed' : '完了'}
                </div>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
                <div className="text-sm text-slate-600">
                  {language === 'en' ? 'Critical' : '緊急'}
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
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
                  placeholder={language === 'en' ? 'Search alerts, machines, or technicians...' : 'アラート、機械、技術者を検索...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">{language === 'en' ? 'All Status' : '全ステータス'}</option>
              <option value="pending">{language === 'en' ? 'Pending' : '保留中'}</option>
              <option value="in-progress">{language === 'en' ? 'In Progress' : '進行中'}</option>
              <option value="completed">{language === 'en' ? 'Completed' : '完了'}</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">{language === 'en' ? 'All Priority' : '全優先度'}</option>
              <option value="critical">{language === 'en' ? 'Critical' : '緊急'}</option>
              <option value="high">{language === 'en' ? 'High' : '高'}</option>
              <option value="medium">{language === 'en' ? 'Medium' : '中'}</option>
              <option value="low">{language === 'en' ? 'Low' : '低'}</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Maintenance Alerts' : 'メンテナンスアラート'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const StatusIcon = getStatusIcon(alert.status);
              return (
                <div key={alert.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${
                        alert.priority === 'critical' ? 'bg-red-100' : 
                        alert.priority === 'high' ? 'bg-amber-100' : 'bg-slate-100'
                      }`}>
                        <StatusIcon className={`w-4 h-4 ${getStatusColor(alert.status)}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-slate-800">{alert.machineName}</h3>
                          <Badge variant={getPriorityColor(alert.priority)}>
                            {alert.priority}
                          </Badge>
                        </div>
                        
                        <p className="text-slate-600 mb-2">{alert.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{alert.machineLocation.city}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{alert.assignedUserName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{new Date(alert.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {language === 'en' ? 'Update' : '更新'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Machines Needing Maintenance */}
      {machinesNeedingMaintenance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Machines Requiring Attention' : '注意が必要な機械'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {machinesNeedingMaintenance.map((machine) => (
                <div key={machine.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-800">{machine.name}</h4>
                    <Badge variant={machine.status === 'offline' ? 'destructive' : 'secondary'}>
                      {machine.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Uptime:' : '稼働率:'}</span>
                      <span>{machine.uptime.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Last Maintenance:' : '最終メンテナンス:'}</span>
                      <span>{new Date(machine.lastMaintenance).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Stock Level:' : '在庫レベル:'}</span>
                      <span>{machine.stockLevel}%</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    {language === 'en' ? 'Schedule Maintenance' : 'メンテナンス予約'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Maintenance;