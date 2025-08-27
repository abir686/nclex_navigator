import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import FilterSidebar from './components/FilterSidebar';
import ResourceCard from './components/ResourceCard';
import FeaturedCollections from './components/FeaturedCollections';
import StudyCardGenerator from './components/StudyCardGenerator';
import PersonalLibrary from './components/PersonalLibrary';
import ResourcePreview from './components/ResourcePreview';

const ResourceLibraryPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCardGeneratorOpen, setIsCardGeneratorOpen] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [previewResource, setPreviewResource] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    search: '',
    specialty: [],
    contentType: [],
    difficulty: [],
    studyPhase: []
  });

  // Mock data for resources
  const mockResources = [
    {
      id: 1,
      title: "NCLEX Pharmacology Quick Reference Guide",
      description: "Comprehensive medication guide covering the top 200 medications tested on NCLEX with dosages, side effects, and nursing considerations.",
      type: "Quick Reference",
      difficulty: "Intermediate",
      specialties: ["Pharmacology", "Medical-Surgical"],
      rating: 4.8,
      downloads: 15420,
      fileSize: "2.4 MB",
      author: "Dr. Sarah Johnson",
      lastUpdated: "2 days ago",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      isNew: true,
      isFeatured: false,
      isSaved: false
    },
    {
      id: 2,
      title: "Critical Lab Values Cheat Sheet",
      description: "Essential laboratory values every nursing student must know for NCLEX success, organized by body system with normal ranges and critical values.",
      type: "Lab Values",
      difficulty: "Beginner",
      specialties: ["Fundamentals", "Medical-Surgical"],
      rating: 4.9,
      downloads: 23150,
      fileSize: "1.8 MB",
      author: "Prof. Michael Chen",
      lastUpdated: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
      isNew: false,
      isFeatured: true,
      isSaved: true
    },
    {
      id: 3,
      title: "Pediatric Assessment Techniques",
      description: "Age-specific assessment techniques for pediatric patients including developmental milestones and communication strategies.",
      type: "Study Guides",
      difficulty: "Advanced",
      specialties: ["Pediatrics"],
      rating: 4.7,
      downloads: 8930,
      fileSize: "3.2 MB",
      author: "RN Lisa Martinez",
      lastUpdated: "3 days ago",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      isNew: false,
      isFeatured: false,
      isSaved: false
    },
    {
      id: 4,
      title: "Maternity Nursing Care Plans",
      description: "Complete care plans for common maternity scenarios including antepartum, intrapartum, and postpartum care.",
      type: "Study Guides",
      difficulty: "Intermediate",
      specialties: ["Maternity"],
      rating: 4.6,
      downloads: 12750,
      fileSize: "4.1 MB",
      author: "CNM Jennifer Davis",
      lastUpdated: "5 days ago",
      thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop",
      isNew: false,
      isFeatured: false,
      isSaved: true
    },
    {
      id: 5,
      title: "Mental Health Nursing Interventions",
      description: "Evidence-based interventions for common mental health conditions with therapeutic communication techniques.",
      type: "Quick Reference",
      difficulty: "Advanced",
      specialties: ["Mental Health"],
      rating: 4.8,
      downloads: 9640,
      fileSize: "2.7 MB",
      author: "Dr. Robert Kim",
      lastUpdated: "1 week ago",
      thumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop",
      isNew: true,
      isFeatured: false,
      isSaved: false
    },
    {
      id: 6,
      title: "Cardiac Rhythms Interpretation Guide",
      description: "Step-by-step guide to interpreting ECG rhythms with practice strips and clinical correlations.",
      type: "Flashcards",
      difficulty: "Expert",
      specialties: ["Medical-Surgical"],
      rating: 4.9,
      downloads: 18200,
      fileSize: "5.3 MB",
      author: "CCRN Amanda Wilson",
      lastUpdated: "4 days ago",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      isNew: false,
      isFeatured: true,
      isSaved: false
    }
  ];

  // Mock data for featured collections
  const mockCollections = [
    {
      id: 1,
      title: "Top 100 NCLEX Medications",
      description: "The most frequently tested medications on NCLEX with comprehensive drug information, nursing considerations, and patient education points.",
      type: "medications",
      resourceCount: 25,
      rating: 4.9,
      totalDownloads: "45.2k",
      studentsUsing: "12.8k",
      lastUpdated: "2 days ago",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      tags: ["High-Yield", "Pharmacology", "Must-Know"],
      isPremium: false,
      progress: 65
    },
    {
      id: 2,
      title: "Critical Lab Values Collection",
      description: "Essential laboratory values organized by body system with normal ranges, critical values, and nursing implications for safe patient care.",
      type: "lab-values",
      resourceCount: 18,
      rating: 4.8,
      totalDownloads: "38.7k",
      studentsUsing: "15.2k",
      lastUpdated: "1 week ago",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=200&fit=crop",
      tags: ["Essential", "Quick Reference", "Clinical"],
      isPremium: false,
      progress: 80
    },
    {
      id: 3,
      title: "Advanced Pathophysiology Concepts",
      description: "Complex pathophysiology concepts made simple with visual diagrams, case studies, and clinical correlations for advanced nursing practice.",
      type: "pathophysiology",
      resourceCount: 32,
      rating: 4.7,
      totalDownloads: "22.1k",
      studentsUsing: "8.9k",
      lastUpdated: "3 days ago",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=200&fit=crop",
      tags: ["Advanced", "Pathophysiology", "Visual"],
      isPremium: true,
      progress: 25
    }
  ];

  // Mock saved resources for personal library
  const mockSavedResources = mockResources?.filter(resource => resource?.isSaved);

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      specialty: [],
      contentType: [],
      difficulty: [],
      studyPhase: []
    });
  };

  const handleResourceSave = (resourceId, isSaved) => {
    console.log(`Resource ${resourceId} ${isSaved ? 'saved' : 'removed'}`);
  };

  const handleResourceShare = (resource) => {
    console.log('Sharing resource:', resource?.title);
  };

  const handleResourcePreview = (resource) => {
    setPreviewResource(resource);
  };

  const handleResourceDownload = (resource) => {
    console.log('Downloading resource:', resource?.title);
  };

  const handleViewCollection = (collection) => {
    console.log('Viewing collection:', collection?.title);
  };

  const handleGenerateCard = async (cardData) => {
    console.log('Generating study card:', cardData);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleCreateFolder = (folderName) => {
    console.log('Creating folder:', folderName);
  };

  const handleMoveToFolder = (resourceId) => {
    console.log('Moving resource to folder:', resourceId);
  };

  const handleRemoveFromLibrary = (resourceId) => {
    console.log('Removing from library:', resourceId);
  };

  // Filter resources based on current filters
  const filteredResources = mockResources?.filter(resource => {
    const matchesSearch = !filters?.search || 
      resource?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      resource?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    
    const matchesSpecialty = filters?.specialty?.length === 0 ||
      filters?.specialty?.some(specialty => resource?.specialties?.includes(specialty));
    
    const matchesContentType = filters?.contentType?.length === 0 ||
      filters?.contentType?.includes(resource?.type);
    
    const matchesDifficulty = filters?.difficulty?.length === 0 ||
      filters?.difficulty?.includes(resource?.difficulty);

    return matchesSearch && matchesSpecialty && matchesContentType && matchesDifficulty;
  });

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'downloads', label: 'Most Downloaded' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  return (
    <>
      <Helmet>
        <title>Resource Library - Comprehensive Study Materials Hub | NCLEX Navigator</title>
        <meta name="description" content="Access comprehensive NCLEX study materials including study guides, quick references, medication sheets, and lab values. Advanced filtering and personalized library features." />
        <meta name="keywords" content="NCLEX resources, nursing study materials, study guides, quick reference, medication sheets, lab values, flashcards" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header onToggleSidebar={() => setIsSidebarOpen(true)} />
        
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            {/* Hero Section */}
            <section className="bg-gradient-medical text-white py-16">
              <div className="container-medical">
                <div className="max-w-4xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Icon name="Library" size={24} color="white" />
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold mb-2">Resource Library</h1>
                      <p className="text-xl text-white/90">Comprehensive Study Materials Hub</p>
                    </div>
                  </div>
                  <p className="text-lg text-white/80 mb-8 max-w-2xl">
                    Access thousands of high-quality study materials, create personalized flashcards, 
                    and build your own study library with advanced filtering and organization tools.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">2,500+</div>
                      <div className="text-sm text-white/80">Study Resources</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">150+</div>
                      <div className="text-sm text-white/80">Collections</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">50k+</div>
                      <div className="text-sm text-white/80">Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">4.8★</div>
                      <div className="text-sm text-white/80">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Bar */}
            <section className="bg-card border-b border-border py-4">
              <div className="container-medical">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsSidebarOpen(true)}
                      className="lg:hidden"
                    >
                      <Icon name="Filter" size={16} className="mr-2" />
                      Filters
                    </Button>
                    
                    <Button
                      variant="default"
                      onClick={() => setIsCardGeneratorOpen(true)}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Create Study Card
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setIsLibraryOpen(true)}
                    >
                      <Icon name="BookMarked" size={16} className="mr-2" />
                      My Library ({mockSavedResources?.length})
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4">
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

                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e?.target?.value)}
                      className="px-4 py-2 border border-border rounded-lg bg-input text-sm"
                    >
                      {sortOptions?.map(option => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <div className="container-medical py-8">
              {/* Featured Collections */}
              <FeaturedCollections
                collections={mockCollections}
                onViewCollection={handleViewCollection}
              />

              {/* Resources Grid */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-medical-authority">All Resources</h2>
                    <p className="text-text-secondary">
                      {filteredResources?.length} resources found
                      {Object.values(filters)?.some(f => Array.isArray(f) ? f?.length > 0 : f) && ' (filtered)'}
                    </p>
                  </div>
                </div>

                {filteredResources?.length === 0 ? (
                  <div className="text-center py-16">
                    <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                    <p className="text-text-secondary mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className={`
                    ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}
                  `}>
                    {filteredResources?.map((resource) => (
                      <ResourceCard
                        key={resource?.id}
                        resource={resource}
                        onSave={handleResourceSave}
                        onShare={handleResourceShare}
                        onPreview={handleResourcePreview}
                        onDownload={handleResourceDownload}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Load More */}
              {filteredResources?.length > 0 && (
                <div className="text-center mt-12">
                  <Button variant="outline" size="lg">
                    <Icon name="MoreHorizontal" size={16} className="mr-2" />
                    Load More Resources
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modals */}
        <StudyCardGenerator
          isOpen={isCardGeneratorOpen}
          onClose={() => setIsCardGeneratorOpen(false)}
          onGenerate={handleGenerateCard}
        />

        <PersonalLibrary
          isOpen={isLibraryOpen}
          onClose={() => setIsLibraryOpen(false)}
          savedResources={mockSavedResources}
          onRemoveFromLibrary={handleRemoveFromLibrary}
          onCreateFolder={handleCreateFolder}
          onMoveToFolder={handleMoveToFolder}
        />

        <ResourcePreview
          resource={previewResource}
          isOpen={!!previewResource}
          onClose={() => setPreviewResource(null)}
          onDownload={handleResourceDownload}
          onSave={handleResourceSave}
          onShare={handleResourceShare}
        />
      </div>
    </>
  );
};

export default ResourceLibraryPage;