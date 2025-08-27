import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomQuizBuilder = ({ onStartCustomQuiz, onBack }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [difficulty, setDifficulty] = useState('mixed');
  const [questionCount, setQuestionCount] = useState('25');
  const [timeLimit, setTimeLimit] = useState('unlimited');
  const [showRationales, setShowRationales] = useState(true);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(false);

  const categories = [
    { id: 'safe-care', name: 'Safe and Effective Care Environment', questions: 245, percentage: 20 },
    { id: 'health-promotion', name: 'Health Promotion and Maintenance', questions: 189, questions: 15 },
    { id: 'psychosocial', name: 'Psychosocial Integrity', questions: 156, percentage: 12 },
    { id: 'physiological', name: 'Physiological Integrity', questions: 410, percentage: 53 }
  ];

  const subcategories = {
    'safe-care': [
      'Management of Care',
      'Safety and Infection Control'
    ],
    'health-promotion': [
      'Growth and Development',
      'Prevention and Early Detection'
    ],
    'psychosocial': [
      'Coping and Adaptation',
      'Mental Health Concepts'
    ],
    'physiological': [
      'Basic Care and Comfort',
      'Pharmacological Therapies',
      'Reduction of Risk Potential',
      'Physiological Adaptation'
    ]
  };

  const difficultyOptions = [
    { value: 'mixed', label: 'Mixed Difficulty' },
    { value: 'easy', label: 'Easy Questions Only' },
    { value: 'medium', label: 'Medium Questions Only' },
    { value: 'hard', label: 'Hard Questions Only' }
  ];

  const questionCountOptions = [
    { value: '10', label: '10 Questions (Quick Practice)' },
    { value: '25', label: '25 Questions (Standard)' },
    { value: '50', label: '50 Questions (Extended)' },
    { value: '75', label: '75 Questions (NCLEX Length)' },
    { value: '100', label: '100 Questions (Comprehensive)' }
  ];

  const timeLimitOptions = [
    { value: 'unlimited', label: 'Unlimited Time' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev?.includes(categoryId) 
        ? prev?.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleStartQuiz = () => {
    const quizConfig = {
      categories: selectedCategories,
      difficulty,
      questionCount: parseInt(questionCount),
      timeLimit: timeLimit === 'unlimited' ? null : parseInt(timeLimit) * 60,
      showRationales,
      adaptiveDifficulty
    };
    onStartCustomQuiz(quizConfig);
  };

  const isValid = selectedCategories?.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Back to Test Modes
        </Button>
        <h2 className="text-2xl font-bold text-medical-authority mb-2">Custom Quiz Builder</h2>
        <p className="text-text-secondary">Create a personalized practice test targeting your specific study needs</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Selection */}
          <div className="card-medical p-6">
            <h3 className="text-lg font-semibold text-medical-authority mb-4">Select NCLEX Categories</h3>
            <p className="text-sm text-text-secondary mb-4">
              Choose the nursing categories you want to focus on. Select multiple categories for comprehensive practice.
            </p>
            
            <div className="space-y-4">
              {categories?.map((category) => (
                <div key={category?.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedCategories?.includes(category?.id)}
                      onChange={() => handleCategoryToggle(category?.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-medical-authority">{category?.name}</h4>
                        <span className="text-sm text-text-secondary">{category?.percentage}% of NCLEX</span>
                      </div>
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-sm text-text-secondary">{category?.questions} questions available</span>
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${category?.percentage * 2}%` }}
                          />
                        </div>
                      </div>
                      
                      {selectedCategories?.includes(category?.id) && (
                        <div className="mt-3 pl-4 border-l-2 border-primary/20">
                          <p className="text-xs text-text-secondary mb-2">Subcategories included:</p>
                          <div className="flex flex-wrap gap-2">
                            {subcategories?.[category?.id]?.map((sub, index) => (
                              <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                {sub}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Settings */}
          <div className="card-medical p-6">
            <h3 className="text-lg font-semibold text-medical-authority mb-4">Quiz Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Select
                  label="Difficulty Level"
                  description="Choose the complexity of questions"
                  options={difficultyOptions}
                  value={difficulty}
                  onChange={setDifficulty}
                />
              </div>

              <div>
                <Select
                  label="Number of Questions"
                  description="Select quiz length"
                  options={questionCountOptions}
                  value={questionCount}
                  onChange={setQuestionCount}
                />
              </div>

              <div>
                <Select
                  label="Time Limit"
                  description="Set time constraints"
                  options={timeLimitOptions}
                  value={timeLimit}
                  onChange={setTimeLimit}
                />
              </div>

              <div className="space-y-4">
                <Checkbox
                  label="Show Rationales"
                  description="Display explanations after each question"
                  checked={showRationales}
                  onChange={(e) => setShowRationales(e?.target?.checked)}
                />
                
                <Checkbox
                  label="Adaptive Difficulty"
                  description="Adjust question difficulty based on performance"
                  checked={adaptiveDifficulty}
                  onChange={(e) => setAdaptiveDifficulty(e?.target?.checked)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          {/* Quiz Summary */}
          <div className="card-medical p-6">
            <h3 className="text-lg font-semibold text-medical-authority mb-4">Quiz Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Categories:</span>
                <span className="font-medium">{selectedCategories?.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Questions:</span>
                <span className="font-medium">{questionCount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Time Limit:</span>
                <span className="font-medium">
                  {timeLimit === 'unlimited' ? 'Unlimited' : `${timeLimit} min`}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Difficulty:</span>
                <span className="font-medium capitalize">{difficulty}</span>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    Estimated time: {Math.ceil(parseInt(questionCount) * 1.5)} minutes
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    Difficulty: {difficulty === 'mixed' ? 'Adaptive' : difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="card-medical p-6">
            <h3 className="text-lg font-semibold text-medical-authority mb-4">Quiz Features</h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm">NCLEX-style questions</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm">Detailed explanations</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm">Performance tracking</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Check" size={16} className="text-success" />
                <span className="text-sm">Progress analytics</span>
              </div>
              
              {adaptiveDifficulty && (
                <div className="flex items-center space-x-3">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-sm">Adaptive difficulty</span>
                </div>
              )}
            </div>
          </div>

          {/* Start Button */}
          <Button
            variant="default"
            fullWidth
            onClick={handleStartQuiz}
            disabled={!isValid}
            className="btn-medical-primary"
          >
            <Icon name="Play" size={16} className="mr-2" />
            Start Custom Quiz
          </Button>

          {!isValid && (
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div>
                  <p className="text-sm text-warning font-medium">Selection Required</p>
                  <p className="text-xs text-warning/80 mt-1">
                    Please select at least one category to create your custom quiz.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomQuizBuilder;