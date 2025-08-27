import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import ResourceCard from './ResourceCard';

const PersonalLibrary = ({ isOpen, onClose, savedResources, onRemoveFromLibrary, onCreateFolder, onMoveToFolder }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('dateAdded'); // 'dateAdded', 'name', 'type', 'rating'
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const folders = [
    { id: 'all', name: 'All Resources', count: savedResources?.length, icon: 'FolderOpen' },
    { id: 'favorites', name: 'Favorites', count: 12, icon: 'Heart' },
    { id: 'medications', name: 'Medications', count: 8, icon: 'Pill' },
    { id: 'lab-values', name: 'Lab Values', count: 15, icon: 'TestTube' },
    { id: 'procedures', name: 'Procedures', count: 6, icon: 'Activity' },
    { id: 'study-guides', name: 'Study Guides', count: 10, icon: 'BookOpen' }
  ];

  const sortOptions = [
    { value: 'dateAdded', label: 'Date Added' },
    { value: 'name', label: 'Name' },
    { value: 'type', label: 'Type' },
    { value: 'rating', label: 'Rating' }
  ];

  const handleCreateFolder = () => {
    if (newFolderName?.trim()) {
      onCreateFolder(newFolderName?.trim());
      setNewFolderName('');
      setIsCreatingFolder(false);
    }
  };

  const filteredResources = savedResources?.filter(resource => {
    const matchesSearch = resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || resource?.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-elevation w-full max-w-6xl h-[90vh] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-muted/30 border-r border-border p-4 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">My Library</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={18} />
            </Button>
          </div>

          {/* Create Folder */}
          <div className="mb-6">
            {isCreatingFolder ? (
              <div className="space-y-2">
                <Input
                  placeholder="Folder name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e?.target?.value)}
                  onKeyPress={(e) => e?.key === 'Enter' && handleCreateFolder()}
                />
                <div className="flex space-x-2">
                  <Button size="sm" onClick={handleCreateFolder}>
                    <Icon name="Check" size={14} />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsCreatingFolder(false)}>
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreatingFolder(true)}
                className="w-full"
              >
                <Icon name="FolderPlus" size={16} className="mr-2" />
                New Folder
              </Button>
            )}
          </div>

          {/* Folders */}
          <div className="space-y-1">
            {folders?.map((folder) => (
              <button
                key={folder?.id}
                onClick={() => setSelectedFolder(folder?.id)}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors duration-200
                  ${selectedFolder === folder?.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted text-foreground'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={folder?.icon} size={16} />
                  <span className="text-sm font-medium">{folder?.name}</span>
                </div>
                <span className="text-xs opacity-75">{folder?.count}</span>
              </button>
            ))}
          </div>

          {/* Storage Info */}
          <div className="mt-8 p-3 bg-card rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Storage Used</span>
              <span className="text-sm text-text-secondary">2.4 GB / 5 GB</span>
            </div>
            <div className="progress-medical h-2">
              <div className="progress-bar h-full" style={{ width: '48%' }} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">
                  {folders?.find(f => f?.id === selectedFolder)?.name || 'All Resources'}
                </h2>
                <p className="text-text-secondary">
                  {filteredResources?.length} resources
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-muted rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'grid' ? 'bg-card shadow-sm' : 'hover:bg-card/50'
                    }`}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      viewMode === 'list' ? 'bg-card shadow-sm' : 'hover:bg-card/50'
                    }`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-input text-sm"
                >
                  {sortOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      Sort by {option?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search */}
            <Input
              type="search"
              placeholder="Search your library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="max-w-md"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {filteredResources?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Icon name="FolderOpen" size={48} className="text-text-secondary mb-4" />
                <h3 className="text-lg font-medium mb-2">No resources found</h3>
                <p className="text-text-secondary">
                  {searchQuery ? 'Try adjusting your search terms' : 'Start saving resources to build your library'}
                </p>
              </div>
            ) : (
              <div className={`
                ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
                }
              `}>
                {filteredResources?.map((resource) => (
                  <div key={resource?.id} className="relative group">
                    <ResourceCard
                      resource={resource}
                      onSave={() => onRemoveFromLibrary(resource?.id)}
                      onShare={() => {}}
                      onPreview={() => {}}
                      onDownload={() => {}}
                    />
                    
                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex space-x-1">
                        <button
                          onClick={() => onMoveToFolder(resource?.id)}
                          className="p-1 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors duration-200"
                          title="Move to folder"
                        >
                          <Icon name="FolderOpen" size={14} />
                        </button>
                        <button
                          onClick={() => onRemoveFromLibrary(resource?.id)}
                          className="p-1 bg-white/90 rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
                          title="Remove from library"
                        >
                          <Icon name="Trash2" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalLibrary;