import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FeaturesOverview = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const features = [
    {
      id: 'practice',
      title: 'Adaptive Practice Tests',
      subtitle: 'Smart Testing Engine',
      description: 'AI-powered questions that adapt to your knowledge level and learning pace',
      icon: 'Brain',
      color: 'from-blue-600 to-indigo-700',
      link: '/practice-tests-adaptive-testing-arena',
      benefits: [
        'NCLEX-style questions with detailed explanations',
        'Adaptive difficulty based on performance',
        'Comprehensive rationales for every answer',
        'Performance analytics and weak area identification'
      ],
      stats: { value: '15,000+', label: 'Practice Questions' }
    },
    {
      id: 'plans',
      title: 'Personalized Study Plans',
      subtitle: 'Tailored Learning Paths',
      description: 'Customized study schedules based on your timeline and learning preferences',
      icon: 'Calendar',
      color: 'from-emerald-500 to-green-600',
      link: '/study-plans-personalized-preparation-pathways',
      benefits: [
        'Flexible scheduling around your commitments',
        'Progress tracking with milestone celebrations',
        'Automatic plan adjustments based on performance',
        'Integration with all platform resources'
      ],
      stats: { value: '12', label: 'Study Pathways' }
    },
    {
      id: 'content',
      title: 'Expert-Led Content',
      subtitle: 'Nursing Professional Insights',
      description: 'Comprehensive study materials created by certified nursing educators',
      icon: 'GraduationCap',
      color: 'from-purple-600 to-pink-600',
      link: '/complete-study-guide-nclex-mastery-center',
      benefits: [
        'Content reviewed by practicing nurses',
        'Updated with latest NCLEX test plan changes',
        'Interactive case studies and scenarios',
        'Visual learning aids and mnemonics'
      ],
      stats: { value: '500+', label: 'Study Topics' }
    },
    {
      id: 'analytics',
      title: 'Progress Analytics',
      subtitle: 'Data-Driven Insights',
      description: 'Detailed performance tracking to optimize your study strategy',
      icon: 'BarChart3',
      color: 'from-amber-500 to-orange-600',
      link: '/success-dashboard-personal-progress-analytics',
      benefits: [
        'Real-time performance dashboards',
        'Strength and weakness analysis',
        'Study time optimization recommendations',
        'Predictive success probability scoring'
      ],
      stats: { value: '25+', label: 'Analytics Metrics' }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container-medical">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-6">
            <Icon name="Sparkles" size={16} />
            <span className="text-sm font-medium">Platform Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Four Pillars of{' '}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              NCLEX Success
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 leading-relaxed">
            Our comprehensive platform combines cutting-edge technology with proven educational methodologies to ensure your NCLEX success.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features?.map((feature, index) => (
            <div
              key={feature?.id}
              className={`group relative bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                hoveredFeature === feature?.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredFeature(feature?.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature?.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature?.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon name={feature?.icon} size={24} color="white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {feature?.title}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">{feature?.subtitle}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">{feature?.stats?.value}</div>
                    <div className="text-xs text-slate-500">{feature?.stats?.label}</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {feature?.description}
                </p>

                {/* Benefits - Show on Hover */}
                <div className={`space-y-3 mb-6 transition-all duration-500 ${
                  hoveredFeature === feature?.id 
                    ? 'opacity-100 max-h-48 transform translate-y-0' 
                    : 'opacity-0 max-h-0 transform translate-y-4 overflow-hidden'
                }`}>
                  {feature?.benefits?.map((benefit, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Icon name="Check" size={12} color="#10b981" />
                      </div>
                      <span className="text-sm text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to={feature?.link}
                  className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${feature?.color} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                >
                  <span>Explore Feature</span>
                  <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <Icon name="Zap" size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold">Experience All Features with Free Trial</span>
            <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOverview;