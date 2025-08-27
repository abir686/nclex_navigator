import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const StudyCardGenerator = ({ isOpen, onClose, onGenerate }) => {
  const [cardData, setCardData] = useState({
    title: '',
    content: '',
    category: 'Medical-Surgical',
    difficulty: 'Intermediate',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    'Medical-Surgical',
    'Pediatrics',
    'Maternity',
    'Mental Health',
    'Pharmacology',
    'Fundamentals',
    'Community Health',
    'Leadership'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleAddTag = () => {
    if (newTag?.trim() && !cardData?.tags?.includes(newTag?.trim())) {
      setCardData(prev => ({
        ...prev,
        tags: [...prev?.tags, newTag?.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setCardData(prev => ({
      ...prev,
      tags: prev?.tags?.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleGenerate = async () => {
    if (!cardData?.title?.trim() || !cardData?.content?.trim()) return;
    
    setIsGenerating(true);
    try {
      await onGenerate(cardData);
      setCardData({
        title: '',
        content: '',
        category: 'Medical-Surgical',
        difficulty: 'Intermediate',
        tags: []
      });
      onClose();
    } catch (error) {
      console.error('Error generating card:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-elevation max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-confidence rounded-lg flex items-center justify-center">
              <Icon name="CreditCard" size={18} color="white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Study Card Generator</h3>
              <p className="text-sm text-text-secondary">Create personalized flashcards</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <Input
            label="Card Title"
            placeholder="Enter the main concept or question"
            value={cardData?.title}
            onChange={(e) => setCardData(prev => ({ ...prev, title: e?.target?.value }))}
            required
          />

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Card Content</label>
            <textarea
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-input min-h-32 resize-y"
              placeholder="Enter the detailed explanation, definition, or answer..."
              value={cardData?.content}
              onChange={(e) => setCardData(prev => ({ ...prev, content: e?.target?.value }))}
              required
            />
          </div>

          {/* Category and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-input"
                value={cardData?.category}
                onChange={(e) => setCardData(prev => ({ ...prev, category: e?.target?.value }))}
              >
                {categories?.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-input"
                value={cardData?.difficulty}
                onChange={(e) => setCardData(prev => ({ ...prev, difficulty: e?.target?.value }))}
              >
                {difficulties?.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex space-x-2 mb-3">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e?.target?.value)}
                onKeyPress={(e) => e?.key === 'Enter' && handleAddTag()}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleAddTag}>
                <Icon name="Plus" size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {cardData?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-500 transition-colors duration-200"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Preview */}
          {(cardData?.title || cardData?.content) && (
            <div className="border border-border rounded-lg p-4 bg-muted/30">
              <h4 className="font-medium mb-2 flex items-center space-x-2">
                <Icon name="Eye" size={16} />
                <span>Preview</span>
              </h4>
              <div className="bg-card rounded-lg p-4 shadow-subtle">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary">{cardData?.category}</span>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {cardData?.difficulty}
                  </span>
                </div>
                <h5 className="font-semibold mb-2">{cardData?.title || 'Card Title'}</h5>
                <p className="text-sm text-text-secondary">
                  {cardData?.content || 'Card content will appear here...'}
                </p>
                {cardData?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {cardData?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleGenerate}
            loading={isGenerating}
            disabled={!cardData?.title?.trim() || !cardData?.content?.trim()}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Generate Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudyCardGenerator;