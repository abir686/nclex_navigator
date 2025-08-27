import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeaknessHeatMap = ({ weaknessData }) => {
  const getIntensityColor = (intensity) => {
    const colors = {
      high: 'bg-error/20 border-error/30 text-error',
      medium: 'bg-warning/20 border-warning/30 text-warning',
      low: 'bg-success/20 border-success/30 text-success'
    };
    return colors?.[intensity] || colors?.medium;
  };

  const getIntensityIcon = (intensity) => {
    const icons = {
      high: 'AlertTriangle',
      medium: 'AlertCircle',
      low: 'CheckCircle'
    };
    return icons?.[intensity] || icons?.medium;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      urgent: 'bg-error text-white',
      important: 'bg-warning text-white',
      moderate: 'bg-primary text-white'
    };
    return badges?.[priority] || badges?.moderate;
  };

  return (
    <div className="card-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-medical-authority">Weakness Analysis</h3>
          <p className="text-sm text-text-secondary">Areas requiring focused attention</p>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Filter" size={16} className="mr-2" />
          Filter
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {weaknessData?.map((weakness) => (
          <div
            key={weakness?.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-medical ${getIntensityColor(weakness?.intensity)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name={getIntensityIcon(weakness?.intensity)} size={18} />
                <h4 className="font-medium text-sm">{weakness?.topic}</h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(weakness?.priority)}`}>
                {weakness?.priority}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span>Accuracy</span>
                <span className="font-medium">{weakness?.accuracy}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${weakness?.accuracy}%`,
                    backgroundColor: weakness?.accuracy >= 70 ? 'var(--color-confidence-green)' : 
                                   weakness?.accuracy >= 50 ? 'var(--color-encouragement-amber)': 'var(--color-error)'
                  }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
              <span>{weakness?.questionsAttempted} questions</span>
              <span>{weakness?.timeSpent} hours studied</span>
            </div>

            <Link
              to="/complete-study-guide-nclex-mastery-center"
              className="inline-flex items-center space-x-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <Icon name="BookOpen" size={14} />
              <span>Study Materials</span>
              <Icon name="ExternalLink" size={12} />
            </Link>
          </div>
        ))}
      </div>
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Icon name="Lightbulb" size={20} className="text-accent" />
          <h4 className="font-medium text-medical-authority">Improvement Recommendations</h4>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
            <span>Focus on Pharmacology - your weakest area with 45% accuracy</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
            <span>Practice more Pediatric Nursing questions to improve from 62%</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
            <span>Review Infection Control concepts - trending downward</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeaknessHeatMap;