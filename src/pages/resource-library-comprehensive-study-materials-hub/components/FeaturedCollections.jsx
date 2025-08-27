import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedCollections = ({ collections, onViewCollection }) => {
  const getCollectionIcon = (type) => {
    const iconMap = {
      'medications': 'Pill',
      'lab-values': 'TestTube',
      'procedures': 'Activity',
      'assessments': 'Stethoscope',
      'pathophysiology': 'Heart',
      'nursing-skills': 'UserCheck'
    };
    return iconMap?.[type] || 'BookOpen';
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-confidence rounded-lg flex items-center justify-center">
            <Icon name="Star" size={18} color="white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-medical-authority">Featured Collections</h2>
            <p className="text-text-secondary">Curated high-yield study materials</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Grid3X3" size={16} className="mr-2" />
          View All Collections
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections?.map((collection) => (
          <div
            key={collection?.id}
            className="card-medical group cursor-pointer overflow-hidden hover:shadow-elevation transition-all duration-300"
            onClick={() => onViewCollection(collection)}
          >
            {/* Header Image */}
            <div className="relative h-32 bg-gradient-to-br from-primary/10 to-secondary/10">
              {collection?.image ? (
                <Image
                  src={collection?.image}
                  alt={collection?.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon 
                    name={getCollectionIcon(collection?.type)} 
                    size={32} 
                    className="text-primary/40" 
                  />
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-sm">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={14} />
                  <span>{collection?.resourceCount} resources</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} fill="currentColor" />
                  <span>{collection?.rating}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-200">
                  {collection?.title}
                </h3>
                {collection?.isPremium && (
                  <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                    Premium
                  </div>
                )}
              </div>

              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {collection?.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {collection?.tags?.slice(0, 3)?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress Bar (if user has started) */}
              {collection?.progress !== undefined && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                    <span>Progress</span>
                    <span>{collection?.progress}%</span>
                  </div>
                  <div className="progress-medical h-2">
                    <div 
                      className="progress-bar h-full"
                      style={{ width: `${collection?.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-text-secondary">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={14} />
                    <span>{collection?.totalDownloads}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{collection?.studentsUsing}</span>
                  </div>
                </div>
                <span className="text-xs">Updated {collection?.lastUpdated}</span>
              </div>

              {/* Action Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
                onClick={(e) => {
                  e?.stopPropagation();
                  onViewCollection(collection);
                }}
              >
                <Icon name="ArrowRight" size={16} className="mr-2" />
                Explore Collection
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;