import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Registered Nurse",
      location: "California, USA",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      score: "Pass - 75 Questions",
      examDate: "March 2024",
      studyDuration: "8 weeks",
      rating: 5,
      quote: `NCLEX Navigator completely transformed my preparation approach. The adaptive practice tests were incredibly accurate - I felt like I was taking the real exam during practice. The personalized study plan kept me on track, and the detailed explanations helped me understand not just the 'what' but the 'why' behind each answer.`,
      highlights: ["Passed on first attempt", "Improved confidence by 85%", "Completed in 75 questions"],
      beforeAfter: {
        before: "Anxious and overwhelmed with scattered study materials",
        after: "Confident and well-prepared with structured approach"
      }
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "ICU Nurse",
      location: "Texas, USA", 
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      score: "Pass - 85 Questions",
      examDate: "February 2024",
      studyDuration: "12 weeks",
      rating: 5,
      quote: `As someone who failed the NCLEX twice before, I was losing hope. NCLEX Navigator's targeted remediation approach identified my weak areas and provided focused practice. The success dashboard showed my progress daily, which kept me motivated. Finally passed on my third attempt!`,
      highlights: ["Third attempt success", "Identified weak areas", "Boosted motivation"],
      beforeAfter: {
        before: "Demoralized after two failed attempts",
        after: "Confident and successful on third try"
      }
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Pediatric Nurse",
      location: "Florida, USA",
      avatar: "https://images.unsplash.com/photo-1594824388853-d0c4e0e0e8e8?w=150&h=150&fit=crop&crop=face",
      score: "Pass - 60 Questions",
      examDate: "April 2024",
      studyDuration: "6 weeks",
      rating: 5,
      quote: `With only 6 weeks to prepare while working full-time, I needed an efficient study solution. The mobile app was perfect for studying during breaks, and the high-yield topic focus helped me maximize my limited study time. Passed in just 60 questions!`,
      highlights: ["Passed in 60 questions", "Studied while working", "Efficient preparation"],
      beforeAfter: {
        before: "Limited time with demanding work schedule",
        after: "Efficient study routine that fit my lifestyle"
      }
    },
    {
      id: 4,
      name: "David Kim",
      role: "Emergency Nurse",
      location: "New York, USA",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      score: "Pass - 78 Questions",
      examDate: "January 2024",
      studyDuration: "10 weeks",
      rating: 5,
      quote: `The expert-led content made all the difference. Having real nursing professionals explain complex concepts with practical examples helped me connect theory to practice. The community forum was also invaluable for getting support from peers going through the same journey.`,
      highlights: ["Expert-led content", "Theory to practice connection", "Community support"],
      beforeAfter: {
        before: "Struggling to connect textbook knowledge to real scenarios",
        after: "Clear understanding of practical nursing applications"
      }
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials?.[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container-medical">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full mb-6">
            <Icon name="Users" size={16} />
            <span className="text-sm font-medium">Success Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Real Students,{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-blue-600 bg-clip-text text-transparent">
              Real Success
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 leading-relaxed">
            Join thousands of nursing graduates who've achieved their NCLEX dreams with our platform.
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Side - Testimonial Content */}
              <div className="p-8 lg:p-12 space-y-8">
                {/* Quote */}
                <div className="relative">
                  <Icon name="Quote" size={32} className="text-blue-200 mb-4" />
                  <blockquote className="text-lg text-slate-700 leading-relaxed italic">
                    "{currentTestimonial?.quote}"
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={currentTestimonial?.avatar}
                      alt={currentTestimonial?.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{currentTestimonial?.name}</h4>
                    <p className="text-slate-600 font-medium">{currentTestimonial?.role}</p>
                    <p className="text-slate-500 text-sm">{currentTestimonial?.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={20}
                        className={i < currentTestimonial?.rating ? "text-amber-400 fill-current" : "text-slate-300"}
                      />
                    ))}
                  </div>
                  <span className="text-slate-600 font-medium">5.0 out of 5</span>
                </div>
              </div>

              {/* Right Side - Success Metrics */}
              <div className="bg-gradient-to-br from-blue-600 to-emerald-500 p-8 lg:p-12 text-white">
                <div className="space-y-8">
                  {/* Exam Results */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Trophy" size={32} color="white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">NCLEX Result</h3>
                    <div className="text-3xl font-bold text-emerald-200">{currentTestimonial?.score}</div>
                    <div className="text-white/80 text-sm mt-1">{currentTestimonial?.examDate}</div>
                  </div>

                  {/* Study Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{currentTestimonial?.studyDuration}</div>
                      <div className="text-white/80 text-sm">Study Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-200">1st</div>
                      <div className="text-white/80 text-sm">Attempt</div>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-white/90">Key Achievements:</h4>
                    {currentTestimonial?.highlights?.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon name="Check" size={12} color="white" strokeWidth={3} />
                        </div>
                        <span className="text-white/90 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Before/After */}
                  <div className="bg-white/10 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-white/90">Transformation:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Icon name="ArrowDown" size={14} className="text-red-300 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-xs">{currentTestimonial?.beforeAfter?.before}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Icon name="ArrowUp" size={14} className="text-emerald-300 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80 text-xs">{currentTestimonial?.beforeAfter?.after}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-6">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Icon name="ChevronLeft" size={20} className="text-slate-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-600 w-8' :'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Icon name="ChevronRight" size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Auto-play Indicator */}
          <div className="text-center mt-4">
            <div className="inline-flex items-center space-x-2 text-slate-500 text-sm">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 pt-16 border-t border-slate-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">94%</div>
            <div className="text-slate-600 text-sm">Pass Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-500">50K+</div>
            <div className="text-slate-600 text-sm">Students Helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">4.9</div>
            <div className="text-slate-600 text-sm">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-500">2024</div>
            <div className="text-slate-600 text-sm">Latest Success</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;