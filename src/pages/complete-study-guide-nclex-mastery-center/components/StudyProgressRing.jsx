import React from 'react';
import Icon from '../../../components/AppIcon';

const StudyProgressRing = ({ category, progress, estimatedTime, totalTopics, completedTopics }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-success';
    if (progress >= 50) return 'text-accent';
    return 'text-primary';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Safe and Effective Care Environment':
        return 'Shield';
      case 'Health Promotion and Maintenance':
        return 'Heart';
      case 'Psychosocial Integrity':
        return 'Brain';
      case 'Physiological Integrity':
        return 'Activity';
      default:
        return 'BookOpen';
    }
  };

  return (
    <div className="card-medical p-6 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getCategoryIcon(category)} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{category}</h3>
            <p className="text-sm text-muted-foreground">{completedTopics}/{totalTopics} topics completed</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={`${getProgressColor(progress)} transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getProgressColor(progress)}`}>
                {progress}%
              </div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estimated time remaining:</span>
          <span className="font-medium text-foreground">{estimatedTime}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
              progress >= 80 ? 'bg-success' : progress >= 50 ? 'bg-accent' : 'bg-primary'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StudyProgressRing;