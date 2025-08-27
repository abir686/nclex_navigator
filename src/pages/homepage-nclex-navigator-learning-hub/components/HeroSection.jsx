import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const pathwayOptions = [
    {
      id: 'starting',
      title: 'Just Starting',
      subtitle: 'Comprehensive 12-Week Plan',
      description: 'Perfect for students beginning their NCLEX preparation journey',
      icon: 'BookOpen',
      color: 'from-blue-600 to-blue-800',
      features: ['Structured learning path', 'Foundation building', 'Progress tracking']
    },
    {
      id: 'intensive',
      title: 'Test in 4-8 Weeks',
      subtitle: 'Intensive Preparation',
      description: 'Focused study plan for students with limited time',
      icon: 'Clock',
      color: 'from-amber-500 to-orange-600',
      features: ['High-yield topics', 'Quick review', 'Practice intensive']
    },
    {
      id: 'retaking',
      title: 'Retaking NCLEX',
      subtitle: 'Targeted Remediation',
      description: 'Specialized approach for repeat test-takers',
      icon: 'Target',
      color: 'from-emerald-500 to-green-600',
      features: ['Weakness analysis', 'Confidence building', 'Success strategies']
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white/20 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white/20 rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 border-2 border-white/20 rotate-12"></div>
        
        {/* Medical Cross Pattern */}
        <div className="absolute top-1/3 right-1/4 w-8 h-24 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-8 bg-white/10 rounded-full"></div>
      </div>
      <div className="relative container-medical py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Icon name="Award" size={16} color="white" />
                <span className="text-white text-sm font-medium">Trusted by 50,000+ Students</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your NCLEX Success is{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Join thousands of nursing students who've transformed their NCLEX preparation with our comprehensive, adaptive learning platform designed by nursing experts.
              </p>
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-emerald-400">94%</div>
                <div className="text-blue-200 text-sm">Pass Rate</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-blue-400">50K+</div>
                <div className="text-blue-200 text-sm">Questions Daily</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Icon name="Play" size={20} className="mr-2" />
                Start Free Diagnostic Test
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
              >
                <Icon name="Eye" size={20} className="mr-2" />
                Take Platform Tour
              </Button>
            </div>
          </div>

          {/* Right Column - Assessment Widget */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" size={24} color="white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">When is your NCLEX date?</h3>
                <p className="text-slate-600">Let us create a personalized study plan for you</p>
              </div>

              <div className="space-y-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e?.target?.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
                  min={new Date()?.toISOString()?.split('T')?.[0]}
                />

                <div className="grid gap-3">
                  {pathwayOptions?.map((pathway) => (
                    <Link
                      key={pathway?.id}
                      to="/study-plans-personalized-preparation-pathways"
                      className="group p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${pathway?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <Icon name={pathway?.icon} size={20} color="white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {pathway?.title}
                          </div>
                          <div className="text-sm text-slate-600">{pathway?.subtitle}</div>
                        </div>
                        <Icon name="ChevronRight" size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>

                <Button
                  variant="default"
                  fullWidth
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white font-semibold py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Get My Personalized Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;