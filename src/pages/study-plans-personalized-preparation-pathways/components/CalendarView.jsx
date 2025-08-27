import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarView = ({ studyPlan, onTaskComplete, onTaskEdit }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getTasksForDate = (date) => {
    if (!date || !studyPlan?.schedule) return [];
    
    const dateString = date?.toISOString()?.split('T')?.[0];
    return studyPlan?.schedule?.filter(task => task?.date === dateString);
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

  const getTaskTypeIcon = (type) => {
    switch (type) {
      case 'content-review': return 'BookOpen';
      case 'practice-questions': return 'FileText';
      case 'weak-area-focus': return 'Target';
      case 'review-session': return 'RotateCcw';
      case 'assessment': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
           date?.getDate() === today?.getDate() &&
           date?.getMonth() === today?.getMonth() &&
           date?.getFullYear() === today?.getFullYear();
  };

  const isSelected = (date) => {
    return date && 
           date?.getDate() === selectedDate?.getDate() &&
           date?.getMonth() === selectedDate?.getMonth() &&
           date?.getFullYear() === selectedDate?.getFullYear();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setMonth(currentDate?.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentDate);
  const selectedTasks = getTasksForDate(selectedDate);

  return (
    <div className="bg-card rounded-xl border border-border shadow-subtle">
      {/* Calendar Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-medical-authority">Study Calendar</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <span className="text-lg font-medium text-foreground min-w-[140px] text-center">
              {monthNames?.[currentDate?.getMonth()]} {currentDate?.getFullYear()}
            </span>
            <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-text-secondary">Content Review</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-text-secondary">Practice Questions</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-text-secondary">Weak Area Focus</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-text-secondary">Review Session</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames?.map(day => (
                <div key={day} className="p-2 text-center text-sm font-medium text-text-secondary">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days?.map((date, index) => {
                const tasks = getTasksForDate(date);
                const hasActivities = tasks?.length > 0;
                
                return (
                  <div
                    key={index}
                    className={`min-h-[80px] p-1 border border-border rounded-lg cursor-pointer transition-all duration-200 ${
                      date ? 'hover:bg-muted/50' : ''
                    } ${
                      isToday(date) ? 'bg-primary/10 border-primary/30' : ''
                    } ${
                      isSelected(date) ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => date && setSelectedDate(date)}
                  >
                    {date && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${
                          isToday(date) ? 'text-primary' : 'text-foreground'
                        }`}>
                          {date?.getDate()}
                        </div>
                        {hasActivities && (
                          <div className="space-y-1">
                            {tasks?.slice(0, 2)?.map((task, taskIndex) => (
                              <div
                                key={taskIndex}
                                className={`w-full h-1.5 rounded-full ${getTaskTypeColor(task?.type)}`}
                              />
                            ))}
                            {tasks?.length > 2 && (
                              <div className="text-xs text-text-secondary">+{tasks?.length - 2}</div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Date Tasks */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">
                {selectedDate?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
              
              {selectedTasks?.length > 0 ? (
                <div className="space-y-3">
                  {selectedTasks?.map((task, index) => (
                    <div key={index} className="bg-card p-3 rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon 
                            name={getTaskTypeIcon(task?.type)} 
                            size={16} 
                            className="text-primary" 
                          />
                          <span className="text-sm font-medium text-foreground">{task?.title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onTaskEdit(task)}
                        >
                          <Icon name="Edit2" size={12} />
                        </Button>
                      </div>
                      
                      <p className="text-xs text-text-secondary mb-2">{task?.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-text-secondary">
                          <Icon name="Clock" size={12} />
                          <span>{task?.estimatedTime}</span>
                          <span className="text-accent">•</span>
                          <span className="capitalize">{task?.difficulty}</span>
                        </div>
                        
                        <Button
                          variant={task?.completed ? "success" : "outline"}
                          size="sm"
                          onClick={() => onTaskComplete(task?.id)}
                        >
                          {task?.completed ? (
                            <Icon name="Check" size={12} />
                          ) : (
                            <Icon name="Circle" size={12} />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="Calendar" size={32} className="mx-auto mb-2 text-text-secondary" />
                  <p className="text-sm text-text-secondary">No activities scheduled for this day</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;