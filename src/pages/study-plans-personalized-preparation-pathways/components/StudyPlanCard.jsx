import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyPlanCard = ({ plan, isSelected, onSelect, onCustomize }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10 border-success/20';
      case 'Intermediate': return 'text-accent bg-accent/10 border-accent/20';
      case 'Advanced': return 'text-error bg-error/10 border-error/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getIntensityIcon = (intensity) => {
    switch (intensity) {
      case 'Light': return 'Sun';
      case 'Moderate': return 'CloudSun';
      case 'Intensive': return 'Zap';
      case 'Full-time': return 'Flame';
      default: return 'Circle';
    }
  };

  return (
    <div className={`card-medical p-6 transition-all duration-300 cursor-pointer ${
      isSelected ? 'ring-2 ring-primary shadow-medical' : 'hover:shadow-medical'
    }`} onClick={onSelect}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-medical-authority">{plan?.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(plan?.difficulty)}`}>
              {plan?.difficulty}
            </span>
          </div>
          <p className="text-text-secondary mb-3">{plan?.description}</p>
        </div>
        {isSelected && (
          <div className="ml-4">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Check" size={14} color="white" strokeWidth={3} />
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} className="text-primary" />
          <div>
            <div className="text-sm font-medium text-foreground">{plan?.duration}</div>
            <div className="text-xs text-text-secondary">Duration</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-primary" />
          <div>
            <div className="text-sm font-medium text-foreground">{plan?.dailyTime}</div>
            <div className="text-xs text-text-secondary">Daily Time</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name={getIntensityIcon(plan?.intensity)} size={16} className="text-primary" />
          <div>
            <div className="text-sm font-medium text-foreground">{plan?.intensity}</div>
            <div className="text-xs text-text-secondary">Intensity</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-primary" />
          <div>
            <div className="text-sm font-medium text-foreground">{plan?.successRate}%</div>
            <div className="text-xs text-text-secondary">Success Rate</div>
          </div>
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-semibold text-foreground">What's Included:</h4>
        <div className="grid grid-cols-1 gap-2">
          {plan?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={14} className="text-success" strokeWidth={2} />
              <span className="text-sm text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-semibold text-foreground">Weekly Breakdown:</h4>
        <div className="space-y-2">
          {plan?.weeklyBreakdown?.map((week, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
              <span className="text-sm text-foreground">Week {week?.week}</span>
              <span className="text-xs text-text-secondary">{week?.focus}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-3">
        <Button
          variant={isSelected ? "default" : "outline"}
          fullWidth
          className={isSelected ? "btn-medical-primary" : ""}
          onClick={(e) => {
            e?.stopPropagation();
            onSelect();
          }}
        >
          {isSelected ? (
            <>
              <Icon name="Check" size={16} className="mr-2" />
              Selected
            </>
          ) : (
            'Select Plan'
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e?.stopPropagation();
            onCustomize(plan);
          }}
        >
          <Icon name="Settings" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default StudyPlanCard;