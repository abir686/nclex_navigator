import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StartJourneySection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailSubmit = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const journeyOptions = [
    {
      id: 'diagnostic',
      title: 'Free Diagnostic Test',
      subtitle: 'Discover Your Starting Point',
      description: 'Take our comprehensive 75-question diagnostic exam to identify your strengths and areas for improvement.',
      icon: 'Target',
      color: 'from-emerald-500 to-green-600',
      features: ['Immediate detailed results', 'Personalized study recommendations', 'No credit card required'],
      cta: 'Start Free Test',
      link: '/practice-tests-adaptive-testing-arena',
      popular: true
    },
    {
      id: 'tour',
      title: 'Platform Tour',
      subtitle: 'Explore All Features',
      description: 'Get a guided walkthrough of our comprehensive NCLEX preparation ecosystem.',
      icon: 'Eye',
      color: 'from-blue-500 to-indigo-600',
      features: ['Interactive feature demos', '5-minute overview', 'See real student progress'],
      cta: 'Take Tour',
      link: '/complete-study-guide-nclex-mastery-center',
      popular: false
    },
    {
      id: 'stories',
      title: 'Success Stories',
      subtitle: 'Get Inspired',
      description: 'Read detailed accounts of how students overcame challenges and achieved NCLEX success.',
      icon: 'Users',
      color: 'from-purple-500 to-pink-600',
      features: ['Real student testimonials', 'Study strategies that worked', 'Motivation and tips'],
      cta: 'Read Stories',
      link: '/success-dashboard-personal-progress-analytics',
      popular: false
    }
  ];

  const trustSignals = [
    { icon: 'Shield', text: 'NCLEX-Approved Content' },
    { icon: 'Users', text: '50,000+ Students Trust Us' },
    { icon: 'Award', text: '94% Pass Rate' },
    { icon: 'Clock', text: '24/7 Support Available' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 border border-white/20 rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-2 h-20 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-2 bg-white/10 rounded-full"></div>
      </div>
      <div className="container-medical relative">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Icon name="Rocket" size={16} color="white" />
            <span className="text-white text-sm font-medium">Start Your Journey</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Conquer
            </span>{' '}
            Your NCLEX?
          </h2>
          
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Join thousands of successful nursing graduates who started their journey right here. 
            Choose your path and take the first step toward your nursing career today.
          </p>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {trustSignals?.map((signal, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-white/80 text-sm">
                <Icon name={signal?.icon} size={16} className="text-emerald-400" />
                <span>{signal?.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Options */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {journeyOptions?.map((option) => (
            <div
              key={option?.id}
              className={`relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group ${
                option?.popular ? 'ring-2 ring-emerald-400' : ''
              }`}
            >
              {/* Popular Badge */}
              {option?.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${option?.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={option?.icon} size={28} color="white" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{option?.title}</h3>
                  <p className="text-sm font-medium text-slate-600 mb-3">{option?.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed">{option?.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {option?.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={10} color="#10b981" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link to={option?.link} className="block">
                  <Button
                    variant="default"
                    fullWidth
                    size="lg"
                    className={`bg-gradient-to-r ${option?.color} hover:shadow-lg transition-all duration-300 text-white font-semibold py-4 group-hover:scale-105`}
                  >
                    <Icon name="ArrowRight" size={18} className="mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    {option?.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Email Signup Section */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Get Free NCLEX Prep Resources
                </h3>
                <p className="text-blue-100">
                  Join our newsletter for weekly study tips, practice questions, and success strategies delivered to your inbox.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e?.target?.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 whitespace-nowrap"
                  >
                    <Icon name="Mail" size={18} className="mr-2" />
                    Get Free Resources
                  </Button>
                </form>
              ) : (
                <div className="flex items-center justify-center space-x-3 py-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={16} color="white" strokeWidth={3} />
                  </div>
                  <span className="text-emerald-300 font-semibold">
                    Thank you! Check your email for your free resources.
                  </span>
                </div>
              )}

              <div className="flex items-center justify-center space-x-6 text-white/60 text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} />
                  <span>No spam, ever</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} />
                  <span>Join 25,000+ students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="X" size={14} />
                  <span>Unsubscribe anytime</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
            <Icon name="Zap" size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold text-lg">Your NCLEX Success Starts Now</span>
            <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
          <p className="text-blue-200 text-sm mt-4">
            Join the thousands who've already started their journey to nursing success
          </p>
        </div>
      </div>
    </section>
  );
};

export default StartJourneySection;