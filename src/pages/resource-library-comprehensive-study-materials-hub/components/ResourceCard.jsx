import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onSave, onShare, onPreview, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(resource?.isSaved || false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(resource?.id, !isSaved);
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      'Study Guides': 'BookOpen',
      'Quick Reference': 'FileText',
      'Medication Sheets': 'Pill',
      'Lab Values': 'TestTube',
      'Flashcards': 'CreditCard',
      'Practice Questions': 'HelpCircle',
      'Video Content': 'Play',
      'Audio Reviews': 'Headphones'
    };
    return iconMap?.[type] || 'File';
  };

  const getDifficultyColor = (difficulty) => {
    const colorMap = {
      'Beginner': 'text-green-600 bg-green-50 border-green-200',
      'Intermediate': 'text-blue-600 bg-blue-50 border-blue-200',
      'Advanced': 'text-orange-600 bg-orange-50 border-orange-200',
      'Expert': 'text-red-600 bg-red-50 border-red-200'
    };
    return colorMap?.[difficulty] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatDownloads = (count) => {
    if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}k`;
    }
    return count?.toString();
  };

  return (
    <div 
      className="card-medical group cursor-pointer transition-all duration-300 hover:shadow-elevation hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image/Preview */}
      <div className="relative overflow-hidden rounded-t-xl h-48 bg-gradient-to-br from-primary/5 to-secondary/5">
        {resource?.thumbnail ? (
          <Image
            src={resource?.thumbnail}
            alt={resource?.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon 
              name={getTypeIcon(resource?.type)} 
              size={48} 
              className="text-primary/30" 
            />
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className={`
          absolute inset-0 bg-black/60 flex items-center justify-center space-x-3
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPreview(resource)}
          >
            <Icon name="Eye" size={16} className="mr-2" />
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onDownload(resource)}
          >
            <Icon name="Download" size={16} className="mr-2" />
            Download
          </Button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`
            absolute top-3 right-3 p-2 rounded-full transition-all duration-200
            ${isSaved 
              ? 'bg-red-500 text-white shadow-md' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
            }
          `}
        >
          <Icon name={isSaved ? "Heart" : "Heart"} size={16} fill={isSaved ? "currentColor" : "none"} />
        </button>

        {/* New Badge */}
        {resource?.isNew && (
          <div className="absolute top-3 left-3 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
            New
          </div>
        )}

        {/* Featured Badge */}
        {resource?.isFeatured && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            <Icon name="Star" size={12} className="mr-1" />
            Featured
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Type and Difficulty */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name={getTypeIcon(resource?.type)} size={14} className="text-primary" />
            <span className="text-xs font-medium text-text-secondary">{resource?.type}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(resource?.difficulty)}`}>
            {resource?.difficulty}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {resource?.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {resource?.description}
        </p>

        {/* Specialty Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {resource?.specialties?.slice(0, 2)?.map((specialty) => (
            <span
              key={specialty}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
          {resource?.specialties?.length > 2 && (
            <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full">
              +{resource?.specialties?.length - 2} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-yellow-500" fill="currentColor" />
              <span>{resource?.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={14} />
              <span>{formatDownloads(resource?.downloads)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onShare(resource)}
              className="p-1 hover:text-primary transition-colors duration-200"
            >
              <Icon name="Share2" size={14} />
            </button>
            <span className="text-xs">{resource?.fileSize}</span>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="User" size={12} className="text-primary" />
          </div>
          <span className="text-xs text-text-secondary">by {resource?.author}</span>
          <div className="flex-1" />
          <span className="text-xs text-text-secondary">{resource?.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;