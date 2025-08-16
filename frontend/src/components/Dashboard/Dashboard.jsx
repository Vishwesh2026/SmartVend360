import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  TrendingDown,
  Activity, 
  DollarSign, 
  Package, 
  AlertTriangle,
  MapPin,
  Zap
} from 'lucide-react';
import { useSettings } from '../../App';
import { mockMachines, mockTransactions, mockMaintenanceAlerts, currencyRates } from '../../mock/mockData';
import MachineMap from './MachineMap';

const Dashboard = () => {
  const { selectedCountry, language } = useSettings();
  const [realTimeData, setRealTimeData] = useState({});

  // Filter data by selected country
  const filteredMachines = mockMachines.filter(machine => machine.location.country === selectedCountry);
  const totalRevenue = filteredMachines.reduce((sum, machine) => sum + machine.revenue, 0);
  const totalTransactions = filteredMachines.reduce((sum, machine) => sum + machine.transactions, 0);
  const averageUptime = filteredMachines.reduce((sum, machine) => sum + machine.uptime, 0) / filteredMachines.length;

  // Status counts
  const statusCounts = filteredMachines.reduce((acc, machine) => {
    acc[machine.status] = (acc[machine.status] || 0) + 1;
    return acc;
  }, {});

  // Recent transactions
  const recentTransactions = mockTransactions.slice(0, 5);

  // Pending maintenance alerts
  const pendingAlerts = mockMaintenanceAlerts.filter(alert => alert.status === 'pending').length;

  // Convert currency based on country
  const formatCurrency = (amount) => {
    if (selectedCountry === 'India') {
      return `₹${amount.toLocaleString()}`;
    } else {
      const convertedAmount = Math.round(amount * currencyRates.INR_TO_JPY);
      return `¥${convertedAmount.toLocaleString()}`;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        timestamp: new Date().toLocaleTimeString(),
        activeConnections: Math.floor(Math.random() * 5) + filteredMachines.filter(m => m.status === 'active').length
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [filteredMachines]);

  const kpiCards = [
    {
      title: language === 'en' ? 'Total Revenue' : '総収益',
      value: formatCurrency(totalRevenue),
      trend: '+12.3%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: language === 'en' ? 'Transactions' : '取引数',
      value: totalTransactions.toLocaleString(),
      trend: '+8.7%',
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: language === 'en' ? 'Average Uptime' : '平均稼働率',
      value: `${averageUptime.toFixed(1)}%`,
      trend: '+2.1%',
      icon: Zap,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      title: language === 'en' ? 'Maintenance Alerts' : 'メンテナンスアラート',
      value: pendingAlerts.toString(),
      trend: pendingAlerts > 2 ? 'High' : 'Normal',
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {language === 'en' ? 'Dashboard' : 'ダッシュボード'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {language === 'en' 
              ? `${selectedCountry} Operations - ${filteredMachines.length} Machines` 
              : `${selectedCountry}の運営 - ${filteredMachines.length}台の自動販売機`
            }
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-600">
            {language === 'en' ? 'Real-time Status' : 'リアルタイム状況'}
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              {realTimeData.activeConnections || filteredMachines.filter(m => m.status === 'active').length} 
              {language === 'en' ? ' Active' : ' 稼働中'}
            </span>
            <span className="text-xs text-slate-500">
              {realTimeData.timestamp}
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositiveTrend = kpi.trend.includes('+');
          const TrendIcon = isPositiveTrend ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {kpi.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800 dark:text-white">
                  {kpi.value}
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  {typeof kpi.trend === 'string' && kpi.trend.includes('%') && (
                    <TrendIcon className={`w-3 h-3 ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`} />
                  )}
                  <span className={`text-xs ${
                    typeof kpi.trend === 'string' && kpi.trend.includes('%')
                      ? isPositiveTrend ? 'text-green-600' : 'text-red-600'
                      : 'text-slate-600'
                  }`}>
                    {kpi.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>
                  {language === 'en' ? 'Machine Locations' : '自動販売機の場所'}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MachineMap machines={filteredMachines} />
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <div className="space-y-6">
          {/* Machine Status */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Machine Status' : '機械の状況'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(statusCounts).map(([status, count]) => {
                const statusConfig = {
                  active: { label: language === 'en' ? 'Active' : '稼働中', color: 'bg-green-500', textColor: 'text-green-600' },
                  maintenance: { label: language === 'en' ? 'Maintenance' : 'メンテナンス', color: 'bg-amber-500', textColor: 'text-amber-600' },
                  offline: { label: language === 'en' ? 'Offline' : 'オフライン', color: 'bg-red-500', textColor: 'text-red-600' },
                  restocking: { label: language === 'en' ? 'Restocking' : '補充中', color: 'bg-blue-500', textColor: 'text-blue-600' }
                };

                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${statusConfig[status]?.color}`}></div>
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {statusConfig[status]?.label}
                      </span>
                    </div>
                    <Badge variant="secondary" className={statusConfig[status]?.textColor}>
                      {count}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'Recent Transactions' : '最近の取引'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium">{transaction.machineId}</div>
                      <div className="text-slate-500 text-xs">
                        {new Date(transaction.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {transaction.currency === 'INR' ? '₹' : '¥'}{transaction.amount}
                      </div>
                      <div className="text-slate-500 text-xs">
                        {transaction.paymentMethod}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;