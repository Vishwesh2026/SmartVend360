import React from 'react';

const RevenueChart = ({ data, selectedCountry, formatCurrency }) => {
  // Mock chart implementation since we can't install Chart.js in this demo
  const maxValue = Math.max(...data.map(d => Math.max(d.India, d.Japan)));
  
  return (
    <div className="w-full h-64 p-4">
      <div className="flex items-end justify-between h-48 space-x-2">
        {data.map((item, index) => {
          const value = selectedCountry === 'India' ? item.India : item.Japan;
          const height = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="relative w-full bg-slate-100 rounded-t-lg overflow-hidden" style={{ height: '12rem' }}>
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-teal-600 transition-all duration-500 hover:from-blue-700 hover:to-teal-700"
                  style={{ height: `${height}%` }}
                ></div>
                {/* Value tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                  {formatCurrency(value)}
                </div>
              </div>
              <div className="text-xs text-slate-600 text-center">
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Chart Legend */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-teal-600 rounded"></div>
            <span className="text-sm text-slate-600">{selectedCountry} Revenue</span>
          </div>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="mt-4 p-3 bg-slate-50 rounded-lg">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">7-day trend:</span>
          <span className="font-medium text-green-600">+15.2% ↗</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;