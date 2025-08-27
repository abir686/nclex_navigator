import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingProgressTracker = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dailyGoal] = useState(4); // hours
  const [currentProgress] = useState(2.5); // hours
  const [streak] = useState(7); // days

  const progressPercentage = Math.min((currentProgress / dailyGoal) * 100, 100);

  const achievements = [
    { id: 1, title: 'First Study Session', icon: 'BookOpen', completed: true },
    { id: 2, title: '7-Day Streak', icon: 'Flame', completed: true },
    { id: 3, title: 'Quiz Master', icon: 'Trophy', completed: false },
    { id: 4, title: 'Case Study Expert', icon: 'Award', completed: false }
  ];

  const todayStats = {
    studyTime: '2h 30m',
    topicsCompleted: 3,
    questionsAnswered: 45,
    accuracy: 87
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsExpanded(true)}
          className="w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-elevation hover:shadow-medical transition-all duration-300 hover:scale-105 flex items-center justify-center"
        >
          <div className="relative">
            <Icon name="Target" size={24} />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{Math.round(progressPercentage)}%</span>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-30">
      <div className="w-80 bg-card border border-border rounded-xl shadow-elevation">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Target" size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Daily Progress</h3>
                <p className="text-xs text-muted-foreground">August 27, 2025</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="p-4">
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${progressPercentage * 2.51} 251`}
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">
                    {currentProgress}h
                  </div>
                  <div className="text-xs text-muted-foreground">
                    of {dailyGoal}h
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Flame" size={20} className="text-accent" />
            <span className="font-semibold text-foreground">{streak} day streak!</span>
          </div>

          {/* Today's Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-foreground">{todayStats?.topicsCompleted}</div>
              <div className="text-xs text-muted-foreground">Topics</div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="text-sm font-semibold text-foreground">{todayStats?.questionsAnswered}</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-success/10 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Accuracy Rate</span>
              <span className="text-sm font-bold text-success">{todayStats?.accuracy}%</span>
            </div>
            <div className="w-full bg-success/20 rounded-full h-2 mt-2">
              <div 
                className="h-2 bg-success rounded-full transition-all duration-1000"
                style={{ width: `${todayStats?.accuracy}%` }}
              />
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Recent Achievements</h4>
            {achievements?.slice(0, 2)?.map((achievement) => (
              <div key={achievement?.id} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  achievement?.completed ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={achievement?.icon} size={12} />
                </div>
                <span className={`text-sm ${
                  achievement?.completed ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {achievement?.title}
                </span>
                {achievement?.completed && (
                  <Icon name="Check" size={14} className="text-success ml-auto" />
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            <Button variant="default" size="sm" className="flex-1">
              <Icon name="Play" size={14} className="mr-2" />
              Continue
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="BarChart3" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingProgressTracker;