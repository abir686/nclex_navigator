import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange, onClearFilters }) => {
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');

  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
    onFilterChange('search', e?.target?.value);
  };

  const handleFilterToggle = (category, value) => {
    const currentFilters = filters?.[category] || [];
    const updatedFilters = currentFilters?.includes(value)
      ? currentFilters?.filter(item => item !== value)
      : [...currentFilters, value];
    onFilterChange(category, updatedFilters);
  };

  const filterCategories = {
    specialty: [
      'Medical-Surgical',
      'Pediatrics',
      'Maternity',
      'Mental Health',
      'Pharmacology',
      'Fundamentals',
      'Community Health',
      'Leadership'
    ],
    contentType: [
      'Study Guides',
      'Quick Reference',
      'Medication Sheets',
      'Lab Values',
      'Flashcards',
      'Practice Questions',
      'Video Content',
      'Audio Reviews'
    ],
    difficulty: [
      'Beginner',
      'Intermediate',
      'Advanced',
      'Expert'
    ],
    studyPhase: [
      'Foundation Building',
      'Content Review',
      'Practice Testing',
      'Final Preparation',
      'Last Minute Review'
    ]
  };

  const getActiveFilterCount = () => {
    return Object.values(filters)?.reduce((count, filterArray) => {
      if (Array.isArray(filterArray)) {
        return count + filterArray?.length;
      }
      return filterArray ? count + 1 : count;
    }, 0);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
        w-80 lg:w-72 bg-card border-r border-border
        transform transition-transform duration-300 z-50 lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={20} className="text-primary" />
              <h3 className="font-semibold text-lg">Filters</h3>
              {getActiveFilterCount() > 0 && (
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={18} />
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          {/* Clear Filters */}
          {getActiveFilterCount() > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="w-full mb-6"
            >
              <Icon name="RotateCcw" size={16} className="mr-2" />
              Clear All Filters
            </Button>
          )}

          {/* Filter Categories */}
          <div className="space-y-6">
            {Object.entries(filterCategories)?.map(([category, options]) => (
              <div key={category} className="space-y-3">
                <h4 className="font-medium text-sm uppercase tracking-wide text-text-secondary">
                  {category?.replace(/([A-Z])/g, ' $1')?.trim()}
                </h4>
                <div className="space-y-2">
                  {options?.map((option) => (
                    <Checkbox
                      key={option}
                      label={option}
                      checked={(filters?.[category] || [])?.includes(option)}
                      onChange={() => handleFilterToggle(category, option)}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Popular Tags */}
          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="font-medium text-sm uppercase tracking-wide text-text-secondary mb-3">
              Popular Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {['High-Yield', 'NCLEX Favorites', 'Quick Review', 'Must-Know', 'Trending']?.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-xs bg-muted hover:bg-primary/10 hover:text-primary rounded-full transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;