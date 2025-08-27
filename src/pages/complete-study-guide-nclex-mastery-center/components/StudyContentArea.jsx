import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyContentArea = ({ activeSection }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const contentTabs = [
    { id: 'overview', label: 'Overview', icon: 'BookOpen' },
    { id: 'interactive', label: 'Interactive', icon: 'MousePointer' },
    { id: 'videos', label: 'Videos', icon: 'Play' },
    { id: 'audio', label: 'Audio', icon: 'Headphones' },
    { id: 'cases', label: 'Case Studies', icon: 'FileText' }
  ];

  const studyContent = {
    'safe-care': {
      title: 'Safe and Effective Care Environment',
      difficulty: 'Intermediate',
      estimatedTime: '45 minutes',
      overview: `This category encompasses the knowledge, skills, and abilities required to protect clients and health care personnel from environmental hazards. It includes management of care and safety and infection control principles that are fundamental to nursing practice.

Key concepts include:
• Leadership and management principles
• Ethical and legal responsibilities
• Information technology and healthcare informatics
• Performance improvement and quality assurance
• Safety protocols and infection prevention

The NCLEX-RN examination allocates 17-23% of questions to this category, making it crucial for your success. Understanding these concepts will help you make sound clinical decisions that prioritize patient safety and effective care coordination.`,
      keyPoints: [
        'Delegation and supervision principles',
        'Ethical dilemmas and legal implications',
        'Quality improvement methodologies',
        'Infection control protocols',
        'Emergency response procedures'
      ]
    },
    'health-promotion': {
      title: 'Health Promotion and Maintenance',
      difficulty: 'Beginner',
      estimatedTime: '35 minutes',
      overview: `Health Promotion and Maintenance focuses on the nurse's role in helping clients achieve optimal health through health promotion activities and maintenance of health across the lifespan.

This category emphasizes:
• Growth and development principles
• Health screening and assessment techniques
• Disease prevention strategies
• Health education and counseling
• Lifestyle modifications for optimal health

Approximately 6-12% of NCLEX-RN questions come from this category. Mastering these concepts will prepare you to educate patients and families about health maintenance and disease prevention strategies.`,
      keyPoints: [
        'Developmental milestones across lifespan','Health screening guidelines','Immunization schedules','Nutrition and lifestyle counseling','Health education principles'
      ]
    }
  };

  const currentContent = studyContent?.[activeSection] || studyContent?.['safe-care'];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10 border-success/20';
      case 'Intermediate': return 'text-accent bg-accent/10 border-accent/20';
      case 'Advanced': return 'text-error bg-error/10 border-error/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {currentContent?.overview}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Target" size={20} className="mr-2 text-primary" />
                Key Learning Points
              </h4>
              <ul className="space-y-2">
                {currentContent?.keyPoints?.map((point, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'interactive':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-medical p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Quick Quiz</h4>
                    <p className="text-sm text-muted-foreground">Test your knowledge</p>
                  </div>
                </div>
                <p className="text-foreground mb-4">
                  Interactive questions to reinforce key concepts and identify knowledge gaps.
                </p>
                <Button variant="outline" className="w-full">
                  <Icon name="Play" size={16} className="mr-2" />
                  Start Quiz
                </Button>
              </div>

              <div className="card-medical p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Puzzle" size={20} className="text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Drag & Drop</h4>
                    <p className="text-sm text-muted-foreground">Interactive exercises</p>
                  </div>
                </div>
                <p className="text-foreground mb-4">
                  Practice medication calculations and care prioritization through interactive exercises.
                </p>
                <Button variant="outline" className="w-full">
                  <Icon name="MousePointer" size={16} className="mr-2" />
                  Try Exercise
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-success/5 rounded-lg p-6 border border-primary/10">
              <h4 className="font-semibold text-foreground mb-3 flex items-center">
                <Icon name="Lightbulb" size={20} className="mr-2 text-accent" />
                Interactive Learning Tip
              </h4>
              <p className="text-foreground">
                Active engagement with content improves retention by up to 75%. Use these interactive elements to reinforce your understanding and identify areas that need more focus.
              </p>
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  title: 'Infection Control Fundamentals',
                  duration: '12:45',
                  thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop',
                  description: 'Comprehensive overview of infection control principles and practices in healthcare settings.'
                },
                {
                  title: 'Delegation and Supervision',
                  duration: '18:30',
                  thumbnail: 'https://images.pexels.com/photos/7089020/pexels-photo-7089020.jpeg?w=400&h=225&fit=crop',
                  description: 'Learn effective delegation strategies and supervision techniques for nursing practice.'
                },
                {
                  title: 'Quality Improvement Methods',
                  duration: '15:20',
                  thumbnail: 'https://images.pixabay.com/photo/2017/10/26/19/28/healthcare-2888980_1280.jpg?w=400&h=225&fit=crop',
                  description: 'Explore quality improvement methodologies and their application in healthcare.'
                }
              ]?.map((video, index) => (
                <div key={index} className="card-medical overflow-hidden">
                  <div className="relative">
                    <img 
                      src={video?.thumbnail} 
                      alt={video?.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button variant="default" size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
                        <Icon name="Play" size={24} className="text-white" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video?.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-foreground mb-2">{video?.title}</h4>
                    <p className="text-sm text-muted-foreground">{video?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'audio':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-6 border border-accent/20">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Headphones" size={24} className="text-accent" />
                <div>
                  <h3 className="font-semibold text-foreground">Audio Learning</h3>
                  <p className="text-sm text-muted-foreground">Perfect for studying on-the-go</p>
                </div>
              </div>
              <p className="text-foreground mb-4">
                Listen to comprehensive audio summaries of key concepts. Great for commuting, exercising, or reviewing before bed.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Safe Care Environment - Complete Overview', duration: '25:30', plays: '1.2k' },
                { title: 'Infection Control Protocols', duration: '18:45', plays: '890' },
                { title: 'Leadership in Nursing Practice', duration: '22:15', plays: '756' }
              ]?.map((audio, index) => (
                <div key={index} className="card-medical p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm">
                        <Icon name="Play" size={16} />
                      </Button>
                      <div>
                        <h4 className="font-medium text-foreground">{audio?.title}</h4>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <span>{audio?.duration}</span>
                          <span>•</span>
                          <span>{audio?.plays} plays</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cases':
        return (
          <div className="space-y-6">
            <div className="card-medical p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="FileText" size={24} className="text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Interactive Case Study</h3>
                  <p className="text-sm text-muted-foreground">Apply your knowledge to real scenarios</p>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-foreground mb-2">Case Scenario:</h4>
                <p className="text-foreground leading-relaxed">
                  You are a charge nurse on a medical-surgical unit. During your shift, you notice that a newly hired RN is struggling with time management and appears overwhelmed with her patient assignment. She has 6 patients, including one post-operative patient requiring frequent vital signs monitoring and another patient with diabetes requiring insulin administration.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground">What is your priority action?</h4>
                <div className="space-y-2">
                  {[
                    'Reassign some of her patients to other nurses',
                    'Provide guidance and support while monitoring her progress',
                    'Report the situation to the nurse manager immediately',
                    'Take over the most complex patients yourself'
                  ]?.map((option, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                          <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                        </div>
                        <span className="text-foreground">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Button variant="default" className="mr-3">
                  Submit Answer
                </Button>
                <Button variant="outline">
                  Show Explanation
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-background">
      {/* Content Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">{currentContent?.title}</h1>
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentContent?.difficulty)}`}>
                {currentContent?.difficulty}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Icon 
                  name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
                  size={16} 
                  className={isBookmarked ? "text-accent" : ""} 
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotes(!showNotes)}
              >
                <Icon name="StickyNote" size={16} />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Estimated time: {currentContent?.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>2,847 students completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} />
              <span>4.8/5 rating</span>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {contentTabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-background text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Content Area */}
      <div className="p-6">
        <div className="max-w-4xl">
          {renderTabContent()}
        </div>
      </div>
      {/* Notes Panel */}
      {showNotes && (
        <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-elevation z-20">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">My Notes</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotes(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
          <div className="p-4 h-full">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
              placeholder="Add your notes here..."
              className="w-full h-full resize-none border border-border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyContentArea;