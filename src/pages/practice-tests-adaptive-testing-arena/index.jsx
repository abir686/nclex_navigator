import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TestModeSelector from './components/TestModeSelector';
import QuestionInterface from './components/QuestionInterface';
import TestResults from './components/TestResults';
import CustomQuizBuilder from './components/CustomQuizBuilder';
import TestHistory from './components/TestHistory';

const PracticeTestsAdaptiveTestingArena = () => {
  const [currentView, setCurrentView] = useState('modes'); // modes, custom, question, results, history
  const [selectedMode, setSelectedMode] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(75);
  const [timeRemaining, setTimeRemaining] = useState(4500); // 75 minutes in seconds
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [testStartTime, setTestStartTime] = useState(null);
  const [testResults, setTestResults] = useState(null);

  // Mock question data
  const mockQuestions = [
    {
      id: 1,
      text: `A nurse is caring for a client who has been diagnosed with acute myocardial infarction. The client is receiving continuous cardiac monitoring and suddenly develops ventricular tachycardia. Which action should the nurse take first?`,
      type: 'Multiple Choice',
      difficulty: 'Medium',
      category: 'Physiological Integrity',
      points: 1,
      hasExhibit: true,
      flagged: false,
      options: [
        { id: 'A', label: 'A', text: 'Administer oxygen via nasal cannula at 2 L/min' },
        { id: 'B', label: 'B', text: 'Check the client\'s pulse and blood pressure' },
        { id: 'C', label: 'C', text: 'Prepare for immediate cardioversion' },
        { id: 'D', label: 'D', text: 'Notify the healthcare provider immediately' }
      ],
      correctAnswer: 'B',
      rationale: `The first action when a client develops ventricular tachycardia is to assess the client's hemodynamic status by checking pulse and blood pressure. This determines whether the client is stable or unstable, which guides subsequent interventions. If the client has a pulse and is hemodynamically stable, medications may be tried first. If the client is unstable or pulseless, immediate cardioversion or defibrillation is indicated.`,
      studyLinks: [
        { title: 'Cardiac Arrhythmias', url: '#' },
        { title: 'Emergency Cardiac Care', url: '#' }
      ]
    },
    {
      id: 2,
      text: `A nurse is teaching a client about infection control measures after discharge following a surgical procedure. Which statement by the client indicates understanding of proper wound care?`,
      type: 'Multiple Choice',
      difficulty: 'Easy',
      category: 'Safe and Effective Care Environment',
      points: 1,
      hasExhibit: false,
      flagged: false,
      options: [
        { id: 'A', label: 'A', text: 'I will clean my wound with hydrogen peroxide daily' },
        { id: 'B', label: 'B', text: 'I will wash my hands before and after touching the wound area' },
        { id: 'C', label: 'C', text: 'I will remove the dressing every few hours to check the wound' },
        { id: 'D', label: 'D', text: 'I will apply antibiotic ointment without a prescription' }
      ],
      correctAnswer: 'B',
      rationale: `Hand hygiene is the most important infection control measure. Washing hands before and after touching the wound area prevents the introduction of pathogens and reduces the risk of surgical site infection. Hydrogen peroxide can damage healing tissue, frequent dressing changes can introduce bacteria, and antibiotic ointment should only be used as prescribed.`,
      studyLinks: [
        { title: 'Infection Control Principles', url: '#' },
        { title: 'Wound Care Management', url: '#' }
      ]
    }
  ];

  // Timer effect for timed practice
  useEffect(() => {
    let timer;
    if (currentView === 'question' && selectedMode === 'timed' && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleFinishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentView, selectedMode, timeRemaining]);

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleStartTest = () => {
    setCurrentView('question');
    setCurrentQuestion(1);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setTestStartTime(new Date());
    
    // Set appropriate question count and time based on mode
    if (selectedMode === 'tutor') {
      setTotalQuestions(50);
      setTimeRemaining(null); // No time limit
    } else if (selectedMode === 'timed') {
      setTotalQuestions(75);
      setTimeRemaining(4500); // 75 minutes
    }
  };

  const handleStartCustomQuiz = (config) => {
    setCurrentView('question');
    setCurrentQuestion(1);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setTestStartTime(new Date());
    setTotalQuestions(config?.questionCount);
    setTimeRemaining(config?.timeLimit);
  };

  const handleAnswer = (answerId) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerId
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleFinishTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFlag = (questionId) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(questionId)) {
        newSet?.delete(questionId);
      } else {
        newSet?.add(questionId);
      }
      return newSet;
    });
  };

  const handleFinishTest = () => {
    const endTime = new Date();
    const duration = Math.floor((endTime - testStartTime) / 1000);
    
    // Calculate results
    const correctAnswers = Object.values(answers)?.filter((answer, index) => {
      const questionIndex = index % mockQuestions?.length;
      return answer === mockQuestions?.[questionIndex]?.correctAnswer;
    })?.length;
    
    const overallScore = Math.round((correctAnswers / totalQuestions) * 100);
    
    const results = {
      mode: selectedMode,
      overallScore,
      correctAnswers,
      totalQuestions,
      duration,
      completedAt: endTime?.toISOString(),
      flaggedQuestions: flaggedQuestions?.size,
      readinessScore: Math.min(overallScore + 5, 100),
      successProbability: Math.min(overallScore + 10, 95),
      categoryBreakdown: [
        { name: 'Safe and Effective Care Environment', percentage: 85, correct: 17, total: 20 },
        { name: 'Health Promotion and Maintenance', percentage: 78, correct: 12, total: 15 },
        { name: 'Psychosocial Integrity', percentage: 92, correct: 11, total: 12 },
        { name: 'Physiological Integrity', percentage: 88, correct: 25, total: 28 }
      ],
      difficultyBreakdown: [
        { level: 'Easy', percentage: 95, correct: 19, total: 20 },
        { level: 'Medium', percentage: 82, correct: 28, total: 34 },
        { level: 'Hard', percentage: 76, correct: 16, total: 21 }
      ],
      recommendations: [
        {
          topic: 'Pharmacological Therapies',
          priority: 'High',
          description: 'Focus on medication administration, drug interactions, and adverse effects. Your performance in this area needs improvement.'
        },
        {
          topic: 'Safety and Infection Control',
          priority: 'Medium',
          description: 'Review isolation precautions, accident prevention, and emergency procedures to strengthen your knowledge base.'
        },
        {
          topic: 'Basic Care and Comfort',
          priority: 'Low',
          description: 'Continue practicing comfort measures, nutrition, and mobility concepts to maintain your strong performance.'
        }
      ]
    };
    
    setTestResults(results);
    setCurrentView('results');
  };

  const handleBackToModes = () => {
    setCurrentView('modes');
    setSelectedMode('');
    setCurrentQuestion(1);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setTestResults(null);
  };

  const handleViewHistory = () => {
    setCurrentView('history');
  };

  const handleCustomQuiz = () => {
    setCurrentView('custom');
  };

  const getCurrentQuestion = () => {
    const questionIndex = (currentQuestion - 1) % mockQuestions?.length;
    return {
      ...mockQuestions?.[questionIndex],
      flagged: flaggedQuestions?.has(currentQuestion)
    };
  };

  const isAnswered = answers?.hasOwnProperty(currentQuestion);
  const showFeedback = selectedMode === 'tutor' && isAnswered;

  return (
    <>
      <Helmet>
        <title>Practice Tests - Adaptive Testing Arena | NCLEX Navigator</title>
        <meta name="description" content="Experience NCLEX-style practice tests with adaptive difficulty, immediate feedback, and comprehensive performance analytics. Build confidence with our realistic testing environment." />
        <meta name="keywords" content="NCLEX practice tests, adaptive testing, nursing exam prep, NCLEX questions, test simulation" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {currentView !== 'question' && <Header onToggleSidebar={() => {}} />}
        
        <main className="flex-1">
          {currentView === 'modes' && (
            <div className="container-medical py-12">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 text-success rounded-full text-sm font-medium mb-6">
                  <Icon name="Award" size={16} />
                  <span>94% Pass Rate with Our Practice Tests</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-medical-authority mb-6">
                  Adaptive Testing Arena
                </h1>
                <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                  Experience the most realistic NCLEX preparation with our adaptive testing system that mirrors the actual exam conditions and adjusts difficulty based on your performance.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="Clock" size={16} />
                    <span className="text-sm">Timed Practice Available</span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="Brain" size={16} />
                    <span className="text-sm">Adaptive Difficulty</span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="BarChart3" size={16} />
                    <span className="text-sm">Detailed Analytics</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
                <Button
                  variant="outline"
                  onClick={handleViewHistory}
                  className="w-full sm:w-auto"
                >
                  <Icon name="History" size={16} className="mr-2" />
                  View Test History
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCustomQuiz}
                  className="w-full sm:w-auto"
                >
                  <Icon name="Settings" size={16} className="mr-2" />
                  Create Custom Quiz
                </Button>
              </div>

              {/* Test Mode Selector */}
              <TestModeSelector
                selectedMode={selectedMode}
                onModeSelect={handleModeSelect}
                onStartTest={handleStartTest}
              />

              {/* Features Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-medical-authority text-center mb-8">
                  Why Our Practice Tests Work
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Target" size={32} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-medical-authority mb-2">Adaptive Algorithm</h3>
                    <p className="text-text-secondary">
                      Our CAT system mirrors the real NCLEX, adjusting question difficulty based on your responses for optimal preparation.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="BookOpen" size={32} className="text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-medical-authority mb-2">Detailed Rationales</h3>
                    <p className="text-text-secondary">
                      Every question includes comprehensive explanations for both correct and incorrect answers with study links.
                    </p>
                  </div>
                  
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" size={32} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-medical-authority mb-2">Performance Analytics</h3>
                  <p className="text-text-secondary">
                    Track your progress with detailed breakdowns by category, difficulty, and readiness predictions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentView === 'custom' && (
            <div className="container-medical py-12">
              <CustomQuizBuilder
                onStartCustomQuiz={handleStartCustomQuiz}
                onBack={handleBackToModes}
              />
            </div>
          )}

          {currentView === 'question' && (
            <QuestionInterface
              question={getCurrentQuestion()}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onFlag={handleFlag}
              onCalculator={() => {}}
              onExhibit={() => {}}
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              timeRemaining={timeRemaining}
              mode={selectedMode}
              showFeedback={showFeedback}
              selectedAnswer={answers?.[currentQuestion]}
              isAnswered={isAnswered}
            />
          )}

          {currentView === 'results' && testResults && (
            <TestResults
              results={testResults}
              onRetakeTest={handleStartTest}
              onReviewAnswers={() => {}}
              onBackToModes={handleBackToModes}
              onViewDetailedAnalysis={() => {}}
            />
          )}

          {currentView === 'history' && (
            <div className="container-medical py-12">
              <TestHistory
                onViewResults={(testId) => console.log('View results for test:', testId)}
                onRetakeTest={(test) => {
                  setSelectedMode(test?.mode?.toLowerCase()?.replace(' ', ''));
                  handleStartTest();
                }}
                onBack={handleBackToModes}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default PracticeTestsAdaptiveTestingArena;