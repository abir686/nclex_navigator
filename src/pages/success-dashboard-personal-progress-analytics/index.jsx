import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import OverallProgressCard from './components/OverallProgressCard';
import CategoryProgressRings from './components/CategoryProgressRings';
import PerformanceChart from './components/PerformanceChart';
import WeaknessHeatMap from './components/WeaknessHeatMap';
import AchievementBadges from './components/AchievementBadges';
import GoalTracker from './components/GoalTracker';
import ConfidenceMeter from './components/ConfidenceMeter';
import MotivationalElements from './components/MotivationalElements';
import PredictiveAnalytics from './components/PredictiveAnalytics';

const SuccessDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const overallProgress = 78;
  const testDate = "March 15, 2025";
  const daysRemaining = 47;
  const currentStreak = 12;
  const totalStudyHours = 156;

  const categories = [
    { id: 1, name: "Safe Care", icon: "Shield", progress: 85, questionsAnswered: 234 },
    { id: 2, name: "Health Promotion", icon: "Heart", progress: 72, questionsAnswered: 189 },
    { id: 3, name: "Psychosocial", icon: "Brain", progress: 68, questionsAnswered: 156 },
    { id: 4, name: "Physiological", icon: "Activity", progress: 91, questionsAnswered: 298 },
    { id: 5, name: "Pharmacology", icon: "Pill", progress: 45, questionsAnswered: 123 },
    { id: 6, name: "Reduction of Risk", icon: "AlertTriangle", progress: 76, questionsAnswered: 201 },
    { id: 7, name: "Management", icon: "Users", progress: 82, questionsAnswered: 167 },
    { id: 8, name: "Basic Care", icon: "Stethoscope", progress: 88, questionsAnswered: 245 }
  ];

  const performanceData = [
    { date: "Jan 20", accuracy: 65, questionsAnswered: 25 },
    { date: "Jan 22", accuracy: 72, questionsAnswered: 30 },
    { date: "Jan 24", accuracy: 68, questionsAnswered: 35 },
    { date: "Jan 26", accuracy: 75, questionsAnswered: 40 },
    { date: "Jan 28", accuracy: 78, questionsAnswered: 45 },
    { date: "Jan 30", accuracy: 82, questionsAnswered: 50 },
    { date: "Feb 01", accuracy: 79, questionsAnswered: 42 },
    { date: "Feb 03", accuracy: 85, questionsAnswered: 55 },
    { date: "Feb 05", accuracy: 87, questionsAnswered: 48 },
    { date: "Feb 07", accuracy: 89, questionsAnswered: 52 }
  ];

  const weaknessData = [
    {
      id: 1,
      topic: "Pharmacology",
      accuracy: 45,
      intensity: "high",
      priority: "urgent",
      questionsAttempted: 123,
      timeSpent: 18
    },
    {
      id: 2,
      topic: "Pediatric Nursing",
      accuracy: 62,
      intensity: "medium",
      priority: "important",
      questionsAttempted: 89,
      timeSpent: 12
    },
    {
      id: 3,
      topic: "Infection Control",
      accuracy: 58,
      intensity: "medium",
      priority: "important",
      questionsAttempted: 67,
      timeSpent: 9
    },
    {
      id: 4,
      topic: "Mental Health",
      accuracy: 71,
      intensity: "low",
      priority: "moderate",
      questionsAttempted: 156,
      timeSpent: 22
    },
    {
      id: 5,
      topic: "Maternal Health",
      accuracy: 66,
      intensity: "medium",
      priority: "important",
      questionsAttempted: 98,
      timeSpent: 14
    },
    {
      id: 6,
      topic: "Emergency Care",
      accuracy: 74,
      intensity: "low",
      priority: "moderate",
      questionsAttempted: 134,
      timeSpent: 19
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first practice test",
      type: "milestone",
      isUnlocked: true,
      unlockedDate: "Jan 15, 2025"
    },
    {
      id: 2,
      title: "Study Streak",
      description: "Study for 7 consecutive days",
      type: "streak",
      isUnlocked: true,
      progress: 100,
      unlockedDate: "Jan 28, 2025"
    },
    {
      id: 3,
      title: "Question Master",
      description: "Answer 1000 practice questions",
      type: "milestone",
      isUnlocked: true,
      progress: 100,
      unlockedDate: "Feb 05, 2025"
    },
    {
      id: 4,
      title: "Weakness Warrior",
      description: "Improve a weak area by 20%",
      type: "mastery",
      isUnlocked: true,
      progress: 100,
      unlockedDate: "Feb 08, 2025"
    },
    {
      id: 5,
      title: "Study Champion",
      description: "Study for 14 consecutive days",
      type: "streak",
      isUnlocked: false,
      progress: 85
    },
    {
      id: 6,
      title: "Perfect Score",
      description: "Get 100% on a practice test",
      type: "special",
      isUnlocked: false,
      progress: 0
    },
    {
      id: 7,
      title: "Category Expert",
      description: "Master all categories above 80%",
      type: "mastery",
      isUnlocked: false,
      progress: 62
    },
    {
      id: 8,
      title: "Marathon Learner",
      description: "Complete 200 hours of study",
      type: "milestone",
      isUnlocked: false,
      progress: 78
    }
  ];

  const goals = [
    {
      id: 1,
      type: "daily",
      title: "Practice Questions",
      description: "Complete 50 practice questions",
      current: 35,
      target: 50,
      unit: "questions",
      progress: 70,
      startDate: "Feb 08",
      dueDate: "Feb 08"
    },
    {
      id: 2,
      type: "daily",
      title: "Study Time",
      description: "Study for 3 hours",
      current: 2.5,
      target: 3,
      unit: "hours",
      progress: 83,
      startDate: "Feb 08",
      dueDate: "Feb 08"
    },
    {
      id: 3,
      type: "weekly",
      title: "Weak Area Focus",
      description: "Improve pharmacology by 10%",
      current: 6,
      target: 10,
      unit: "percentage",
      progress: 60,
      startDate: "Feb 05",
      dueDate: "Feb 12"
    },
    {
      id: 4,
      type: "weekly",
      title: "Category Mastery",
      description: "Complete all Safe Care questions",
      current: 180,
      target: 250,
      unit: "questions",
      progress: 72,
      startDate: "Feb 05",
      dueDate: "Feb 12"
    },
    {
      id: 5,
      type: "monthly",
      title: "Overall Readiness",
      description: "Reach 85% overall progress",
      current: 78,
      target: 85,
      unit: "percentage",
      progress: 92,
      startDate: "Feb 01",
      dueDate: "Feb 28"
    },
    {
      id: 6,
      type: "monthly",
      title: "Study Consistency",
      description: "Study 25 out of 28 days",
      current: 19,
      target: 25,
      unit: "days",
      progress: 76,
      startDate: "Feb 01",
      dueDate: "Feb 28"
    }
  ];

  const studyRecommendations = [
    {
      id: 1,
      title: "Focus on Pharmacology",
      description: "Your weakest area needs immediate attention. Dedicate 2 hours daily to drug classifications and mechanisms.",
      priority: "urgent",
      impact: "High",
      timeRequired: "2-3 hours/day",
      confidence: 95
    },
    {
      id: 2,
      title: "Practice Time Management",
      description: "Your accuracy is good but speed needs improvement. Practice timed questions to build confidence.",
      priority: "important",
      impact: "Medium",
      timeRequired: "1 hour/day",
      confidence: 87
    },
    {
      id: 3,
      title: "Review Pediatric Nursing",
      description: "Strengthen your understanding of growth and development, immunizations, and common pediatric conditions.",
      priority: "suggested",
      impact: "Medium",
      timeRequired: "45 min/day",
      confidence: 78
    },
    {
      id: 4,
      title: "Maintain Strong Areas",
      description: "Continue practicing Physiological Integrity questions to maintain your 91% accuracy rate.",
      priority: "optional",
      impact: "Low",
      timeRequired: "30 min/day",
      confidence: 65
    }
  ];

  const timeEstimates = [
    { category: "Pharmacology", hoursNeeded: 45 },
    { category: "Pediatric", hoursNeeded: 28 },
    { category: "Mental Health", hoursNeeded: 22 },
    { category: "Infection Control", hoursNeeded: 18 },
    { category: "Maternal Health", hoursNeeded: 25 },
    { category: "Emergency Care", hoursNeeded: 15 }
  ];

  const focusAreas = [
    { area: "Pharmacology", percentage: 35, hours: 45, reason: "Lowest accuracy score" },
    { area: "Pediatric Nursing", percentage: 25, hours: 28, reason: "Trending downward" },
    { area: "Mental Health", percentage: 20, hours: 22, reason: "Inconsistent performance" },
    { area: "Review & Practice", percentage: 20, hours: 25, reason: "Maintain strong areas" }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const viewTabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'goals', label: 'Goals', icon: 'Target' },
    { id: 'insights', label: 'AI Insights', icon: 'Brain' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-medical py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-medical-authority mb-2">Loading Your Dashboard</h2>
              <p className="text-text-secondary">Analyzing your progress and generating insights...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Success Dashboard - Personal Progress Analytics | NCLEX Navigator</title>
        <meta name="description" content="Track your NCLEX preparation progress with comprehensive analytics, performance insights, and AI-powered recommendations for exam success." />
        <meta name="keywords" content="NCLEX dashboard, progress tracking, study analytics, exam preparation, nursing student progress" />
      </Helmet>
      <Header onToggleSidebar={() => {}} />
      <main className="container-medical py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-medical-authority mb-2">Success Dashboard</h1>
              <p className="text-text-secondary">Track your NCLEX preparation journey with detailed analytics and insights</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Export Report
              </Button>
              <Button variant="default" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Customize
              </Button>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {viewTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveView(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                  activeView === tab?.id
                    ? 'bg-card text-primary shadow-subtle'
                    : 'text-text-secondary hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        {activeView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Progress */}
            <div className="lg:col-span-2 space-y-8">
              <OverallProgressCard 
                overallProgress={overallProgress}
                testDate={testDate}
                daysRemaining={daysRemaining}
              />
              
              <CategoryProgressRings categories={categories} />
              
              <PerformanceChart performanceData={performanceData} />
              
              <WeaknessHeatMap weaknessData={weaknessData} />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              <ConfidenceMeter 
                confidenceScore={78}
                selfAssessment={75}
                practiceScore={82}
                predictedReadiness={84}
              />
              
              <MotivationalElements 
                testDate={testDate}
                currentStreak={currentStreak}
                totalStudyHours={totalStudyHours}
              />
            </div>
          </div>
        )}

        {activeView === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <PerformanceChart performanceData={performanceData} chartType="area" />
              <CategoryProgressRings categories={categories} />
            </div>
            <div className="space-y-8">
              <WeaknessHeatMap weaknessData={weaknessData} />
              <AchievementBadges achievements={achievements} />
            </div>
          </div>
        )}

        {activeView === 'goals' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GoalTracker goals={goals} onUpdateGoal={() => {}} />
            <div className="space-y-8">
              <AchievementBadges achievements={achievements} />
              <ConfidenceMeter 
                confidenceScore={78}
                selfAssessment={75}
                practiceScore={82}
                predictedReadiness={84}
              />
            </div>
          </div>
        )}

        {activeView === 'insights' && (
          <div className="space-y-8">
            <PredictiveAnalytics 
              studyRecommendations={studyRecommendations}
              timeEstimates={timeEstimates}
              focusAreas={focusAreas}
            />
          </div>
        )}

        {/* Quick Actions Footer */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-confidence-green/5 rounded-xl p-6 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-medical-authority mb-2">Ready to Continue Your Journey?</h3>
              <p className="text-text-secondary">Based on your progress, here are your next recommended actions</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Icon name="BookOpen" size={16} className="mr-2" />
                Study Pharmacology
              </Button>
              <Button variant="default">
                <Icon name="Play" size={16} className="mr-2" />
                Take Practice Test
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuccessDashboard;