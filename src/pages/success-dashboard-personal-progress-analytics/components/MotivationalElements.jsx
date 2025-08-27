import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MotivationalElements = ({ testDate, currentStreak, totalStudyHours }) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({});

  const inspirationalQuotes = [
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill"
    },
    {
      text: "The expert in anything was once a beginner.",
      author: "Helen Hayes"
    },
    {
      text: "Nursing is not just a profession, it's a calling to serve humanity.",
      author: "Anonymous"
    },
    {
      text: "Every nurse was drawn to nursing because of a desire to care, to serve, or to help.",
      author: "Christina Feist-Heilmeier"
    },
    {
      text: "Your preparation today determines your performance tomorrow.",
      author: "NCLEX Navigator"
    }
  ];

  // Calculate time remaining until test date
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const test = new Date(testDate);
      const difference = test - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeRemaining({ days, hours, minutes });
      }
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [testDate]);

  // Rotate quotes every 10 seconds
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes?.length);
    }, 10000);

    return () => clearInterval(quoteTimer);
  }, []);

  const shareProgress = () => {
    const shareText = `I'm ${currentStreak} days into my NCLEX preparation journey! 💪 ${totalStudyHours} hours of focused study and counting. #NCLEXPrep #NursingStudent #FutureRN`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My NCLEX Progress',
        text: shareText,
        url: window.location?.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard?.writeText(shareText);
      alert('Progress shared to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Countdown Timer */}
      <div className="card-medical p-6 bg-gradient-to-r from-primary/5 to-confidence-green/5 border border-primary/20">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Calendar" size={24} className="text-primary" />
            <h3 className="text-lg font-semibold text-medical-authority">NCLEX Countdown</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-card rounded-lg p-3 shadow-subtle">
              <div className="text-2xl font-bold text-primary">{timeRemaining?.days || 0}</div>
              <div className="text-xs text-text-secondary">Days</div>
            </div>
            <div className="bg-card rounded-lg p-3 shadow-subtle">
              <div className="text-2xl font-bold text-primary">{timeRemaining?.hours || 0}</div>
              <div className="text-xs text-text-secondary">Hours</div>
            </div>
            <div className="bg-card rounded-lg p-3 shadow-subtle">
              <div className="text-2xl font-bold text-primary">{timeRemaining?.minutes || 0}</div>
              <div className="text-xs text-text-secondary">Minutes</div>
            </div>
          </div>
          
          <p className="text-sm text-text-secondary">Until your NCLEX exam</p>
          <p className="text-xs text-primary font-medium mt-1">{testDate}</p>
        </div>
      </div>
      {/* Inspirational Quote */}
      <div className="card-medical p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Quote" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-medical-authority">Daily Inspiration</h3>
          </div>
          <div className="flex space-x-1">
            {inspirationalQuotes?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuote ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
        
        <blockquote className="text-center">
          <p className="text-medical-authority font-medium mb-3 italic">
            "{inspirationalQuotes?.[currentQuote]?.text}"
          </p>
          <cite className="text-sm text-text-secondary">
            — {inspirationalQuotes?.[currentQuote]?.author}
          </cite>
        </blockquote>
      </div>
      {/* Progress Sharing */}
      <div className="card-medical p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-medical-authority">Share Your Progress</h3>
            <p className="text-sm text-text-secondary">Celebrate your journey with others</p>
          </div>
          <Icon name="Share2" size={20} className="text-primary" />
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-confidence-green">{currentStreak}</div>
              <div className="text-xs text-text-secondary">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{totalStudyHours}</div>
              <div className="text-xs text-text-secondary">Study Hours</div>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          fullWidth
          onClick={shareProgress}
          className="hover:bg-primary/5"
        >
          <Icon name="Share2" size={16} className="mr-2" />
          Share My Progress
        </Button>
      </div>
      {/* Study Reminders */}
      <div className="card-medical p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Bell" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-medical-authority">Study Reminders</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-medical-authority">Daily Study Session</p>
                <p className="text-xs text-text-secondary">9:00 AM - 11:00 AM</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-confidence-green font-medium">Active</span>
              <div className="w-2 h-2 bg-confidence-green rounded-full"></div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Target" size={16} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-medical-authority">Practice Questions</p>
                <p className="text-xs text-text-secondary">7:00 PM - 8:00 PM</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-confidence-green font-medium">Active</span>
              <div className="w-2 h-2 bg-confidence-green rounded-full"></div>
            </div>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="w-full mt-4 text-primary">
          <Icon name="Settings" size={16} className="mr-2" />
          Manage Reminders
        </Button>
      </div>
    </div>
  );
};

export default MotivationalElements;