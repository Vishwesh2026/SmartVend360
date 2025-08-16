import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Search, 
  Filter, 
  AlertCircle, 
  Package, 
  TrendingUp,
  RefreshCcw
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { mockMachines, mockProducts, currencyRates } from '../../mock/mockData';

const Inventory = () => {
  const { selectedCountry, language } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  // Filter machines by country
  const filteredMachines = mockMachines.filter(machine => machine.location.country === selectedCountry);

  // Generate mock inventory data for each machine
  const getInventoryData = () => {
    return filteredMachines.map(machine => ({
      ...machine,
      inventory: mockProducts.map(product => ({
        ...product,
        currentStock: Math.floor(Math.random() * 50) + 5,
        maxCapacity: 60,
        reorderLevel: 15,
        lastRestocked: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      }))
    }));
  };

  const inventoryData = getInventoryData();

  // Filter inventory items
  const getFilteredInventory = () => {
    let items = [];
    
    inventoryData.forEach(machine => {
      if (selectedMachine === 'all' || machine.id === selectedMachine) {
        machine.inventory.forEach(item => {
          const stockLevel = (item.currentStock / item.maxCapacity) * 100;
          const includeByStock = 
            stockFilter === 'all' ||
            (stockFilter === 'low' && stockLevel <= 30) ||
            (stockFilter === 'critical' && stockLevel <= 15) ||
            (stockFilter === 'normal' && stockLevel > 30);

          const includeBySearch = 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            machine.name.toLowerCase().includes(searchTerm.toLowerCase());

          if (includeByStock && includeBySearch) {
            items.push({
              ...item,
              machineId: machine.id,
              machineName: machine.name,
              stockLevel: stockLevel
            });
          }
        });
      }
    });

    return items;
  };

  const filteredItems = getFilteredInventory();

  // Calculate summary stats
  const lowStockItems = filteredItems.filter(item => item.stockLevel <= 30).length;
  const criticalItems = filteredItems.filter(item => item.stockLevel <= 15).length;
  const totalItems = filteredItems.length;

  const formatCurrency = (amount) => {
    if (selectedCountry === 'India') {
      return `₹${amount.toLocaleString()}`;
    } else {
      const convertedAmount = Math.round(amount * currencyRates.INR_TO_JPY);
      return `¥${convertedAmount.toLocaleString()}`;
    }
  };

  const getStockLevelColor = (level) => {
    if (level <= 15) return 'bg-red-500';
    if (level <= 30) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getStockLevelText = (level) => {
    if (level <= 15) return language === 'en' ? 'Critical' : '危険';
    if (level <= 30) return language === 'en' ? 'Low' : '低在庫';
    return language === 'en' ? 'Normal' : '正常';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            {language === 'en' ? 'Inventory Management' : '在庫管理'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {language === 'en' 
              ? `${selectedCountry} - ${filteredMachines.length} Machines` 
              : `${selectedCountry} - ${filteredMachines.length}台の自動販売機`
            }
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <RefreshCcw className="w-4 h-4" />
          <span>{language === 'en' ? 'Auto Restock' : '自動補充'}</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {language === 'en' ? 'Total Items' : '総アイテム数'}
            </CardTitle>
            <Package className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800 dark:text-white">{totalItems}</div>
            <p className="text-xs text-slate-600 mt-1">
              {language === 'en' ? 'Across all machines' : '全機械合計'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {language === 'en' ? 'Low Stock' : '低在庫'}
            </CardTitle>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{lowStockItems}</div>
            <p className="text-xs text-slate-600 mt-1">
              {language === 'en' ? 'Need attention' : '注意が必要'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {language === 'en' ? 'Critical Stock' : '危険在庫'}
            </CardTitle>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalItems}</div>
            <p className="text-xs text-slate-600 mt-1">
              {language === 'en' ? 'Immediate action' : '即座の対応'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder={language === 'en' ? 'Search products or machines...' : '商品または機械を検索...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Machine Filter */}
            <select
              value={selectedMachine}
              onChange={(e) => setSelectedMachine(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">
                {language === 'en' ? 'All Machines' : '全ての機械'}
              </option>
              {filteredMachines.map(machine => (
                <option key={machine.id} value={machine.id}>
                  {machine.name}
                </option>
              ))}
            </select>

            {/* Stock Filter */}
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
            >
              <option value="all">{language === 'en' ? 'All Stock Levels' : '全在庫レベル'}</option>
              <option value="critical">{language === 'en' ? 'Critical' : '危険'}</option>
              <option value="low">{language === 'en' ? 'Low' : '低在庫'}</option>
              <option value="normal">{language === 'en' ? 'Normal' : '正常'}</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'en' ? 'Inventory Details' : '在庫詳細'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Product' : '商品'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Machine' : '機械'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Stock Level' : '在庫レベル'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Price' : '価格'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Popularity' : '人気度'}
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-600">
                    {language === 'en' ? 'Actions' : 'アクション'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={`${item.machineId}-${item.id}`} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-slate-800">{item.name}</div>
                        <div className="text-sm text-slate-500">{item.category}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-slate-600">{item.machineName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.currentStock}/{item.maxCapacity}</span>
                            <span>{Math.round(item.stockLevel)}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getStockLevelColor(item.stockLevel)}`}
                              style={{ width: `${item.stockLevel}%` }}
                            ></div>
                          </div>
                        </div>
                        <Badge 
                          variant={item.stockLevel <= 15 ? 'destructive' : item.stockLevel <= 30 ? 'secondary' : 'default'}
                        >
                          {getStockLevelText(item.stockLevel)}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">
                        {formatCurrency(item.price[selectedCountry === 'India' ? 'INR' : 'JPY'])}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{item.popularity}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline">
                        {language === 'en' ? 'Restock' : '補充'}
                      </Button>
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

export default Inventory;