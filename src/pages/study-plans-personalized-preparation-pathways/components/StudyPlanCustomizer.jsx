import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudyPlanCustomizer = ({ plan, isOpen, onClose, onSave }) => {
  const [customPlan, setCustomPlan] = useState({
    name: plan?.name || '',
    duration: plan?.duration || '',
    dailyTime: plan?.dailyTime || '',
    startDate: '',
    preferences: {
      morningStudy: false,
      eveningStudy: false,
      weekendIntensive: false,
      breakReminders: true,
      mobileSync: true
    },
    focusAreas: plan?.focusAreas || [],
    studyMethods: plan?.studyMethods || [],
    restDays: []
  });

  const handleInputChange = (field, value) => {
    setCustomPlan(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (preference, checked) => {
    setCustomPlan(prev => ({
      ...prev,
      preferences: {
        ...prev?.preferences,
        [preference]: checked
      }
    }));
  };

  const handleArrayChange = (field, value, checked) => {
    setCustomPlan(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev?.[field], value]
        : prev?.[field]?.filter(item => item !== value)
    }));
  };

  const handleSave = () => {
    onSave(customPlan);
    onClose();
  };

  const focusAreaOptions = [
    { value: 'safe-care', label: 'Safe & Effective Care Environment' },
    { value: 'health-promotion', label: 'Health Promotion & Maintenance' },
    { value: 'psychosocial', label: 'Psychosocial Integrity' },
    { value: 'physiological', label: 'Physiological Integrity' },
    { value: 'critical-thinking', label: 'Critical Thinking Skills' },
    { value: 'test-strategies', label: 'Test-Taking Strategies' }
  ];

  const studyMethodOptions = [
    { value: 'reading', label: 'Reading & Notes', icon: 'BookOpen' },
    { value: 'practice-questions', label: 'Practice Questions', icon: 'FileText' },
    { value: 'video-lectures', label: 'Video Lectures', icon: 'Play' },
    { value: 'flashcards', label: 'Flashcards', icon: 'Layers' },
    { value: 'group-study', label: 'Group Study', icon: 'Users' },
    { value: 'case-studies', label: 'Case Studies', icon: 'Stethoscope' }
  ];

  const restDayOptions = [
    { value: 'sunday', label: 'Sunday' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl shadow-elevation max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-medical-authority">Customize Your Study Plan</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          <p className="text-text-secondary mt-2">Tailor your study plan to fit your schedule and preferences</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Settings */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Basic Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Plan Name"
                value={customPlan?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                placeholder="My Custom NCLEX Plan"
              />
              
              <Input
                type="date"
                label="Start Date"
                value={customPlan?.startDate}
                onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                min={new Date()?.toISOString()?.split('T')?.[0]}
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Study Duration</label>
                <div className="space-y-2">
                  {['4 weeks', '8 weeks', '12 weeks', '16 weeks', 'Custom']?.map((duration) => (
                    <label key={duration} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="duration"
                        value={duration}
                        checked={customPlan?.duration === duration}
                        onChange={(e) => handleInputChange('duration', e?.target?.value)}
                      />
                      <span className="text-sm text-foreground">{duration}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Daily Study Time</label>
                <div className="space-y-2">
                  {['1-2 hours', '3-4 hours', '5-6 hours', '7+ hours']?.map((time) => (
                    <label key={time} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="dailyTime"
                        value={time}
                        checked={customPlan?.dailyTime === time}
                        onChange={(e) => handleInputChange('dailyTime', e?.target?.value)}
                      />
                      <span className="text-sm text-foreground">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Study Preferences */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Study Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Schedule Preferences</h4>
                <div className="space-y-2">
                  <Checkbox
                    label="Morning Study Sessions (6 AM - 12 PM)"
                    checked={customPlan?.preferences?.morningStudy}
                    onChange={(e) => handlePreferenceChange('morningStudy', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Evening Study Sessions (6 PM - 10 PM)"
                    checked={customPlan?.preferences?.eveningStudy}
                    onChange={(e) => handlePreferenceChange('eveningStudy', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Weekend Intensive Sessions"
                    checked={customPlan?.preferences?.weekendIntensive}
                    onChange={(e) => handlePreferenceChange('weekendIntensive', e?.target?.checked)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">App Features</h4>
                <div className="space-y-2">
                  <Checkbox
                    label="Break Reminders"
                    checked={customPlan?.preferences?.breakReminders}
                    onChange={(e) => handlePreferenceChange('breakReminders', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Mobile Calendar Sync"
                    checked={customPlan?.preferences?.mobileSync}
                    onChange={(e) => handlePreferenceChange('mobileSync', e?.target?.checked)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Focus Areas</h3>
            <p className="text-sm text-text-secondary">Select areas that need extra attention</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {focusAreaOptions?.map((area) => (
                <Checkbox
                  key={area?.value}
                  label={area?.label}
                  checked={customPlan?.focusAreas?.includes(area?.value)}
                  onChange={(e) => handleArrayChange('focusAreas', area?.value, e?.target?.checked)}
                  className="p-3 border border-border rounded-lg hover:bg-muted/50"
                />
              ))}
            </div>
          </div>

          {/* Study Methods */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Preferred Study Methods</h3>
            <p className="text-sm text-text-secondary">Choose your favorite learning approaches</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyMethodOptions?.map((method) => (
                <label
                  key={method?.value}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    customPlan?.studyMethods?.includes(method?.value)
                      ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={customPlan?.studyMethods?.includes(method?.value)}
                    onChange={(e) => handleArrayChange('studyMethods', method?.value, e?.target?.checked)}
                    className="sr-only"
                  />
                  <Icon name={method?.icon} size={20} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{method?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rest Days */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Rest Days</h3>
            <p className="text-sm text-text-secondary">Select days when you prefer lighter study loads or complete rest</p>
            
            <div className="flex flex-wrap gap-3">
              {restDayOptions?.map((day) => (
                <label
                  key={day?.value}
                  className={`px-4 py-2 border rounded-lg cursor-pointer transition-all duration-200 ${
                    customPlan?.restDays?.includes(day?.value)
                      ? 'border-primary bg-primary/5 text-primary' :'border-border hover:bg-muted/50 text-foreground'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={customPlan?.restDays?.includes(day?.value)}
                    onChange={(e) => handleArrayChange('restDays', day?.value, e?.target?.checked)}
                    className="sr-only"
                  />
                  <span className="text-sm font-medium">{day?.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="space-x-3">
            <Button variant="outline">
              <Icon name="Eye" size={16} className="mr-2" />
              Preview Plan
            </Button>
            <Button variant="default" onClick={handleSave} className="btn-medical-primary">
              <Icon name="Save" size={16} className="mr-2" />
              Save Custom Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanCustomizer;