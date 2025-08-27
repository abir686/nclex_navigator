import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const getBadgeStyle = (type, isUnlocked) => {
    const baseStyle = "relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105";
    
    if (!isUnlocked) {
      return `${baseStyle} bg-muted/30 border-muted text-muted-foreground opacity-60`;
    }

    const styles = {
      streak: `${baseStyle} bg-gradient-to-br from-confidence-green/10 to-confidence-green/5 border-confidence-green/30 text-confidence-green`,
      milestone: `${baseStyle} bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 text-primary`,
      mastery: `${baseStyle} bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30 text-accent`,
      special: `${baseStyle} bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/30 text-purple-500`
    };
    
    return styles?.[type] || styles?.milestone;
  };

  const getBadgeIcon = (type) => {
    const icons = {
      streak: 'Flame',
      milestone: 'Award',
      mastery: 'Crown',
      special: 'Star'
    };
    return icons?.[type] || 'Award';
  };

  return (
    <div className="card-medical p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-medical-authority">Achievement Badges</h3>
          <p className="text-sm text-text-secondary">Celebrate your milestones</p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-confidence-green font-medium">{achievements?.filter(a => a?.isUnlocked)?.length}</span>
          <span className="text-text-secondary">of {achievements?.length} unlocked</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {achievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={getBadgeStyle(achievement?.type, achievement?.isUnlocked)}
          >
            {achievement?.isUnlocked && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-confidence-green rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" strokeWidth={3} />
              </div>
            )}
            
            <div className="text-center">
              <div className="mb-3">
                <Icon 
                  name={getBadgeIcon(achievement?.type)} 
                  size={32} 
                  className={achievement?.isUnlocked ? '' : 'opacity-50'} 
                />
              </div>
              <h4 className="font-medium text-sm mb-1">{achievement?.title}</h4>
              <p className="text-xs opacity-80 mb-2">{achievement?.description}</p>
              
              {achievement?.progress !== undefined && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{achievement?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${achievement?.progress}%`,
                        backgroundColor: achievement?.isUnlocked ? 'var(--color-confidence-green)' : 'var(--color-muted-foreground)'
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              {achievement?.unlockedDate && (
                <div className="text-xs text-text-secondary mt-2">
                  Unlocked: {achievement?.unlockedDate}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-primary/5 to-confidence-green/5 rounded-lg p-4 border border-primary/20">
        <div className="flex items-center space-x-3 mb-2">
          <Icon name="Target" size={20} className="text-primary" />
          <h4 className="font-medium text-medical-authority">Next Achievement</h4>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Study Warrior</p>
            <p className="text-xs text-text-secondary">Complete 14-day study streak</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">7/14</div>
            <div className="text-xs text-text-secondary">days</div>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-3">
          <div className="w-1/2 h-2 bg-primary rounded-full transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;