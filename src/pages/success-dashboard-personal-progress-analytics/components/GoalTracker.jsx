import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GoalTracker = ({ goals, onUpdateGoal }) => {
  const [activeTab, setActiveTab] = useState('daily');

  const getGoalsByType = (type) => {
    return goals?.filter(goal => goal?.type === type);
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'var(--color-confidence-green)';
    if (progress >= 75) return 'var(--color-primary)';
    if (progress >= 50) return 'var(--color-encouragement-amber)';
    return 'var(--color-error)';
  };

  const getStatusIcon = (progress) => {
    if (progress >= 100) return 'CheckCircle';
    if (progress >= 75) return 'Clock';
    return 'AlertCircle';
  };

  const tabs = [
    { id: 'daily', label: 'Daily', icon: 'Sun' },
    { id: 'weekly', label: 'Weekly', icon: 'Calendar' },
    { id: 'monthly', label: 'Monthly', icon: 'CalendarDays' }
  ];

  return (
    <div className="card-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-medical-authority">Goal Tracker</h3>
          <p className="text-sm text-text-secondary">Track your study objectives</p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Add Goal
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-card text-primary shadow-subtle'
                : 'text-text-secondary hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Goals List */}
      <div className="space-y-4 mb-6">
        {getGoalsByType(activeTab)?.map((goal) => (
          <div key={goal?.id} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <Icon 
                  name={getStatusIcon(goal?.progress)} 
                  size={20} 
                  style={{ color: getProgressColor(goal?.progress) }}
                />
                <div>
                  <h4 className="font-medium text-medical-authority">{goal?.title}</h4>
                  <p className="text-sm text-text-secondary">{goal?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold" style={{ color: getProgressColor(goal?.progress) }}>
                  {goal?.current}/{goal?.target}
                </div>
                <div className="text-xs text-text-secondary">{goal?.unit}</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">Progress</span>
                <span className="font-medium">{goal?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(goal?.progress, 100)}%`,
                    backgroundColor: getProgressColor(goal?.progress)
                  }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>Started: {goal?.startDate}</span>
              <span>Due: {goal?.dueDate}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-confidence-green">
            {goals?.filter(g => g?.progress >= 100)?.length}
          </div>
          <div className="text-xs text-text-secondary">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {goals?.filter(g => g?.progress > 0 && g?.progress < 100)?.length}
          </div>
          <div className="text-xs text-text-secondary">In Progress</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {Math.round(goals?.reduce((acc, goal) => acc + goal?.progress, 0) / goals?.length)}%
          </div>
          <div className="text-xs text-text-secondary">Avg Progress</div>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;