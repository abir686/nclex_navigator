import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionInterface = ({ 
  question, 
  onAnswer, 
  onNext, 
  onPrevious, 
  onFlag, 
  onCalculator, 
  onExhibit,
  currentQuestion,
  totalQuestions,
  timeRemaining,
  mode,
  showFeedback,
  selectedAnswer,
  isAnswered
}) => {
  const [localSelectedAnswer, setLocalSelectedAnswer] = useState(selectedAnswer || '');
  const [showCalculator, setShowCalculator] = useState(false);
  const [showExhibit, setShowExhibit] = useState(false);

  useEffect(() => {
    setLocalSelectedAnswer(selectedAnswer || '');
  }, [selectedAnswer, question?.id]);

  const handleAnswerSelect = (answerId) => {
    setLocalSelectedAnswer(answerId);
    onAnswer(answerId);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getAnswerStyle = (answerId) => {
    if (!showFeedback) {
      return localSelectedAnswer === answerId 
        ? 'bg-primary/10 border-primary text-primary' :'bg-card border-border hover:bg-muted/50';
    }

    if (answerId === question?.correctAnswer) {
      return 'bg-success/10 border-success text-success';
    }
    
    if (localSelectedAnswer === answerId && answerId !== question?.correctAnswer) {
      return 'bg-error/10 border-error text-error';
    }

    return 'bg-card border-border opacity-60';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={20} className="text-primary" />
              <span className="font-medium text-medical-authority">
                Question {currentQuestion} of {totalQuestions}
              </span>
            </div>
            {question?.category && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {question?.category}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {mode === 'timed' && (
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                timeRemaining < 300 ? 'bg-error/10 text-error' : 'bg-muted text-text-secondary'
              }`}>
                <Icon name="Clock" size={16} />
                <span className="font-mono text-sm">{formatTime(timeRemaining)}</span>
              </div>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFlag(question?.id)}
              className={question?.flagged ? 'bg-accent/10 text-accent border-accent' : ''}
            >
              <Icon name="Flag" size={16} />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCalculator(!showCalculator)}
            >
              <Icon name="Calculator" size={16} />
            </Button>

            {question?.hasExhibit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExhibit(!showExhibit)}
              >
                <Icon name="FileImage" size={16} />
                Exhibit
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        {/* Main Question Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Question Text */}
            <div className="bg-card rounded-lg p-6 mb-6 shadow-subtle">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">{currentQuestion}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      question?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                      question?.difficulty === 'Medium'? 'bg-accent/10 text-accent' : 'bg-error/10 text-error'
                    }`}>
                      {question?.difficulty}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {question?.type} • {question?.points} point{question?.points !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-medical-authority leading-relaxed whitespace-pre-line">
                    {question?.text}
                  </p>
                </div>
              </div>

              {question?.image && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <img 
                    src={question?.image} 
                    alt="Question illustration" 
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {question?.options?.map((option) => (
                <div
                  key={option?.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${getAnswerStyle(option?.id)}`}
                  onClick={() => !showFeedback && handleAnswerSelect(option?.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {localSelectedAnswer === option?.id && (
                        <div className="w-3 h-3 rounded-full bg-current"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium mr-2">{option?.label}.</span>
                      <span>{option?.text}</span>
                    </div>
                    {showFeedback && option?.id === question?.correctAnswer && (
                      <Icon name="Check" size={20} className="text-success" />
                    )}
                    {showFeedback && localSelectedAnswer === option?.id && option?.id !== question?.correctAnswer && (
                      <Icon name="X" size={20} className="text-error" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Feedback Section */}
            {showFeedback && (
              <div className="bg-card rounded-lg p-6 mb-6 shadow-subtle">
                <div className="flex items-start space-x-3 mb-4">
                  <Icon 
                    name={localSelectedAnswer === question?.correctAnswer ? "CheckCircle" : "XCircle"} 
                    size={24} 
                    className={localSelectedAnswer === question?.correctAnswer ? "text-success" : "text-error"} 
                  />
                  <div>
                    <h3 className="font-semibold text-medical-authority mb-2">
                      {localSelectedAnswer === question?.correctAnswer ? "Correct!" : "Incorrect"}
                    </h3>
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {question?.rationale}
                    </p>
                    
                    {question?.studyLinks && question?.studyLinks?.length > 0 && (
                      <div>
                        <h4 className="font-medium text-medical-authority mb-2">Related Study Materials:</h4>
                        <div className="space-y-2">
                          {question?.studyLinks?.map((link, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="mr-2 mb-2"
                            >
                              <Icon name="BookOpen" size={14} className="mr-2" />
                              {link?.title}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentQuestion === 1}
              >
                <Icon name="ChevronLeft" size={16} className="mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">
                  Progress: {Math.round((currentQuestion / totalQuestions) * 100)}%
                </span>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-confidence transition-all duration-300"
                    style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              <Button
                variant="default"
                onClick={onNext}
                disabled={!isAnswered && mode !== 'review'}
                className="btn-medical-primary"
              >
                {currentQuestion === totalQuestions ? 'Finish Test' : 'Next'}
                <Icon name="ChevronRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calculator Sidebar */}
        {showCalculator && (
          <div className="w-80 bg-card border-l border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-medical-authority">Calculator</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCalculator(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-text-secondary text-sm">Calculator interface would be implemented here</p>
            </div>
          </div>
        )}

        {/* Exhibit Sidebar */}
        {showExhibit && question?.hasExhibit && (
          <div className="w-80 bg-card border-l border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-medical-authority">Exhibit</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExhibit(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Lab Results</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>WBC:</span>
                    <span>12,000/μL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hemoglobin:</span>
                    <span>10.2 g/dL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platelets:</span>
                    <span>180,000/μL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionInterface;