import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestHistory = ({ onViewResults, onRetakeTest, onBack }) => {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  const testHistory = [
    {
      id: 1,
      mode: 'Timed Practice',
      score: 87,
      totalQuestions: 75,
      correctAnswers: 65,
      duration: 4320, // seconds
      completedAt: '2025-08-26T14:30:00Z',
      categories: ['Safe Care Environment', 'Physiological Integrity'],
      difficulty: 'Mixed',
      readinessScore: 89,
      status: 'completed'
    },
    {
      id: 2,
      mode: 'Tutor Mode',
      score: 92,
      totalQuestions: 50,
      correctAnswers: 46,
      duration: 3600,
      completedAt: '2025-08-25T16:45:00Z',
      categories: ['Health Promotion', 'Psychosocial Integrity'],
      difficulty: 'Medium',
      readinessScore: 85,
      status: 'completed'
    },
    {
      id: 3,
      mode: 'Custom Quiz',
      score: 78,
      totalQuestions: 25,
      correctAnswers: 19,
      duration: 1800,
      completedAt: '2025-08-24T10:15:00Z',
      categories: ['Physiological Integrity'],
      difficulty: 'Hard',
      readinessScore: 72,
      status: 'completed'
    },
    {
      id: 4,
      mode: 'Timed Practice',
      score: 0,
      totalQuestions: 75,
      correctAnswers: 0,
      duration: 0,
      completedAt: '2025-08-23T09:00:00Z',
      categories: ['Safe Care Environment'],
      difficulty: 'Mixed',
      readinessScore: 0,
      status: 'abandoned'
    },
    {
      id: 5,
      mode: 'Tutor Mode',
      score: 84,
      totalQuestions: 100,
      correctAnswers: 84,
      duration: 7200,
      completedAt: '2025-08-22T13:20:00Z',
      categories: ['All Categories'],
      difficulty: 'Mixed',
      readinessScore: 81,
      status: 'completed'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-accent';
    return 'text-error';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'abandoned':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const formatDuration = (seconds) => {
    if (seconds === 0) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredHistory = testHistory?.filter(test => {
    if (filterBy === 'all') return true;
    if (filterBy === 'completed') return test?.status === 'completed';
    if (filterBy === 'high-score') return test?.score >= 85;
    return true;
  });

  const sortedHistory = [...filteredHistory]?.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.completedAt) - new Date(a.completedAt);
      case 'score':
        return b?.score - a?.score;
      case 'duration':
        return b?.duration - a?.duration;
      default:
        return 0;
    }
  });

  const averageScore = testHistory?.filter(test => test?.status === 'completed')?.reduce((sum, test) => sum + test?.score, 0) / 
    testHistory?.filter(test => test?.status === 'completed')?.length;

  const totalTests = testHistory?.length;
  const completedTests = testHistory?.filter(test => test?.status === 'completed')?.length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Back to Tests
          </Button>
          <h2 className="text-2xl font-bold text-medical-authority mb-2">Test History</h2>
          <p className="text-text-secondary">Track your progress and review past performance</p>
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-medical p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-medical-authority mb-1">{totalTests}</div>
          <div className="text-sm text-text-secondary">Total Tests</div>
        </div>

        <div className="card-medical p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-medical-authority mb-1">{completedTests}</div>
          <div className="text-sm text-text-secondary">Completed</div>
        </div>

        <div className="card-medical p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="TrendingUp" size={24} className="text-accent" />
          </div>
          <div className="text-2xl font-bold text-medical-authority mb-1">{Math.round(averageScore)}%</div>
          <div className="text-sm text-text-secondary">Average Score</div>
        </div>

        <div className="card-medical p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-confidence rounded-full flex items-center justify-center">
            <Icon name="Award" size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-medical-authority mb-1">
            {Math.max(...testHistory?.filter(t => t?.status === 'completed')?.map(t => t?.score))}%
          </div>
          <div className="text-sm text-text-secondary">Best Score</div>
        </div>
      </div>
      {/* Filters and Sorting */}
      <div className="card-medical p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium">Filter:</span>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e?.target?.value)}
                className="px-3 py-1 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="all">All Tests</option>
                <option value="completed">Completed Only</option>
                <option value="high-score">High Scores (85%+)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Icon name="ArrowUpDown" size={16} className="text-text-secondary" />
              <span className="text-sm font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e?.target?.value)}
                className="px-3 py-1 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="date">Date</option>
                <option value="score">Score</option>
                <option value="duration">Duration</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-text-secondary">
            Showing {sortedHistory?.length} of {totalTests} tests
          </div>
        </div>
      </div>
      {/* Test History List */}
      <div className="space-y-4">
        {sortedHistory?.map((test) => (
          <div key={test?.id} className="card-medical p-6 hover:shadow-medical transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={
                        test?.mode === 'Timed Practice' ? 'Clock' :
                        test?.mode === 'Tutor Mode' ? 'GraduationCap' : 'Settings'
                      } 
                      size={20} 
                      className="text-primary" 
                    />
                    <h3 className="font-semibold text-medical-authority">{test?.mode}</h3>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(test?.status)}`}>
                    {test?.status === 'completed' ? 'Completed' : 'Abandoned'}
                  </span>
                  
                  <span className="text-sm text-text-secondary">
                    {formatDate(test?.completedAt)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-text-secondary">Score</div>
                    <div className={`text-lg font-bold ${getScoreColor(test?.score)}`}>
                      {test?.status === 'completed' ? `${test?.score}%` : 'N/A'}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-text-secondary">Questions</div>
                    <div className="text-lg font-bold text-medical-authority">
                      {test?.status === 'completed' ? `${test?.correctAnswers}/${test?.totalQuestions}` : `0/${test?.totalQuestions}`}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-text-secondary">Duration</div>
                    <div className="text-lg font-bold text-medical-authority">
                      {formatDuration(test?.duration)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-text-secondary">Readiness</div>
                    <div className={`text-lg font-bold ${getScoreColor(test?.readinessScore)}`}>
                      {test?.status === 'completed' ? `${test?.readinessScore}%` : 'N/A'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="BookOpen" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">
                      {test?.categories?.join(', ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name="BarChart3" size={14} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">
                      {test?.difficulty} difficulty
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 ml-6">
                {test?.status === 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewResults(test?.id)}
                  >
                    <Icon name="Eye" size={16} className="mr-2" />
                    View Results
                  </Button>
                )}
                
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onRetakeTest(test)}
                  className="btn-medical-primary"
                >
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  Retake
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedHistory?.length === 0 && (
        <div className="card-medical p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Icon name="FileText" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-medical-authority mb-2">No tests found</h3>
          <p className="text-text-secondary mb-6">
            {filterBy === 'all' ? "You haven't taken any practice tests yet." :"No tests match your current filter criteria."
            }
          </p>
          <Button
            variant="default"
            onClick={onBack}
            className="btn-medical-primary"
          >
            <Icon name="Play" size={16} className="mr-2" />
            Start Your First Test
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestHistory;