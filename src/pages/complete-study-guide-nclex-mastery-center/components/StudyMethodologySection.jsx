import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudyMethodologySection = () => {
  const [activeMethod, setActiveMethod] = useState('spaced-repetition');

  const studyMethods = [
    {
      id: 'spaced-repetition',
      title: 'Spaced Repetition',
      icon: 'RefreshCw',
      description: 'Review material at increasing intervals to maximize long-term retention',
      benefits: [
        'Improves long-term memory retention by up to 200%',
        'Reduces study time while increasing effectiveness',
        'Automatically schedules reviews based on forgetting curve',
        'Adapts to your individual learning pace'
      ],
      howItWorks: `Spaced repetition is based on the psychological spacing effect, where information is more easily recalled if learning sessions are spaced out over time. Our algorithm tracks your performance on each topic and schedules reviews just before you're likely to forget the material.

The system uses these intervals:
• New material: Review after 1 day
• If recalled correctly: Review after 3 days
• Next successful recall: Review after 7 days
• Continue increasing intervals: 14 days, 30 days, 90 days

This method is particularly effective for NCLEX preparation because it helps you retain vast amounts of medical knowledge without overwhelming your working memory.`,
      implementation: 'Our platform automatically implements spaced repetition across all study materials. Simply study normally, and the system will prompt you to review topics at optimal intervals.'
    },
    {
      id: 'active-recall',title: 'Active Recall',icon: 'Brain',description: 'Test yourself frequently instead of passive reading to strengthen memory pathways',
      benefits: [
        'Strengthens neural pathways for better recall','Identifies knowledge gaps immediately','Builds confidence for exam conditions','More effective than highlighting or re-reading'
      ],
      howItWorks: `Active recall involves actively stimulating memory during the learning process. Instead of simply reading notes, you actively attempt to recall information from memory. This process strengthens the neural pathways associated with that information.

Key techniques include:
• Self-testing with flashcards
• Practice questions without looking at answers first
• Explaining concepts out loud
• Teaching material to others
• Creating concept maps from memory

Research shows that active recall is significantly more effective than passive review methods. It forces your brain to work harder to retrieve information, making the memory stronger and more durable.`,
      implementation: 'Use our built-in quiz features, practice questions, and case studies. Try to answer before looking at explanations, and regularly test yourself on previously studied material.'
    },
    {
      id: 'interleaving',title: 'Interleaving',icon: 'Shuffle',description: 'Mix different topics and question types to improve problem-solving skills',
      benefits: [
        'Improves ability to distinguish between concepts','Enhances problem-solving flexibility','Better prepares you for mixed question formats','Reduces interference between similar concepts'
      ],
      howItWorks: `Interleaving involves mixing different topics or types of problems within a single study session, rather than focusing on one topic at a time (blocked practice). This approach may feel more difficult initially, but it leads to better long-term learning and transfer.

For NCLEX preparation, this means:
• Mixing questions from different nursing categories
• Alternating between different types of problems
• Studying related but distinct concepts together
• Practicing various question formats in one session

The slight confusion created by interleaving actually strengthens learning by forcing your brain to actively choose the appropriate strategy for each problem, rather than relying on the context of studying one topic at a time.`,
      implementation: 'Our practice tests automatically interleave questions from different categories. You can also manually create mixed study sessions using our topic selector.'
    },
    {
      id: 'elaborative-interrogation',title: 'Elaborative Interrogation',icon: 'HelpCircle',description: 'Ask "why" and "how" questions to deepen understanding of concepts',
      benefits: [
        'Develops deeper conceptual understanding','Improves critical thinking skills','Helps connect new information to existing knowledge','Enhances ability to apply knowledge in new situations'
      ],
      howItWorks: `Elaborative interrogation involves generating explanations for why facts or concepts are true. Instead of simply memorizing that something is true, you explore the underlying reasons and mechanisms.

Key questions to ask:
• Why is this true?
• How does this work?
• What causes this to happen?
• How does this relate to what I already know?
• What are the implications of this?

For nursing concepts, this might involve understanding not just what to do in a situation, but why that intervention is appropriate, how it works physiologically, and what might happen if you chose a different approach.`,
      implementation: 'Use our detailed explanations and rationales. Before reading the explanation, try to answer why the correct answer is right and why the incorrect options are wrong.'
    }
  ];

  const currentMethod = studyMethods?.find(method => method?.id === activeMethod);

  return (
    <div className="bg-background py-12">
      <div className="container-medical">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-medical-authority mb-4">
            Evidence-Based Study Methodology
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform incorporates proven learning science principles to maximize your study effectiveness and retention. 
            These methods are backed by decades of cognitive psychology research.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Method Selection */}
          <div className="lg:col-span-1">
            <div className="card-medical p-6 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">Study Methods</h3>
              <div className="space-y-2">
                {studyMethods?.map((method) => (
                  <button
                    key={method?.id}
                    onClick={() => setActiveMethod(method?.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 ${
                      activeMethod === method?.id
                        ? 'bg-primary/10 text-primary border border-primary/20' :'hover:bg-muted/50 text-foreground'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activeMethod === method?.id ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={method?.icon} 
                        size={16} 
                        className={activeMethod === method?.id ? 'text-primary' : 'text-muted-foreground'} 
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{method?.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {method?.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Method Details */}
          <div className="lg:col-span-2">
            <div className="card-medical p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name={currentMethod?.icon} size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{currentMethod?.title}</h3>
                  <p className="text-muted-foreground">{currentMethod?.description}</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="CheckCircle" size={20} className="mr-2 text-success" />
                  Key Benefits
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentMethod?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-success/5 rounded-lg border border-success/10">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div className="mb-8">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Lightbulb" size={20} className="mr-2 text-accent" />
                  How It Works
                </h4>
                <div className="prose max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {currentMethod?.howItWorks}
                  </p>
                </div>
              </div>

              {/* Implementation */}
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="Settings" size={20} className="mr-2 text-primary" />
                  How We Implement This
                </h4>
                <p className="text-foreground mb-4">{currentMethod?.implementation}</p>
                <Button variant="default" className="btn-medical-primary">
                  <Icon name="Play" size={16} className="mr-2" />
                  Try This Method Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Research Citation */}
        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-6 max-w-4xl mx-auto">
            <Icon name="GraduationCap" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">Research-Backed Approach</h3>
            <p className="text-sm text-muted-foreground">
              These methodologies are based on extensive research in cognitive psychology and educational science. 
              Studies consistently show that students using these techniques achieve 20-40% better retention rates 
              compared to traditional study methods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMethodologySection;