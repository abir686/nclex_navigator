import React from 'react';
import Icon from '../../../components/AppIcon';

const ConfidenceMeter = ({ confidenceScore, selfAssessment, practiceScore, predictedReadiness }) => {
  const getConfidenceLevel = (score) => {
    if (score >= 85) return { level: 'Excellent', color: 'var(--color-confidence-green)', icon: 'TrendingUp' };
    if (score >= 70) return { level: 'Good', color: 'var(--color-primary)', icon: 'ArrowUp' };
    if (score >= 55) return { level: 'Fair', color: 'var(--color-encouragement-amber)', icon: 'Minus' };
    return { level: 'Needs Work', color: 'var(--color-error)', icon: 'TrendingDown' };
  };

  const confidence = getConfidenceLevel(confidenceScore);
  const circumference = 2 * Math.PI * 50;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (confidenceScore / 100) * circumference;

  return (
    <div className="card-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-medical-authority">Confidence Meter</h3>
          <p className="text-sm text-text-secondary">NCLEX readiness prediction</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI Powered</span>
        </div>
      </div>
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--color-muted)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke={confidence?.color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-2000 ease-out"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="confidenceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-medical-navy)" />
                <stop offset="100%" stopColor={confidence?.color} />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-medical-authority mb-1">{confidenceScore}</div>
            <div className="text-sm font-medium" style={{ color: confidence?.color }}>
              {confidence?.level}
            </div>
            <Icon name={confidence?.icon} size={20} style={{ color: confidence?.color }} className="mt-1" />
          </div>
        </div>
      </div>
      {/* Breakdown Components */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="User" size={24} className="text-primary mx-auto mb-2" />
          <div className="text-lg font-bold text-medical-authority">{selfAssessment}%</div>
          <div className="text-xs text-text-secondary">Self Assessment</div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <Icon name="Target" size={24} className="text-confidence-green mx-auto mb-2" />
          <div className="text-lg font-bold text-medical-authority">{practiceScore}%</div>
          <div className="text-xs text-text-secondary">Practice Score</div>
        </div>
      </div>
      {/* Readiness Prediction */}
      <div className="bg-gradient-to-r from-primary/5 to-confidence-green/5 rounded-lg p-4 border border-primary/20 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <Icon name="Crystal" size={20} className="text-primary" />
          <h4 className="font-medium text-medical-authority">Readiness Prediction</h4>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Based on current performance trends</p>
            <p className="text-lg font-semibold text-primary">{predictedReadiness}% likely to pass</p>
          </div>
          <div className="text-right">
            <Icon name="TrendingUp" size={32} className="text-confidence-green" />
          </div>
        </div>
      </div>
      {/* Confidence Factors */}
      <div className="space-y-3">
        <h4 className="font-medium text-medical-authority text-sm">Confidence Factors</h4>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="BookOpen" size={16} className="text-primary" />
            <span className="text-text-secondary">Study Consistency</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-muted rounded-full h-2">
              <div className="w-4/5 h-2 bg-confidence-green rounded-full"></div>
            </div>
            <span className="font-medium text-confidence-green">85%</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-text-secondary">Question Accuracy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-muted rounded-full h-2">
              <div className="w-3/4 h-2 bg-primary rounded-full"></div>
            </div>
            <span className="font-medium text-primary">78%</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-text-secondary">Time Management</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-16 bg-muted rounded-full h-2">
              <div className="w-3/5 h-2 bg-encouragement-amber rounded-full"></div>
            </div>
            <span className="font-medium text-encouragement-amber">65%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceMeter;