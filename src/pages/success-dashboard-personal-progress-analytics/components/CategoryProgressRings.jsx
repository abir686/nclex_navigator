import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryProgressRings = ({ categories }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'var(--color-confidence-green)';
    if (progress >= 60) return 'var(--color-encouragement-amber)';
    return 'var(--color-error)';
  };

  const createProgressRing = (progress, size = 60) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return {
      circumference,
      strokeDasharray,
      strokeDashoffset,
      radius
    };
  };

  return (
    <div className="card-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-medical-authority">NCLEX Categories</h3>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Target" size={16} />
          <span>Domain Progress</span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories?.map((category) => {
          const ringData = createProgressRing(category?.progress);
          
          return (
            <div key={category?.id} className="text-center">
              <div className="relative inline-block mb-3">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r={ringData?.radius}
                    stroke="var(--color-muted)"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r={ringData?.radius}
                    stroke={getProgressColor(category?.progress)}
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={ringData?.strokeDasharray}
                    strokeDashoffset={ringData?.strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name={category?.icon} size={20} className="text-primary" />
                </div>
              </div>
              <h4 className="font-medium text-sm text-medical-authority mb-1">{category?.name}</h4>
              <div className="text-lg font-bold" style={{ color: getProgressColor(category?.progress) }}>
                {category?.progress}%
              </div>
              <p className="text-xs text-text-secondary mt-1">{category?.questionsAnswered} questions</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryProgressRings;