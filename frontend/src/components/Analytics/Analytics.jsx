import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CreditCard,
  Calendar,
  Download
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { mockMachines, mockAnalytics, currencyRates } from '../../mock/mockData';
import RevenueChart from './RevenueChart';
import PaymentMethodChart from './PaymentMethodChart';

const Analytics = () => {
  const { selectedCountry, language } = useSettings();
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Filter data by selected country
  const filteredMachines = mockMachines.filter(machine => machine.location.country === selectedCountry);
  
  // Calculate analytics for selected country
  const calculateAnalytics = () => {
    const totalRevenue = filteredMachines.reduce((sum, machine) => sum + machine.revenue, 0);
    const totalTransactions = filteredMachines.reduce((sum, machine) => sum + machine.transactions, 0);
    const averageTransactionValue = totalRevenue / totalTransactions;
    const averageUptime = filteredMachines.reduce((sum, machine) => sum + machine.uptime, 0) / filteredMachines.length;

    return {
      totalRevenue,
      totalTransactions,
      averageTransactionValue,
      averageUptime,
      machineCount: filteredMachines.length
    };
  };

  const analytics = calculateAnalytics();

  const formatCurrency = (amount) => {
    if (selectedCountry === 'India') {
      return `₹${amount.toLocaleString()}`;
    } else {
      const convertedAmount = Math.round(amount * currencyRates.INR_TO_JPY);
      return `¥${convertedAmount.toLocaleString()}`;
    }
  };

  // Mock peak hours data
  const peakHours = [
    { hour: '08:00', transactions: 45, label: language === 'en' ? 'Morning Rush' : '朝のラッシュ' },
    { hour: '12:00', transactions: 67, label: language === 'en' ? 'Lunch Peak' : 'ランチピーク' },
    { hour: '15:00', transactions: 38, label: language === 'en' ? 'Afternoon' : '午後' },
    { hour: '18:00', transactions: 72, label: language === 'en' ? 'Evening Peak' : '夕方ピーク' },
    { hour: '21:00', transactions: 28, label: language === 'en' ? 'Night' : '夜' }
  ];

  // Top performing machines
  const topMachines = filteredMachines
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  // Mock location comparison data
  const locationStats = filteredMachines.reduce((acc, machine) => {
    const city = machine.location.city;
    if (!acc[city]) {
      acc[city] = { revenue: 0, transactions: 0, machines: 0 };
    }
    acc[city].revenue += machine.revenue;
    acc[city].transactions += machine.transactions;
    acc[city].machines += 1;
    return acc;
  }, {});

  const kpiCards = [
    {
      title: language === 'en' ? 'Total Revenue' : '総収益',
      value: formatCurrency(analytics.totalRevenue),
      trend: '+15.2%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: language === 'en' ? 'Transactions' : '取引数',
      value: analytics.totalTransactions.toLocaleString(),
      trend: '+8.7%',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: language === 'en' ? 'Avg Transaction' : '平均取引額',
      value: formatCurrency(analytics.averageTransactionValue),
      trend: '+3.1%',
      icon: TrendingUp,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      title: language === 'en' ? 'Avg Uptime' : '平均稼働率',
      value: `${analytics.averageUptime.toFixed(1)}%`,
      trend: '+1.2%',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {language === 'en' ? 'Sales Analytics' : '売上分析'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {language === 'en' 
              ? `${selectedCountry} Operations Analysis` 
              : `${selectedCountry}の運営分析`
            }
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
          >
            <option value="24h">{language === 'en' ? 'Last 24 Hours' : '過去24時間'}</option>
            <option value="7d">{language === 'en' ? 'Last 7 Days' : '過去7日間'}</option>
            <option value="30d">{language === 'en' ? 'Last 30 Days' : '過去30日間'}</option>
            <option value="90d">{language === 'en' ? 'Last 90 Days' : '過去90日間'}</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Export' : 'エクスポート'}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
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
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">{kpi.trend}</span>
                  <span className="text-xs text-slate-500">
                    {language === 'en' ? 'vs last period' : '前期比'}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>
                {language === 'en' ? 'Revenue Trends' : '収益トレンド'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart 
              data={mockAnalytics.revenueData.daily}
              selectedCountry={selectedCountry}
              formatCurrency={formatCurrency}
            />
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>
                {language === 'en' ? 'Payment Methods' : '支払い方法'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentMethodChart 
              data={mockAnalytics.revenueData.paymentMethods[selectedCountry]}
              language={language}
            />
          </CardContent>
        </Card>

        {/* Peak Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>
                {language === 'en' ? 'Peak Hours Analysis' : 'ピーク時間分析'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {peakHours.map((hour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-800">{hour.hour}</div>
                    <div className="text-sm text-slate-500">{hour.label}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(hour.transactions / 72) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-8 text-right">
                      {hour.transactions}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Machines */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Top Performing Machines' : 'トップパフォーマンス機械'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topMachines.map((machine, index) => (
                <div key={machine.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{machine.name}</div>
                      <div className="text-sm text-slate-500">{machine.transactions} transactions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">
                      {formatCurrency(machine.revenue)}
                    </div>
                    <div className="text-sm text-green-600">
                      {machine.uptime.toFixed(1)}% uptime
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Location Performance' : '立地パフォーマンス'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(locationStats).map(([city, stats], index) => (
                <div key={city} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-800">{city}</div>
                    <div className="text-sm text-slate-500">
                      {stats.machines} {language === 'en' ? 'machines' : '台の機械'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-800">
                      {formatCurrency(stats.revenue)}
                    </div>
                    <div className="text-sm text-slate-500">
                      {stats.transactions} {language === 'en' ? 'transactions' : '取引'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;