import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import StudyProgressRing from './components/StudyProgressRing';
import StudySidebar from './components/StudySidebar';
import StudyContentArea from './components/StudyContentArea';
import FloatingProgressTracker from './components/FloatingProgressTracker';
import StudyMethodologySection from './components/StudyMethodologySection';

const CompleteStudyGuideNCLEXMasteryCenter = () => {
  const [activeSection, setActiveSection] = useState('safe-care');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);

  // Mock data for NCLEX categories
  const nclexCategories = [
  {
    category: 'Safe and Effective Care Environment',
    progress: 75,
    estimatedTime: '2h 15m',
    totalTopics: 24,
    completedTopics: 18
  },
  {
    category: 'Health Promotion and Maintenance',
    progress: 60,
    estimatedTime: '3h 30m',
    totalTopics: 18,
    completedTopics: 11
  },
  {
    category: 'Psychosocial Integrity',
    progress: 45,
    estimatedTime: '4h 45m',
    totalTopics: 16,
    completedTopics: 7
  },
  {
    category: 'Physiological Integrity',
    progress: 85,
    estimatedTime: '1h 20m',
    totalTopics: 32,
    completedTopics: 27
  }];


  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 'b':
            e?.preventDefault();
            setIsSidebarCollapsed(!isSidebarCollapsed);
            break;
          case 'm':
            e?.preventDefault();
            setShowMethodology(!showMethodology);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSidebarCollapsed, showMethodology]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setShowMethodology(false);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <Helmet>
        <title>Complete Study Guide - NCLEX Mastery Center | NCLEX Navigator</title>
        <meta
          name="description"
          content="Comprehensive NCLEX preparation hub with evidence-based study methods, interactive content, and progress tracking. Master all four NCLEX categories with our proven methodology." />

        <meta name="keywords" content="NCLEX study guide, nursing exam preparation, NCLEX categories, study methodology, nursing education" />
        <meta property="og:title" content="Complete Study Guide - NCLEX Mastery Center" />
        <meta property="og:description" content="Master NCLEX with our comprehensive study guide featuring interactive content, progress tracking, and evidence-based learning methods." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header onToggleSidebar={toggleSidebar} />
        
        {/* Hero Section */}
        <div className="bg-gradient-medical text-white py-12">
          <div className="container-medical">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Israt Jahan Chaite Free NCLEX  Cource Complete Study Guide

              </h1>
              <p className="text-xl text-white/90 mb-6">
                Master all NCLEX categories with our comprehensive, evidence-based study methodology. 
                Interactive content, progress tracking, and proven learning techniques in one place.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>98 comprehensive topics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Interactive learning modules</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Evidence-based methodology</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="py-12 bg-muted/30">
          <div className="container-medical">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Your Progress Overview</h2>
              <p className="text-muted-foreground">Track your mastery across all NCLEX categories</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nclexCategories?.map((category, index) =>
              <StudyProgressRing
                key={index}
                category={category?.category}
                progress={category?.progress}
                estimatedTime={category?.estimatedTime}
                totalTopics={category?.totalTopics}
                completedTopics={category?.completedTopics} />

              )}
            </div>
          </div>
        </div>

        {/* Study Methodology Section */}
        {showMethodology && <StudyMethodologySection />}

        {/* Main Study Interface */}
        <div className="flex h-screen">
          <StudySidebar
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebar} />

          <StudyContentArea activeSection={activeSection} />
        </div>

        {/* Floating Progress Tracker */}
        <FloatingProgressTracker />

        {/* Quick Actions Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 lg:hidden">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <button
              onClick={toggleSidebar}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">

              <span className="text-sm font-medium">Topics</span>
            </button>
            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className="flex items-center space-x-2 px-4 py-2 bg-muted text-foreground rounded-lg">

              <span className="text-sm font-medium">Methods</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-success text-success-foreground rounded-lg">
              <span className="text-sm font-medium">Practice</span>
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="fixed bottom-4 left-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm rounded-lg p-2 hidden lg:block">
          <div>Ctrl+B: Toggle sidebar</div>
          <div>Ctrl+M: Toggle methodology</div>
        </div>
      </div>
    </>);

};

export default CompleteStudyGuideNCLEXMasteryCenter;