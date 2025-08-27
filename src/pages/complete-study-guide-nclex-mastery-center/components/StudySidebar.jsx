import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StudySidebar = ({ activeSection, onSectionChange, isCollapsed, onToggle }) => {
  const [expandedCategories, setExpandedCategories] = useState(['safe-care']);

  const studyCategories = [
    {
      id: 'safe-care',
      title: 'Safe and Effective Care Environment',
      icon: 'Shield',
      progress: 75,
      topics: [
        { id: 'management-care', title: 'Management of Care', completed: true },
        { id: 'safety-infection', title: 'Safety and Infection Control', completed: true },
        { id: 'coordinated-care', title: 'Coordinated Care', completed: false },
        { id: 'quality-improvement', title: 'Quality Improvement', completed: false }
      ]
    },
    {
      id: 'health-promotion',
      title: 'Health Promotion and Maintenance',
      icon: 'Heart',
      progress: 60,
      topics: [
        { id: 'growth-development', title: 'Growth and Development', completed: true },
        { id: 'health-screening', title: 'Health Screening and Assessment', completed: true },
        { id: 'health-promotion-disease', title: 'Health Promotion/Disease Prevention', completed: false },
        { id: 'ante-intra-postpartum', title: 'Ante/Intra/Postpartum Care', completed: false }
      ]
    },
    {
      id: 'psychosocial',
      title: 'Psychosocial Integrity',
      icon: 'Brain',
      progress: 45,
      topics: [
        { id: 'coping-adaptation', title: 'Coping and Adaptation', completed: true },
        { id: 'psychosocial-adaptation', title: 'Psychosocial Adaptation', completed: false },
        { id: 'mental-health', title: 'Mental Health Concepts', completed: false },
        { id: 'therapeutic-communication', title: 'Therapeutic Communication', completed: false }
      ]
    },
    {
      id: 'physiological',
      title: 'Physiological Integrity',
      icon: 'Activity',
      progress: 85,
      topics: [
        { id: 'basic-care-comfort', title: 'Basic Care and Comfort', completed: true },
        { id: 'pharmacological-therapy', title: 'Pharmacological Therapies', completed: true },
        { id: 'reduction-risk', title: 'Reduction of Risk Potential', completed: true },
        { id: 'physiological-adaptation', title: 'Physiological Adaptation', completed: false }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => 
      prev?.includes(categoryId) 
        ? prev?.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTopicClick = (categoryId, topicId) => {
    onSectionChange(`${categoryId}-${topicId}`);
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-card border-r border-border h-full flex flex-col items-center py-4 space-y-4">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
        >
          <Icon name="Menu" size={20} className="text-foreground" />
        </button>
        {studyCategories?.map((category) => (
          <div key={category?.id} className="relative">
            <button
              onClick={() => onSectionChange(category?.id)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                activeSection === category?.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              <Icon name={category?.icon} size={20} />
            </button>
            <div className="absolute -right-1 -top-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">{category?.progress}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Study Guide</h2>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <Icon name="PanelLeftClose" size={20} className="text-foreground" />
          </button>
        </div>
        <div className="mt-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Last updated: August 27, 2025</span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {studyCategories?.map((category) => {
          const isExpanded = expandedCategories?.includes(category?.id);
          const isActive = activeSection === category?.id;

          return (
            <div key={category?.id} className="space-y-1">
              <button
                onClick={() => toggleCategory(category?.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={category?.icon} size={18} />
                  <div className="text-left">
                    <div className="font-medium text-sm">{category?.title}</div>
                    <div className="text-xs text-muted-foreground">{category?.progress}% complete</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${category?.progress}%` }}
                    />
                  </div>
                  <Icon 
                    name="ChevronDown" 
                    size={16} 
                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              {isExpanded && (
                <div className="ml-6 space-y-1">
                  {category?.topics?.map((topic) => (
                    <button
                      key={topic?.id}
                      onClick={() => handleTopicClick(category?.id, topic?.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors duration-200 ${
                        activeSection === `${category?.id}-${topic?.id}` 
                          ? 'bg-primary/5 text-primary' :'hover:bg-muted/50'
                      }`}
                    >
                      <span className="text-left">{topic?.title}</span>
                      <div className="flex items-center space-x-2">
                        {topic?.completed && (
                          <Icon name="Check" size={14} className="text-success" />
                        )}
                        <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="sticky bottom-0 bg-card border-t border-border p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium text-foreground">66%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="h-2 bg-gradient-confidence rounded-full transition-all duration-1000" style={{ width: '66%' }} />
          </div>
          <div className="text-xs text-muted-foreground text-center">
            Keep going! You're making great progress.
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySidebar;