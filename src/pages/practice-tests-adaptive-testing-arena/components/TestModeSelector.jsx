import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestModeSelector = ({ selectedMode, onModeSelect, onStartTest }) => {
  const testModes = [
    {
      id: 'tutor',
      name: 'Tutor Mode',
      description: 'Get immediate feedback after each question with detailed explanations',
      icon: 'GraduationCap',
      features: ['Immediate feedback', 'Detailed rationales', 'Study links', 'No time pressure'],
      recommended: 'For learning',
      color: 'bg-success/10 border-success/20 text-success'
    },
    {
      id: 'timed',
      name: 'Timed Practice',
      description: 'Simulate real NCLEX conditions with time constraints and adaptive difficulty',
      icon: 'Clock',
      features: ['Timed questions', 'Adaptive difficulty', 'Real exam feel', 'Performance tracking'],
      recommended: 'For exam prep',
      color: 'bg-primary/10 border-primary/20 text-primary'
    },
    {
      id: 'custom',
      name: 'Custom Quiz',
      description: 'Focus on specific nursing categories and difficulty levels',
      icon: 'Settings',
      features: ['Choose topics', 'Set difficulty', 'Custom length', 'Targeted practice'],
      recommended: 'For weak areas',
      color: 'bg-accent/10 border-accent/20 text-accent'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-medical-authority mb-2">Choose Your Testing Mode</h2>
        <p className="text-text-secondary">Select the practice mode that best fits your current preparation needs</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testModes?.map((mode) => (
          <div
            key={mode?.id}
            className={`card-medical p-6 cursor-pointer transition-all duration-300 hover:shadow-medical ${
              selectedMode === mode?.id ? 'ring-2 ring-primary shadow-medical' : ''
            }`}
            onClick={() => onModeSelect(mode?.id)}
          >
            <div className="text-center mb-4">
              <div className={`w-16 h-16 mx-auto rounded-full ${mode?.color} flex items-center justify-center mb-3`}>
                <Icon name={mode?.icon} size={32} />
              </div>
              <h3 className="text-lg font-semibold text-medical-authority mb-1">{mode?.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${mode?.color} font-medium`}>
                {mode?.recommended}
              </span>
            </div>

            <p className="text-sm text-text-secondary mb-4 text-center">{mode?.description}</p>

            <div className="space-y-2">
              {mode?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-xs text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>

            {selectedMode === mode?.id && (
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="default"
                  fullWidth
                  onClick={onStartTest}
                  className="btn-medical-primary"
                >
                  <Icon name="Play" size={16} className="mr-2" />
                  Start {mode?.name}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-medical-authority mb-1">Pro Tip</h4>
            <p className="text-sm text-text-secondary">
              Start with Tutor Mode to build confidence, then progress to Timed Practice as your exam date approaches. 
              Use Custom Quiz to target specific weak areas identified in your performance analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestModeSelector;