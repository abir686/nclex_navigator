import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressDashboard = ({ studyPlan, progressData, onViewDetails }) => {
  const calculateOverallProgress = () => {
    if (!studyPlan?.schedule) return 0;
    const totalTasks = studyPlan?.schedule?.length;
    const completedTasks = studyPlan?.schedule?.filter(task => task?.completed)?.length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const getStreakData = () => {
    return {
      current: progressData?.currentStreak || 0,
      longest: progressData?.longestStreak || 0,
      target: 30
    };
  };

  const getUpcomingTasks = () => {
    if (!studyPlan?.schedule) return [];
    const today = new Date()?.toISOString()?.split('T')?.[0];
    return studyPlan?.schedule?.filter(task => task?.date >= today && !task?.completed)?.slice(0, 5);
  };

  const getOverdueTasks = () => {
    if (!studyPlan?.schedule) return [];
    const today = new Date()?.toISOString()?.split('T')?.[0];
    return studyPlan?.schedule?.filter(task => task?.date < today && !task?.completed);
  };

  const getWeeklyStats = () => {
    return {
      studyHours: progressData?.weeklyStudyHours || 0,
      questionsAnswered: progressData?.weeklyQuestions || 0,
      accuracy: progressData?.weeklyAccuracy || 0,
      topicsCompleted: progressData?.weeklyTopics || 0
    };
  };

  const overallProgress = calculateOverallProgress();
  const streakData = getStreakData();
  const upcomingTasks = getUpcomingTasks();
  const overdueTasks = getOverdueTasks();
  const weeklyStats = getWeeklyStats();

  const achievements = [
    { id: 1, name: 'First Week Complete', icon: 'Calendar', earned: true, date: '2025-08-20' },
    { id: 2, name: '100 Questions Answered', icon: 'FileText', earned: true, date: '2025-08-22' },
    { id: 3, name: '7-Day Streak', icon: 'Flame', earned: true, date: '2025-08-25' },
    { id: 4, name: 'Weak Area Mastery', icon: 'Target', earned: false, date: null },
    { id: 5, name: '30-Day Streak', icon: 'Award', earned: false, date: null }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-card rounded-xl border border-border shadow-subtle p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-medical-authority">Study Progress</h3>
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            <Icon name="BarChart3" size={16} className="mr-2" />
            View Details
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Overall Progress Circle */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${overallProgress * 2.51} 251`}
                  className="text-primary transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{overallProgress}%</span>
              </div>
            </div>
            <div className="text-sm font-medium text-foreground">Overall Progress</div>
            <div className="text-xs text-text-secondary">
              {studyPlan?.schedule?.filter(t => t?.completed)?.length || 0} of {studyPlan?.schedule?.length || 0} tasks
            </div>
          </div>

          {/* Current Streak */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <Icon name="Flame" size={24} color="white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{streakData?.current}</div>
            <div className="text-sm font-medium text-foreground">Day Streak</div>
            <div className="text-xs text-text-secondary">Best: {streakData?.longest} days</div>
          </div>

          {/* Weekly Study Hours */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <Icon name="Clock" size={24} color="white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{weeklyStats?.studyHours}h</div>
            <div className="text-sm font-medium text-foreground">This Week</div>
            <div className="text-xs text-text-secondary">Study Time</div>
          </div>

          {/* Weekly Accuracy */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Icon name="Target" size={24} color="white" />
            </div>
            <div className="text-2xl font-bold text-foreground">{weeklyStats?.accuracy}%</div>
            <div className="text-sm font-medium text-foreground">Accuracy</div>
            <div className="text-xs text-text-secondary">{weeklyStats?.questionsAnswered} questions</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <div className="bg-card rounded-xl border border-border shadow-subtle p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-foreground">Upcoming Tasks</h4>
            {overdueTasks?.length > 0 && (
              <span className="px-2 py-1 bg-error/10 text-error text-xs font-medium rounded-full border border-error/20">
                {overdueTasks?.length} overdue
              </span>
            )}
          </div>

          {upcomingTasks?.length > 0 ? (
            <div className="space-y-3">
              {upcomingTasks?.map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    task?.type === 'content-review' ? 'bg-blue-500' :
                    task?.type === 'practice-questions' ? 'bg-green-500' :
                    task?.type === 'weak-area-focus' ? 'bg-orange-500' :
                    task?.type === 'review-session' ? 'bg-purple-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{task?.title}</div>
                    <div className="text-xs text-text-secondary">
                      {new Date(task.date)?.toLocaleDateString()} • {task?.estimatedTime}
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={32} className="mx-auto mb-2 text-success" />
              <p className="text-sm text-text-secondary">All caught up! Great job!</p>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-card rounded-xl border border-border shadow-subtle p-6">
          <h4 className="text-lg font-semibold text-foreground mb-4">Achievements</h4>
          
          <div className="space-y-3">
            {achievements?.map((achievement) => (
              <div key={achievement?.id} className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                achievement?.earned 
                  ? 'bg-success/10 border border-success/20' :'bg-muted/30 border border-border opacity-60'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement?.earned 
                    ? 'bg-success text-white' :'bg-muted text-text-secondary'
                }`}>
                  <Icon name={achievement?.icon} size={16} />
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${
                    achievement?.earned ? 'text-foreground' : 'text-text-secondary'
                  }`}>
                    {achievement?.name}
                  </div>
                  {achievement?.earned && achievement?.date && (
                    <div className="text-xs text-success">
                      Earned on {new Date(achievement.date)?.toLocaleDateString()}
                    </div>
                  )}
                </div>
                {achievement?.earned && (
                  <Icon name="Check" size={16} className="text-success" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Study Buddy Section */}
      <div className="bg-card rounded-xl border border-border shadow-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-foreground">Study Buddy</h4>
          <Button variant="outline" size="sm">
            <Icon name="Users" size={16} className="mr-2" />
            Find Buddy
          </Button>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">SM</span>
            </div>
            <div>
              <div className="font-medium text-foreground">Sarah Martinez</div>
              <div className="text-sm text-text-secondary">Similar timeline • 85% compatibility</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-text-secondary">Study Progress</div>
              <div className="font-medium text-foreground">78% Complete</div>
            </div>
            <div>
              <div className="text-text-secondary">Current Streak</div>
              <div className="font-medium text-foreground">12 Days</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Last active: 2 hours ago</span>
              <Button variant="ghost" size="sm">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;