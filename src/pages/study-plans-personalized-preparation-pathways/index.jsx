import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AssessmentModal from './components/AssessmentModal';
import StudyPlanCard from './components/StudyPlanCard';
import CalendarView from './components/CalendarView';
import ProgressDashboard from './components/ProgressDashboard';
import StudyPlanCustomizer from './components/StudyPlanCustomizer';
import TimelineView from './components/TimelineView';

const StudyPlansPage = () => {
  const [showAssessment, setShowAssessment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeView, setActiveView] = useState('plans');
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [customizingPlan, setCustomizingPlan] = useState(null);
  const [userAssessment, setUserAssessment] = useState(null);
  const [generatedPlans, setGeneratedPlans] = useState([]);

  // Mock study plans data
  const defaultStudyPlans = [
    {
      id: 1,
      name: "Intensive 4-Week Bootcamp",
      description: "Fast-track preparation for confident test-takers with solid foundation",
      duration: "4 weeks",
      dailyTime: "5-6 hours",
      intensity: "Intensive",
      difficulty: "Advanced",
      successRate: 89,
      features: [
        "Daily practice tests with 150+ questions",
        "Focused weak area remediation",
        "Live expert Q&A sessions",
        "Mobile study companion",
        "Performance analytics dashboard"
      ],
      weeklyBreakdown: [
        { week: 1, focus: "Foundation Review & Assessment" },
        { week: 2, focus: "High-Yield Content Mastery" },
        { week: 3, focus: "Practice Test Marathon" },
        { week: 4, focus: "Final Review & Test Strategies" }
      ],
      timeline: [
        {
          week: 1,
          focus: "Foundation Review & Assessment",
          tasks: [
            { title: "Initial Diagnostic Test", type: "assessment", duration: "2 hours" },
            { title: "Anatomy & Physiology Review", type: "content-review", duration: "3 hours" },
            { title: "Pharmacology Basics", type: "content-review", duration: "2 hours" }
          ],
          goals: [
            "Complete baseline assessment",
            "Identify knowledge gaps",
            "Set personalized targets"
          ]
        }
      ],
      schedule: [
        {
          id: 1,
          date: "2025-08-27",
          title: "Initial Diagnostic Assessment",
          description: "Comprehensive 150-question diagnostic test to establish baseline",
          type: "assessment",
          estimatedTime: "2.5 hours",
          difficulty: "mixed",
          completed: false
        },
        {
          id: 2,
          date: "2025-08-28",
          title: "Cardiovascular System Review",
          description: "In-depth study of cardiac anatomy, physiology, and common conditions",
          type: "content-review",
          estimatedTime: "3 hours",
          difficulty: "intermediate",
          completed: false
        }
      ]
    },
    {
      id: 2,
      name: "Comprehensive 8-Week Program",
      description: "Balanced approach combining thorough content review with practice",
      duration: "8 weeks",
      dailyTime: "3-4 hours",
      intensity: "Moderate",
      difficulty: "Intermediate",
      successRate: 94,
      features: [
        "Systematic content review by category",
        "Progressive difficulty practice questions",
        "Weekly milestone assessments",
        "Study group coordination",
        "Personalized weak area focus"
      ],
      weeklyBreakdown: [
        { week: 1, focus: "Safe & Effective Care Environment" },
        { week: 2, focus: "Health Promotion & Maintenance" },
        { week: 3, focus: "Psychosocial Integrity" },
        { week: 4, focus: "Physiological Integrity - Basic Care" },
        { week: 5, focus: "Physiological Integrity - Pharmacology" },
        { week: 6, focus: "Physiological Integrity - Risk Reduction" },
        { week: 7, focus: "Critical Thinking & Test Strategies" },
        { week: 8, focus: "Final Review & Mock Exams" }
      ]
    },
    {
      id: 3,
      name: "Extended 12-Week Foundation",
      description: "Thorough preparation starting from basics, perfect for comprehensive learning",
      duration: "12 weeks",
      dailyTime: "2-3 hours",
      intensity: "Light",
      difficulty: "Beginner",
      successRate: 91,
      features: [
        "Gentle learning curve from basics",
        "Extensive content library access",
        "Regular progress check-ins",
        "Flexible scheduling options",
        "Comprehensive review materials"
      ],
      weeklyBreakdown: [
        { week: 1, focus: "Nursing Fundamentals" },
        { week: 2, focus: "Basic Anatomy & Physiology" },
        { week: 3, focus: "Pharmacology Foundations" },
        { week: 4, focus: "Safe Care Environment" }
      ]
    },
    {
      id: 4,
      name: "Ultimate 16-Week Mastery",
      description: "Most comprehensive program with deep dive into every NCLEX domain",
      duration: "16 weeks",
      dailyTime: "2-3 hours",
      intensity: "Light",
      difficulty: "Beginner",
      successRate: 96,
      features: [
        "Complete NCLEX domain coverage",
        "Extensive practice question bank",
        "Multiple learning modalities",
        "Expert mentorship program",
        "Guaranteed pass support"
      ],
      weeklyBreakdown: [
        { week: 1, focus: "Program Orientation & Assessment" },
        { week: 2, focus: "Nursing Process Fundamentals" },
        { week: 3, focus: "Basic Life Support & Safety" },
        { week: 4, focus: "Infection Control & Prevention" }
      ]
    }
  ];

  // Mock progress data
  const mockProgressData = {
    currentStreak: 12,
    longestStreak: 18,
    weeklyStudyHours: 28,
    weeklyQuestions: 450,
    weeklyAccuracy: 78,
    weeklyTopics: 6
  };

  useEffect(() => {
    // Check if user has existing plans or needs assessment
    const savedPlans = localStorage.getItem('userStudyPlans');
    const savedAssessment = localStorage.getItem('userAssessment');
    
    if (savedAssessment) {
      setUserAssessment(JSON.parse(savedAssessment));
      setActiveView('dashboard');
    }
    
    if (savedPlans) {
      setGeneratedPlans(JSON.parse(savedPlans));
    }
  }, []);

  const handleAssessmentComplete = (assessmentData) => {
    setUserAssessment(assessmentData);
    localStorage.setItem('userAssessment', JSON.stringify(assessmentData));
    
    // Generate personalized plans based on assessment
    const personalizedPlans = generatePersonalizedPlans(assessmentData);
    setGeneratedPlans(personalizedPlans);
    localStorage.setItem('userStudyPlans', JSON.stringify(personalizedPlans));
    
    setActiveView('plans');
  };

  const generatePersonalizedPlans = (assessment) => {
    // Simple logic to customize plans based on assessment
    return defaultStudyPlans?.map(plan => ({
      ...plan,
      isRecommended: plan?.difficulty?.toLowerCase() === assessment?.currentLevel,
      customizedFor: assessment?.currentLevel
    }));
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem('selectedStudyPlan', JSON.stringify(plan));
    setActiveView('calendar');
  };

  const handleCustomizePlan = (plan) => {
    setCustomizingPlan(plan);
    setShowCustomizer(true);
  };

  const handleSaveCustomPlan = (customPlan) => {
    const newPlan = {
      ...customizingPlan,
      ...customPlan,
      id: Date.now(),
      isCustom: true
    };
    
    setGeneratedPlans(prev => [...prev, newPlan]);
    setSelectedPlan(newPlan);
    localStorage.setItem('selectedStudyPlan', JSON.stringify(newPlan));
    setActiveView('calendar');
  };

  const handleTaskComplete = (taskId) => {
    if (selectedPlan?.schedule) {
      const updatedSchedule = selectedPlan?.schedule?.map(task =>
        task?.id === taskId ? { ...task, completed: !task?.completed } : task
      );
      
      const updatedPlan = { ...selectedPlan, schedule: updatedSchedule };
      setSelectedPlan(updatedPlan);
      localStorage.setItem('selectedStudyPlan', JSON.stringify(updatedPlan));
    }
  };

  const handleTaskEdit = (task) => {
    console.log('Edit task:', task);
    // Implement task editing logic
  };

  const handleTaskClick = (task) => {
    console.log('Task clicked:', task);
    // Implement task detail view
  };

  const handleMilestoneClick = (milestone) => {
    console.log('Milestone clicked:', milestone);
    // Implement milestone detail view
  };

  const renderContent = () => {
    switch (activeView) {
      case 'plans':
        return (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-medical-authority mb-6">
                Personalized Study Plans
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Tailored preparation pathways designed to maximize your NCLEX success based on your unique learning profile and schedule.
              </p>
              
              {!userAssessment && (
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setShowAssessment(true)}
                  className="btn-medical-primary"
                >
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Take Assessment to Get Started
                </Button>
              )}
            </div>
            {/* Study Plans Grid */}
            {(generatedPlans?.length > 0 || userAssessment) && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-medical-authority">
                    {userAssessment ? 'Recommended Plans' : 'Available Plans'}
                  </h2>
                  <Button
                    variant="outline"
                    onClick={() => setShowAssessment(true)}
                  >
                    <Icon name="RefreshCw" size={16} className="mr-2" />
                    Retake Assessment
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {(generatedPlans?.length > 0 ? generatedPlans : defaultStudyPlans)?.map((plan) => (
                    <StudyPlanCard
                      key={plan?.id}
                      plan={plan}
                      isSelected={selectedPlan?.id === plan?.id}
                      onSelect={() => handlePlanSelect(plan)}
                      onCustomize={() => handleCustomizePlan(plan)}
                    />
                  ))}
                </div>
              </div>
            )}
            {/* Features Section */}
            <div className="bg-muted/30 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-medical-authority mb-6 text-center">
                Why Choose Our Study Plans?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Brain" size={24} className="text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Adaptive Learning</h4>
                  <p className="text-sm text-text-secondary">
                    Plans adjust based on your progress and performance, ensuring optimal learning efficiency.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="Target" size={24} className="text-success" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Proven Results</h4>
                  <p className="text-sm text-text-secondary">
                    94% average pass rate with our structured study plans and comprehensive support system.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Community Support</h4>
                  <p className="text-sm text-text-secondary">
                    Connect with study buddies and get support from peers on similar preparation timelines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-medical-authority">Study Calendar</h1>
                <p className="text-text-secondary mt-2">
                  {selectedPlan?.name} - Track your daily progress and stay on schedule
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setActiveView('timeline')}>
                  <Icon name="GitBranch" size={16} className="mr-2" />
                  Timeline View
                </Button>
                <Button variant="outline" onClick={() => setActiveView('dashboard')}>
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Progress Dashboard
                </Button>
              </div>
            </div>
            
            <CalendarView
              studyPlan={selectedPlan}
              onTaskComplete={handleTaskComplete}
              onTaskEdit={handleTaskEdit}
            />
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-medical-authority">Study Timeline</h1>
                <p className="text-text-secondary mt-2">
                  {selectedPlan?.name} - Visual roadmap to your NCLEX success
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setActiveView('calendar')}>
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Calendar View
                </Button>
                <Button variant="outline" onClick={() => setActiveView('dashboard')}>
                  <Icon name="BarChart3" size={16} className="mr-2" />
                  Progress Dashboard
                </Button>
              </div>
            </div>
            
            <TimelineView
              studyPlan={selectedPlan}
              onTaskClick={handleTaskClick}
              onMilestoneClick={handleMilestoneClick}
            />
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-medical-authority">Progress Dashboard</h1>
                <p className="text-text-secondary mt-2">
                  Track your achievements and stay motivated on your NCLEX journey
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => setActiveView('calendar')}>
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Calendar View
                </Button>
                <Button variant="outline" onClick={() => setActiveView('timeline')}>
                  <Icon name="GitBranch" size={16} className="mr-2" />
                  Timeline View
                </Button>
              </div>
            </div>
            
            <ProgressDashboard
              studyPlan={selectedPlan}
              progressData={mockProgressData}
              onViewDetails={() => console.log('View detailed analytics')}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Study Plans - Personalized Preparation Pathways | NCLEX Navigator</title>
        <meta name="description" content="Create personalized NCLEX study plans tailored to your schedule, learning style, and preparation timeline. Adaptive learning with proven 94% success rate." />
        <meta name="keywords" content="NCLEX study plans, personalized preparation, nursing exam schedule, adaptive learning, study timeline" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header onToggleSidebar={() => {}} />
        
        <main className="container-medical py-8">
          {/* Navigation Tabs */}
          {selectedPlan && (
            <div className="mb-8">
              <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg w-fit">
                <button
                  onClick={() => setActiveView('plans')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeView === 'plans' ? 'bg-card text-primary shadow-subtle' : 'text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon name="List" size={16} className="mr-2 inline" />
                  Plans
                </button>
                <button
                  onClick={() => setActiveView('calendar')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeView === 'calendar' ? 'bg-card text-primary shadow-subtle' : 'text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon name="Calendar" size={16} className="mr-2 inline" />
                  Calendar
                </button>
                <button
                  onClick={() => setActiveView('timeline')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeView === 'timeline' ? 'bg-card text-primary shadow-subtle' : 'text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon name="GitBranch" size={16} className="mr-2 inline" />
                  Timeline
                </button>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeView === 'dashboard' ? 'bg-card text-primary shadow-subtle' : 'text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon name="BarChart3" size={16} className="mr-2 inline" />
                  Dashboard
                </button>
              </div>
            </div>
          )}

          {renderContent()}
        </main>

        {/* Assessment Modal */}
        <AssessmentModal
          isOpen={showAssessment}
          onClose={() => setShowAssessment(false)}
          onComplete={handleAssessmentComplete}
        />

        {/* Study Plan Customizer */}
        <StudyPlanCustomizer
          plan={customizingPlan}
          isOpen={showCustomizer}
          onClose={() => setShowCustomizer(false)}
          onSave={handleSaveCustomPlan}
        />
      </div>
    </>
  );
};

export default StudyPlansPage;