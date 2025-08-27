import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AssessmentModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    currentLevel: '',
    studyTime: '',
    testDate: '',
    learningPreferences: [],
    weakAreas: [],
    studyEnvironment: '',
    previousAttempts: '',
    motivationLevel: ''
  });

  const totalSteps = 6;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev?.[field], value]
        : prev?.[field]?.filter(item => item !== value)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(formData);
    onClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Icon name="BookOpen" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-medical-authority mb-2">Current Knowledge Level</h3>
              <p className="text-text-secondary">Help us understand your current preparation status</p>
            </div>
            <div className="space-y-4">
              {[
                { value: 'beginner', label: 'Just Starting', desc: 'New to NCLEX preparation' },
                { value: 'intermediate', label: 'Some Preparation', desc: 'Studied for 1-3 months' },
                { value: 'advanced', label: 'Well Prepared', desc: 'Studied for 3+ months' },
                { value: 'review', label: 'Final Review', desc: 'Ready for final preparation' }
              ]?.map((option) => (
                <label key={option?.value} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="currentLevel"
                    value={option?.value}
                    checked={formData?.currentLevel === option?.value}
                    onChange={(e) => handleInputChange('currentLevel', e?.target?.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-foreground">{option?.label}</div>
                    <div className="text-sm text-text-secondary">{option?.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Icon name="Clock" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-medical-authority mb-2">Study Time Availability</h3>
              <p className="text-text-secondary">How much time can you dedicate daily?</p>
            </div>
            <div className="space-y-4">
              {[
                { value: '1-2', label: '1-2 hours/day', desc: 'Light study schedule' },
                { value: '3-4', label: '3-4 hours/day', desc: 'Moderate study schedule' },
                { value: '5-6', label: '5-6 hours/day', desc: 'Intensive study schedule' },
                { value: '7+', label: '7+ hours/day', desc: 'Full-time preparation' }
              ]?.map((option) => (
                <label key={option?.value} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <input
                    type="radio"
                    name="studyTime"
                    value={option?.value}
                    checked={formData?.studyTime === option?.value}
                    onChange={(e) => handleInputChange('studyTime', e?.target?.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-foreground">{option?.label}</div>
                    <div className="text-sm text-text-secondary">{option?.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Icon name="Calendar" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-medical-authority mb-2">Target Test Date</h3>
              <p className="text-text-secondary">When are you planning to take the NCLEX?</p>
            </div>
            <div className="space-y-4">
              <Input
                type="date"
                label="Preferred Test Date"
                value={formData?.testDate}
                onChange={(e) => handleInputChange('testDate', e?.target?.value)}
                min={new Date()?.toISOString()?.split('T')?.[0]}
                className="w-full"
              />
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Info" size={16} className="text-primary" />
                  <span className="text-sm font-medium">Recommendation</span>
                </div>
                <p className="text-sm text-text-secondary">
                  We recommend allowing at least 8-12 weeks for comprehensive preparation, depending on your current level.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Icon name="Brain" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-medical-authority mb-2">Learning Preferences</h3>
              <p className="text-text-secondary">How do you learn best? (Select all that apply)</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'visual', label: 'Visual Learning', desc: 'Charts, diagrams, and infographics' },
                { value: 'auditory', label: 'Auditory Learning', desc: 'Lectures and audio content' },
                { value: 'reading', label: 'Reading/Writing', desc: 'Text-based materials and notes' },
                { value: 'kinesthetic', label: 'Hands-on Practice', desc: 'Interactive exercises and simulations' },
                { value: 'group', label: 'Group Study', desc: 'Study groups and peer discussions' },
                { value: 'self-paced', label: 'Self-Paced', desc: 'Independent study at your own speed' }
              ]?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={
                    <div>
                      <div className="font-medium text-foreground">{option?.label}</div>
                      <div className="text-sm text-text-secondary">{option?.desc}</div>
                    </div>
                  }
                  checked={formData?.learningPreferences?.includes(option?.value)}
                  onChange={(e) => handleCheckboxChange('learningPreferences', option?.value, e?.target?.checked)}
                  className="p-3 border border-border rounded-lg hover:bg-muted/50"
                />
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Icon name="Target" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-medical-authority mb-2">Areas of Focus</h3>
              <p className="text-text-secondary">Which areas need the most attention?</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'safe-care', label: 'Safe & Effective Care Environment', desc: 'Management of care, safety protocols' },
                { value: 'health-promotion', label: 'Health Promotion & Maintenance', desc: 'Growth, development, prevention' },
                { value: 'psychosocial', label: 'Psychosocial Integrity', desc: 'Coping mechanisms, mental health' },
                { value: 'physiological', label: 'Physiological Integrity', desc: 'Basic care, pharmacology, reduction of risk' },
                { value: 'critical-thinking', label: 'Critical Thinking', desc: 'Analysis and decision-making skills' },
                { value: 'test-taking', label: 'Test-Taking Strategies', desc: 'NCLEX format and approach techniques' }
              ]?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={
                    <div>
                      <div className="font-medium text-foreground">{option?.label}</div>
                      <div className="text-sm text-text-secondary">{option?.desc}</div>
                    </div>
                  }
                  checked={formData?.weakAreas?.includes(option?.value)}
                  onChange={(e) => handleCheckboxChange('weakAreas', option?.value, e?.target?.checked)}
                  className="p-3 border border-border rounded-lg hover:bg-muted/50"
                />
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Icon name="Settings" size={48} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-medical-authority mb-2">Study Preferences</h3>
              <p className="text-text-secondary">Final details to personalize your plan</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Preferred Study Environment</label>
                <div className="space-y-2">
                  {[
                    { value: 'quiet', label: 'Quiet Environment' },
                    { value: 'background-music', label: 'Background Music' },
                    { value: 'group-setting', label: 'Group Setting' },
                    { value: 'flexible', label: 'Flexible/Mixed' }
                  ]?.map((option) => (
                    <label key={option?.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="studyEnvironment"
                        value={option?.value}
                        checked={formData?.studyEnvironment === option?.value}
                        onChange={(e) => handleInputChange('studyEnvironment', e?.target?.value)}
                      />
                      <span className="text-sm text-foreground">{option?.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Previous NCLEX Attempts</label>
                <div className="space-y-2">
                  {[
                    { value: 'first-time', label: 'First Time Taking NCLEX' },
                    { value: 'second-attempt', label: 'Second Attempt' },
                    { value: 'multiple', label: 'Multiple Attempts' }
                  ]?.map((option) => (
                    <label key={option?.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="previousAttempts"
                        value={option?.value}
                        checked={formData?.previousAttempts === option?.value}
                        onChange={(e) => handleInputChange('previousAttempts', e?.target?.value)}
                      />
                      <span className="text-sm text-foreground">{option?.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-elevation max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-medical-authority">Personalized Assessment</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-text-secondary">Step {currentStep} of {totalSteps}</span>
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-confidence h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          {renderStepContent()}
        </div>

        <div className="p-6 border-t border-border flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Previous
          </Button>
          
          {currentStep === totalSteps ? (
            <Button
              variant="default"
              onClick={handleComplete}
              className="btn-medical-primary"
            >
              Generate My Plan
              <Icon name="Sparkles" size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={nextStep}
              className="btn-medical-primary"
            >
              Next
              <Icon name="ChevronRight" size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;