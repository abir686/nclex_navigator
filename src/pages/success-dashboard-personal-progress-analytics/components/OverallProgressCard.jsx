import React from 'react';
import Icon from '../../../components/AppIcon';

const OverallProgressCard = ({ overallProgress, testDate, daysRemaining }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="card-medical p-8 text-center">
      <div className="relative inline-block mb-6">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="var(--color-muted)"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-medical-navy)" />
              <stop offset="100%" stopColor="var(--color-confidence-green)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div>
            <div className="text-3xl font-bold text-medical-authority">{overallProgress}%</div>
            <div className="text-sm text-text-secondary">Ready</div>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-medical-authority mb-2">NCLEX Readiness</h3>
      <p className="text-text-secondary mb-4">Overall preparation progress</p>
      
      <div className="flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-primary" />
          <span className="text-text-secondary">Test Date: {testDate}</span>
        </div>
        <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-accent" />
          <span className="text-text-secondary">{daysRemaining} days left</span>
        </div>
      </div>
    </div>
  );
};

export default OverallProgressCard;