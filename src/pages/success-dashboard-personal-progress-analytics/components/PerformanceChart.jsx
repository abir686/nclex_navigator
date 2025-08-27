import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';


const PerformanceChart = ({ performanceData, chartType = 'line' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-medical">
          <p className="text-sm font-medium text-medical-authority">{`Date: ${label}`}</p>
          <p className="text-sm text-confidence-green">
            {`Accuracy: ${payload?.[0]?.value}%`}
          </p>
          {payload?.[1] && (
            <p className="text-sm text-primary">
              {`Questions: ${payload?.[1]?.value}`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-medical-authority">Performance Trends</h3>
          <p className="text-sm text-text-secondary">Last 30 days accuracy and volume</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-3 h-3 bg-confidence-green rounded-full"></div>
            <span className="text-text-secondary">Accuracy</span>
          </div>
          <div className="flex items-center space-x-1 text-xs">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-text-secondary">Questions</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-confidence-green)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-confidence-green)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="var(--color-confidence-green)"
                fillOpacity={1}
                fill="url(#accuracyGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          ) : (
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="left"
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="accuracy"
                stroke="var(--color-confidence-green)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-confidence-green)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-confidence-green)', strokeWidth: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="questionsAnswered"
                stroke="var(--color-primary)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-confidence-green">87%</div>
          <div className="text-xs text-text-secondary">Avg Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">1,247</div>
          <div className="text-xs text-text-secondary">Total Questions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">23</div>
          <div className="text-xs text-text-secondary">Study Days</div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;