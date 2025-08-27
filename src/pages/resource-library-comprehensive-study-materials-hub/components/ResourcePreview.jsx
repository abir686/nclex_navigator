import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ResourcePreview = ({ resource, isOpen, onClose, onDownload, onSave, onShare }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSaved, setIsSaved] = useState(resource?.isSaved || false);

  if (!isOpen || !resource) return null;

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave(resource?.id, !isSaved);
  };

  const mockPages = [
    {
      id: 1,
      content: `# ${resource?.title}\n\n## Overview\n${resource?.description}\n\n### Key Points:\n• Important concept 1\n• Important concept 2\n• Important concept 3\n\n### Clinical Applications:\nThis material is essential for understanding the fundamental principles that will be tested on the NCLEX examination.`,
      image: resource?.thumbnail
    },
    {
      id: 2,
      content: `## Detailed Content\n\n### Section A: Pathophysiology\nDetailed explanation of the underlying mechanisms and processes.\n\n### Section B: Clinical Manifestations\nSigns and symptoms to watch for in clinical practice.\n\n### Section C: Nursing Interventions\nEvidence-based nursing care strategies.`,
      image: null
    },
    {
      id: 3,
      content: `## Practice Questions\n\n### Question 1:\nWhich of the following is the priority nursing intervention?\nA) Option A\nB) Option B\nC) Option C\nD) Option D\n\n**Answer: C**\n**Rationale:** Detailed explanation of why this is the correct answer.`,
      image: null
    }
  ];

  const totalPages = mockPages?.length;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className={`
        bg-card rounded-xl shadow-elevation overflow-hidden transition-all duration-300
        ${isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl h-[90vh]'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{resource?.title}</h3>
              <p className="text-sm text-text-secondary">
                {resource?.type} • {resource?.fileSize} • Page {currentPage} of {totalPages}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Page Navigation */}
            <div className="flex items-center space-x-2 mr-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <span className="text-sm font-medium px-2">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>

            {/* Actions */}
            <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
              <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Icon 
                name="Heart" 
                size={16} 
                fill={isSaved ? "currentColor" : "none"}
                className={isSaved ? "text-red-500" : ""} 
              />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={() => onShare(resource)}>
              <Icon name="Share2" size={16} />
            </Button>
            
            <Button variant="default" size="sm" onClick={() => onDownload(resource)}>
              <Icon name="Download" size={16} className="mr-2" />
              Download
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={18} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-full">
          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              {mockPages?.[currentPage - 1]?.image && (
                <div className="mb-6">
                  <Image
                    src={mockPages?.[currentPage - 1]?.image}
                    alt={`Page ${currentPage} preview`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="prose prose-lg max-w-none">
                {mockPages?.[currentPage - 1]?.content?.split('\n')?.map((line, index) => {
                  if (line?.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mb-4 text-medical-authority">{line?.substring(2)}</h1>;
                  } else if (line?.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-semibold mb-3 text-primary mt-6">{line?.substring(3)}</h2>;
                  } else if (line?.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-medium mb-2 text-foreground mt-4">{line?.substring(4)}</h3>;
                  } else if (line?.startsWith('• ')) {
                    return <li key={index} className="ml-4 mb-1">{line?.substring(2)}</li>;
                  } else if (line?.startsWith('**') && line?.endsWith('**')) {
                    return <p key={index} className="font-semibold mb-2">{line?.slice(2, -2)}</p>;
                  } else if (line?.trim()) {
                    return <p key={index} className="mb-3 text-foreground leading-relaxed">{line}</p>;
                  } else {
                    return <br key={index} />;
                  }
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - Resource Info */}
          <div className="w-80 border-l border-border bg-muted/20 p-6 overflow-y-auto">
            <h4 className="font-semibold mb-4">Resource Details</h4>
            
            {/* Stats */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Rating</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-yellow-500" fill="currentColor" />
                  <span className="font-medium">{resource?.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Downloads</span>
                <span className="font-medium">{resource?.downloads}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">File Size</span>
                <span className="font-medium">{resource?.fileSize}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Last Updated</span>
                <span className="font-medium">{resource?.lastUpdated}</span>
              </div>
            </div>

            {/* Specialties */}
            <div className="mb-6">
              <h5 className="font-medium mb-2">Specialties</h5>
              <div className="flex flex-wrap gap-2">
                {resource?.specialties?.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="mb-6">
              <h5 className="font-medium mb-2">Author</h5>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{resource?.author}</p>
                  <p className="text-xs text-text-secondary">Nursing Educator</p>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <div>
              <h5 className="font-medium mb-3">Related Resources</h5>
              <div className="space-y-3">
                {[1, 2, 3]?.map((item) => (
                  <div key={item} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors duration-200">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="FileText" size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-2">
                        Related Study Guide {item}
                      </p>
                      <p className="text-xs text-text-secondary">Quick Reference</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <Icon name="ChevronLeft" size={16} className="mr-2" />
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200
                  ${page === currentPage 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted text-text-secondary'
                  }
                `}
              >
                {page}
              </button>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <Icon name="ChevronRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourcePreview;