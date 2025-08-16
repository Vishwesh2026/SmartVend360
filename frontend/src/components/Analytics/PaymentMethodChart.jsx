import React from 'react';

const PaymentMethodChart = ({ data, language }) => {
  const colors = ['#1e40af', '#0891b2', '#10b981', '#f59e0b'];
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  
  return (
    <div className="w-full">
      {/* Donut Chart */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
          {Object.entries(data).map(([method, percentage], index) => {
            const radius = 30;
            const circumference = 2 * Math.PI * radius;
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const previousPercentages = Object.values(data).slice(0, index).reduce((sum, val) => sum + val, 0);
            const strokeDashoffset = -((previousPercentages / 100) * circumference);
            
            return (
              <circle
                key={method}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={colors[index]}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 hover:stroke-width-10"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">100%</div>
            <div className="text-xs text-slate-500">
              {language === 'en' ? 'Total' : '合計'}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {Object.entries(data).map(([method, percentage], index) => (
          <div key={method} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              ></div>
              <span className="text-sm text-slate-700">{method}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-slate-800">{percentage}%</div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Insights */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <div className="text-xs text-blue-800 font-medium mb-1">
          {language === 'en' ? 'Popular Payment Method' : '人気の支払い方法'}
        </div>
        <div className="text-sm text-blue-700">
          {Object.entries(data).reduce((a, b) => data[a[0]] > data[b[0]] ? a : b)[0]} 
          ({Object.entries(data).reduce((a, b) => data[a[0]] > data[b[0]] ? a : b)[1]}%)
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodChart;