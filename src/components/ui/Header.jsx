import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isCollapsed = false, onToggleSidebar }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location?.pathname]);

  const navigationItems = [
    {
      name: 'Study Guide',
      path: '/complete-study-guide-nclex-mastery-center',
      icon: 'BookOpen'
    },
    {
      name: 'Practice Tests',
      path: '/practice-tests-adaptive-testing-arena',
      icon: 'FileText'
    },
    {
      name: 'Study Plans',
      path: '/study-plans-personalized-preparation-pathways',
      icon: 'Calendar'
    },
    {
      name: 'Resources',
      path: '/resource-library-comprehensive-study-materials-hub',
      icon: 'Library'
    }
  ];

  const moreMenuItems = [
    {
      name: 'Progress Dashboard',
      path: '/success-dashboard-personal-progress-analytics',
      icon: 'BarChart3'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const Logo = () => (
    <Link to="/homepage-nclex-navigator-learning-hub" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-medical rounded-lg flex items-center justify-center shadow-medical">
          <Icon name="Stethoscope" size={24} color="white" strokeWidth={2} />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-confidence-green rounded-full flex items-center justify-center">
          <Icon name="Check" size={10} color="white" strokeWidth={3} />
        </div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold text-medical-authority">NCLEX Navigator</h1>
        <p className="text-xs text-text-secondary font-medium">Your Path to Success</p>
      </div>
    </Link>
  );

  const MoreMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="hidden lg:flex items-center space-x-1"
        >
          <span className="text-sm font-medium">More</span>
          <Icon name="ChevronDown" size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-medical z-20 py-2">
              {moreMenuItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
                    isActivePath(item?.path) ? 'text-primary bg-primary/5 font-medium' : 'text-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <header className={`nav-medical transition-all duration-300 ${isScrolled ? 'shadow-medical' : ''}`}>
      <div className="container-medical">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-4">
            {onToggleSidebar && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleSidebar}
                className="lg:hidden"
              >
                <Icon name="Menu" size={20} />
              </Button>
            )}
            <Logo />
          </div>

          {/* Center Section - Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`nav-link flex items-center space-x-2 ${
                  isActivePath(item?.path) ? 'nav-link-active' : ''
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span className="text-sm font-medium">{item?.name}</span>
              </Link>
            ))}
            <MoreMenu />
          </nav>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3">
            {/* Certification Badge */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full border border-success/20">
              <Icon name="Award" size={14} />
              <span className="text-xs font-medium">94% Pass Rate</span>
            </div>

            {/* CTA Button */}
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex btn-medical-primary"
            >
              <Icon name="Play" size={16} className="mr-2" />
              Start Free Test
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card/95 backdrop-blur-sm">
            <nav className="py-4 space-y-2">
              {[...navigationItems, ...moreMenuItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm hover:bg-muted transition-colors duration-200 ${
                    isActivePath(item?.path) ? 'text-primary bg-primary/5 font-medium border-r-2 border-primary' : 'text-foreground'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="px-4 pt-4 border-t border-border">
                <Button
                  variant="default"
                  fullWidth
                  className="btn-medical-primary"
                >
                  <Icon name="Play" size={16} className="mr-2" />
                  Start Free Diagnostic Test
                </Button>
              </div>

              {/* Mobile Certification Badge */}
              <div className="px-4 pt-2">
                <div className="flex items-center justify-center space-x-2 px-3 py-2 bg-success/10 text-success rounded-lg border border-success/20">
                  <Icon name="Award" size={16} />
                  <span className="text-sm font-medium">94% Pass Rate - Trusted by 50,000+ Students</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted">
        <div 
          className="h-full bg-gradient-confidence transition-all duration-300"
          style={{ width: `${Math.min((window.scrollY / (document.documentElement?.scrollHeight - window.innerHeight)) * 100, 100)}%` }}
        />
      </div>
    </header>
  );
};

export default Header;