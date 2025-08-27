import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturesOverview from './components/FeaturesOverview';
import TestimonialCarousel from './components/TestimonialCarousel';
import StartJourneySection from './components/StartJourneySection';
import Footer from './components/Footer';

const NCLEXNavigatorHomepage = () => {
  // Add state for sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Add handler for sidebar toggle
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Add scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements?.forEach(el => observer?.observe(el));

    return () => {
      scrollElements?.forEach(el => observer?.unobserve(el));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>NCLEX Navigator - Your Path to Nursing Success | Comprehensive NCLEX Preparation</title>
        <meta 
          name="description" 
          content="Join 50,000+ nursing students who trust NCLEX Navigator for comprehensive exam preparation. 94% pass rate with adaptive practice tests, personalized study plans, and expert-led content." 
        />
        <meta name="keywords" content="NCLEX preparation, nursing exam, NCLEX practice tests, nursing study guide, NCLEX success, nursing students" />
        <meta property="og:title" content="NCLEX Navigator - Your Path to Nursing Success" />
        <meta property="og:description" content="Comprehensive NCLEX preparation platform with 94% pass rate. Adaptive practice tests, personalized study plans, and expert content." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nclexnavigator.com/homepage-nclex-navigator-learning-hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NCLEX Navigator - Your Path to Nursing Success" />
        <meta name="twitter:description" content="Join 50,000+ students with 94% pass rate. Comprehensive NCLEX prep platform." />
        <link rel="canonical" href="https://nclexnavigator.com/homepage-nclex-navigator-learning-hub" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header onToggleSidebar={handleToggleSidebar} />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <div className="scroll-reveal">
            <HeroSection />
          </div>

          {/* Features Overview */}
          <div className="scroll-reveal">
            <FeaturesOverview />
          </div>

          {/* Testimonial Carousel */}
          <div className="scroll-reveal">
            <TestimonialCarousel />
          </div>

          {/* Start Journey Section */}
          <div className="scroll-reveal">
            <StartJourneySection />
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Action Button - Mobile */}
        <div className="fixed bottom-6 right-6 z-50 md:hidden">
          <button className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110 animate-pulse">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 z-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-300 ease-out"
            style={{
              width: `${typeof window !== 'undefined' && document.documentElement ? Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100) : 0}%`
            }}
          />
        </div>
      </div>
    </>
  );
};

export default NCLEXNavigatorHomepage;