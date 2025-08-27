import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineView = ({ studyPlan, onTaskClick, onMilestoneClick }) => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const getWeekData = (weekNumber) => {
    if (!studyPlan?.timeline) return null;
    return studyPlan?.timeline?.find(week => week?.week === weekNumber);
  };

  const getMilestoneIcon = (type) => {
    switch (type) {
      case 'assessment': return 'CheckCircle';
      case 'review': return 'RotateCcw';
      case 'practice': return 'FileText';
      case 'milestone': return 'Flag';
      default: return 'Circle';
    }
  };

  const getMilestoneColor = (type, completed) => {
    if (completed) return 'text-success bg-success/10 border-success/20';
    
    switch (type) {
      case 'assessment': return 'text-error bg-error/10 border-error/20';
      case 'review': return 'text-accent bg-accent/10 border-accent/20';
      case 'practice': return 'text-primary bg-primary/10 border-primary/20';
      case 'milestone': return 'text-purple-600 bg-purple-100 border-purple-200';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getTaskTypeColor = (type) => {
    switch (type) {
      case 'content-review': return 'bg-blue-500';
      case 'practice-questions': return 'bg-green-500';
      case 'weak-area-focus': return 'bg-orange-500';
      case 'review-session': return 'bg-purple-500';
      case 'assessment': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const currentWeekData = getWeekData(selectedWeek);
  const totalWeeks = studyPlan?.duration ? parseInt(studyPlan?.duration?.split(' ')?.[0]) : 12;

  const milestones = [
    { week: 2, type: 'assessment', title: 'Initial Assessment', completed: true, date: '2025-08-30' },
    { week: 4, type: 'milestone', title: 'Foundation Complete', completed: true, date: '2025-09-13' },
    { week: 6, type: 'practice', title: 'Mid-Point Practice Test', completed: false, date: '2025-09-27' },
    { week: 8, type: 'review', title: 'Comprehensive Review', completed: false, date: '2025-10-11' },
    { week: 10, type: 'assessment', title: 'Pre-Final Assessment', completed: false, date: '2025-10-25' },
    { week: 12, type: 'milestone', title: 'NCLEX Ready!', completed: false, date: '2025-11-08' }
  ];

  return (
    <div className="bg-card rounded-xl border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-medical-authority">Study Timeline</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">Week</span>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e?.target?.value))}
              className="px-3 py-1 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {Array.from({ length: totalWeeks }, (_, i) => i + 1)?.map(week => (
                <option key={week} value={week}>Week {week}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-text-secondary mb-2">
            <span>Progress</span>
            <span>{Math.round((selectedWeek / totalWeeks) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-confidence h-2 rounded-full transition-all duration-500"
              style={{ width: `${(selectedWeek / totalWeeks) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline Visualization */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
              
              {/* Milestones */}
              <div className="space-y-8">
                {milestones?.map((milestone, index) => (
                  <div key={index} className="relative flex items-start space-x-4">
                    {/* Milestone Marker */}
                    <div className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 ${getMilestoneColor(milestone?.type, milestone?.completed)}`}
                         onClick={() => onMilestoneClick(milestone)}>
                      <Icon name={getMilestoneIcon(milestone?.type)} size={20} />
                      {milestone?.completed && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                          <Icon name="Check" size={12} color="white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    
                    {/* Milestone Content */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{milestone?.title}</h4>
                          <span className="text-xs text-text-secondary">Week {milestone?.week}</span>
                        </div>
                        <p className="text-sm text-text-secondary mb-2">
                          Target Date: {new Date(milestone.date)?.toLocaleDateString()}
                        </p>
                        {milestone?.completed && (
                          <div className="flex items-center space-x-1 text-success">
                            <Icon name="Check" size={12} />
                            <span className="text-xs font-medium">Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Week Details */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-4">Week {selectedWeek} Details</h4>
              
              {currentWeekData ? (
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Focus Area</h5>
                    <p className="text-sm text-text-secondary">{currentWeekData?.focus}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Daily Tasks</h5>
                    <div className="space-y-2">
                      {currentWeekData?.tasks?.map((task, index) => (
                        <div key={index} 
                             className="flex items-center space-x-2 p-2 bg-card rounded border border-border cursor-pointer hover:bg-muted/50 transition-colors"
                             onClick={() => onTaskClick(task)}>
                          <div className={`w-2 h-2 rounded-full ${getTaskTypeColor(task?.type)}`} />
                          <span className="text-sm text-foreground flex-1">{task?.title}</span>
                          <span className="text-xs text-text-secondary">{task?.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Goals</h5>
                    <ul className="space-y-1">
                      {currentWeekData?.goals?.map((goal, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Target" size={12} className="text-primary mt-0.5" />
                          <span className="text-xs text-text-secondary">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="Calendar" size={32} className="mx-auto mb-2 text-text-secondary" />
                  <p className="text-sm text-text-secondary">Week details will be available once you start your plan</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 space-y-3">
              <Button variant="outline" fullWidth>
                <Icon name="Calendar" size={16} className="mr-2" />
                Add to Calendar
              </Button>
              <Button variant="outline" fullWidth>
                <Icon name="Download" size={16} className="mr-2" />
                Export Timeline
              </Button>
              <Button variant="default" fullWidth className="btn-medical-primary">
                <Icon name="Play" size={16} className="mr-2" />
                Start Week {selectedWeek}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineView;