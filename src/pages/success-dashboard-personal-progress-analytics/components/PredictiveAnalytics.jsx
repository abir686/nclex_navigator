import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const PredictiveAnalytics = ({ studyRecommendations, timeEstimates, focusAreas }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-medical">
          <p className="text-sm font-medium text-medical-authority">{label}</p>
          <p className="text-sm text-primary">
            {`Hours needed: ${payload?.[0]?.value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const COLORS = [
    'var(--color-error)',
    'var(--color-warning)',
    'var(--color-primary)',
    'var(--color-confidence-green)'
  ];

  const getRecommendationIcon = (type) => {
    const icons = {
      urgent: 'AlertTriangle',
      important: 'Clock',
      suggested: 'Lightbulb',
      optional: 'Info'
    };
    return icons?.[type] || 'Info';
  };

  const getRecommendationColor = (type) => {
    const colors = {
      urgent: 'text-error',
      important: 'text-warning',
      suggested: 'text-primary',
      optional: 'text-text-secondary'
    };
    return colors?.[type] || 'text-text-secondary';
  };

  return (
    <div className="space-y-6">
      {/* Study Time Predictions */}
      <div className="card-medical p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-medical-authority">Study Time Predictions</h3>
            <p className="text-sm text-text-secondary">AI-powered time estimates by category</p>
          </div>
          <Icon name="Brain" size={20} className="text-primary" />
        </div>

        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeEstimates}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="category" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="hoursNeeded" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-primary">
              {timeEstimates?.reduce((acc, item) => acc + item?.hoursNeeded, 0)}
            </div>
            <div className="text-xs text-text-secondary">Total Hours</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-confidence-green">
              {Math.round(timeEstimates?.reduce((acc, item) => acc + item?.hoursNeeded, 0) / 7)}
            </div>
            <div className="text-xs text-text-secondary">Hours/Week</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-accent">
              {Math.max(...timeEstimates?.map(item => item?.hoursNeeded))}
            </div>
            <div className="text-xs text-text-secondary">Max Category</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-medical-navy">
              {timeEstimates?.length}
            </div>
            <div className="text-xs text-text-secondary">Categories</div>
          </div>
        </div>
      </div>
      {/* Focus Areas Distribution */}
      <div className="card-medical p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-medical-authority">Recommended Focus Areas</h3>
            <p className="text-sm text-text-secondary">Priority distribution for optimal results</p>
          </div>
          <Icon name="Target" size={20} className="text-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={focusAreas}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="percentage"
                >
                  {focusAreas?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Focus Time']}
                  labelFormatter={(label) => `Area: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {focusAreas?.map((area, index) => (
              <div key={area?.area} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-medical-authority">{area?.area}</p>
                    <p className="text-xs text-text-secondary">{area?.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{area?.percentage}%</div>
                  <div className="text-xs text-text-secondary">{area?.hours}h</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* AI Recommendations */}
      <div className="card-medical p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-medical-authority">AI Study Recommendations</h3>
            <p className="text-sm text-text-secondary">Personalized suggestions based on your progress</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Smart Insights</span>
          </div>
        </div>

        <div className="space-y-4">
          {studyRecommendations?.map((recommendation) => (
            <div 
              key={recommendation?.id}
              className="border border-border rounded-lg p-4 hover:shadow-subtle transition-all duration-200"
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name={getRecommendationIcon(recommendation?.priority)} 
                  size={20} 
                  className={getRecommendationColor(recommendation?.priority)}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-medical-authority">{recommendation?.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      recommendation?.priority === 'urgent' ? 'bg-error/10 text-error' :
                      recommendation?.priority === 'important' ? 'bg-warning/10 text-warning' :
                      recommendation?.priority === 'suggested'? 'bg-primary/10 text-primary' : 'bg-muted text-text-secondary'
                    }`}>
                      {recommendation?.priority}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{recommendation?.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <span>Impact: {recommendation?.impact}</span>
                      <span>Time: {recommendation?.timeRequired}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full transition-all duration-500"
                          style={{
                            width: `${recommendation?.confidence}%`,
                            backgroundColor: 'var(--color-confidence-green)'
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-confidence-green">
                        {recommendation?.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;