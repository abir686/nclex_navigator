import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestResults = ({ 
  results, 
  onRetakeTest, 
  onReviewAnswers, 
  onBackToModes, 
  onViewDetailedAnalysis 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getPerformanceColor = (percentage) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 70) return 'text-accent';
    return 'text-error';
  };

  const getPerformanceBadge = (percentage) => {
    if (percentage >= 85) return { text: 'Excellent', color: 'bg-success/10 text-success border-success/20' };
    if (percentage >= 70) return { text: 'Good', color: 'bg-accent/10 text-accent border-accent/20' };
    if (percentage >= 60) return { text: 'Fair', color: 'bg-warning/10 text-warning border-warning/20' };
    return { text: 'Needs Improvement', color: 'bg-error/10 text-error border-error/20' };
  };

  const confidenceLevel = results?.overallScore >= 85 ? 'High' : 
                         results?.overallScore >= 70 ? 'Moderate' : 'Low';

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'categories', name: 'By Category', icon: 'PieChart' },
    { id: 'difficulty', name: 'By Difficulty', icon: 'TrendingUp' },
    { id: 'recommendations', name: 'Study Plan', icon: 'Target' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-6">
        <div className="container-medical">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-medical-authority mb-2">Test Results</h1>
              <p className="text-text-secondary">
                Completed on {new Date(results.completedAt)?.toLocaleDateString()} • 
                Duration: {Math.floor(results?.duration / 60)}m {results?.duration % 60}s
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={onBackToModes}>
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Back to Tests
              </Button>
              <Button variant="default" onClick={onRetakeTest} className="btn-medical-primary">
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Retake Test
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-medical py-8">
        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-medical p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-confidence rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{results?.overallScore}%</span>
            </div>
            <h3 className="font-semibold text-medical-authority mb-1">Overall Score</h3>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPerformanceBadge(results?.overallScore)?.color}`}>
              {getPerformanceBadge(results?.overallScore)?.text}
            </div>
          </div>

          <div className="card-medical p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Target" size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold text-medical-authority mb-1">Correct Answers</h3>
            <p className="text-2xl font-bold text-primary">{results?.correctAnswers}/{results?.totalQuestions}</p>
          </div>

          <div className="card-medical p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="TrendingUp" size={32} className="text-accent" />
            </div>
            <h3 className="font-semibold text-medical-authority mb-1">NCLEX Readiness</h3>
            <p className={`text-lg font-semibold ${getPerformanceColor(results?.readinessScore)}`}>
              {results?.readinessScore}% Ready
            </p>
          </div>

          <div className="card-medical p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="Award" size={32} className="text-success" />
            </div>
            <h3 className="font-semibold text-medical-authority mb-1">Confidence Level</h3>
            <p className={`text-lg font-semibold ${
              confidenceLevel === 'High' ? 'text-success' : 
              confidenceLevel === 'Moderate' ? 'text-accent' : 'text-error'
            }`}>
              {confidenceLevel}
            </p>
          </div>
        </div>

        {/* Confidence Predictor */}
        <div className="card-confidence mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="Brain" size={24} className="text-success" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-medical-authority mb-2">NCLEX Confidence Predictor</h3>
              <p className="text-text-secondary mb-4">
                Based on your performance patterns and adaptive responses, our AI predicts your NCLEX success probability.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Success Probability</span>
                    <span className="font-semibold">{results?.successProbability}%</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-confidence transition-all duration-1000"
                      style={{ width: `${results?.successProbability}%` }}
                    />
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-lg font-medium ${
                  results?.successProbability >= 80 ? 'bg-success/10 text-success' :
                  results?.successProbability >= 60 ? 'bg-accent/10 text-accent': 'bg-error/10 text-error'
                }`}>
                  {results?.successProbability >= 80 ? 'Ready to Test' :
                   results?.successProbability >= 60 ? 'Almost Ready': 'More Practice Needed'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Trends */}
              <div className="card-medical p-6">
                <h3 className="text-lg font-semibold text-medical-authority mb-4">Performance Trends</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Improvement from last test</span>
                    <span className="text-success font-semibold">+12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Average response time</span>
                    <span className="font-semibold">1m 23s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Questions flagged</span>
                    <span className="font-semibold">{results?.flaggedQuestions}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-medical p-6">
                <h3 className="text-lg font-semibold text-medical-authority mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={onReviewAnswers}
                    className="justify-start"
                  >
                    <Icon name="Eye" size={16} className="mr-3" />
                    Review All Answers
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={onViewDetailedAnalysis}
                    className="justify-start"
                  >
                    <Icon name="BarChart3" size={16} className="mr-3" />
                    Detailed Analysis
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    className="justify-start"
                  >
                    <Icon name="Share" size={16} className="mr-3" />
                    Share Results
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results?.categoryBreakdown?.map((category) => (
              <div key={category?.name} className="card-medical p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-medical-authority">{category?.name}</h3>
                  <span className={`text-lg font-bold ${getPerformanceColor(category?.percentage)}`}>
                    {category?.percentage}%
                  </span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      category?.percentage >= 85 ? 'bg-success' :
                      category?.percentage >= 70 ? 'bg-accent' : 'bg-error'
                    }`}
                    style={{ width: `${category?.percentage}%` }}
                  />
                </div>
                <div className="text-sm text-text-secondary">
                  {category?.correct}/{category?.total} correct
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'difficulty' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results?.difficultyBreakdown?.map((level) => (
              <div key={level?.level} className="card-medical p-6">
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                    level?.level === 'Easy' ? 'bg-success/10' :
                    level?.level === 'Medium' ? 'bg-accent/10' : 'bg-error/10'
                  }`}>
                    <Icon 
                      name={level?.level === 'Easy' ? 'Smile' : level?.level === 'Medium' ? 'Meh' : 'Frown'} 
                      size={32} 
                      className={
                        level?.level === 'Easy' ? 'text-success' :
                        level?.level === 'Medium' ? 'text-accent' : 'text-error'
                      }
                    />
                  </div>
                  <h3 className="font-semibold text-medical-authority">{level?.level}</h3>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-2 ${getPerformanceColor(level?.percentage)}`}>
                    {level?.percentage}%
                  </div>
                  <div className="text-sm text-text-secondary">
                    {level?.correct}/{level?.total} questions
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="card-medical p-6">
              <h3 className="text-lg font-semibold text-medical-authority mb-4">Personalized Study Recommendations</h3>
              <div className="space-y-4">
                {results?.recommendations?.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      rec?.priority === 'High' ? 'bg-error/10 text-error' :
                      rec?.priority === 'Medium'? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'
                    }`}>
                      <Icon name="Target" size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-medical-authority">{rec?.topic}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rec?.priority === 'High' ? 'bg-error/10 text-error' :
                          rec?.priority === 'Medium'? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'
                        }`}>
                          {rec?.priority} Priority
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{rec?.description}</p>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Icon name="BookOpen" size={14} className="mr-2" />
                          Study Guide
                        </Button>
                        <Button variant="outline" size="sm">
                          <Icon name="Play" size={14} className="mr-2" />
                          Practice Questions
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Peer Comparison */}
        <div className="card-medical p-6 mt-8">
          <h3 className="text-lg font-semibold text-medical-authority mb-4">Peer Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{results?.overallScore}%</div>
              <div className="text-sm text-text-secondary">Your Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-text-secondary mb-1">78%</div>
              <div className="text-sm text-text-secondary">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">Top 25%</div>
              <div className="text-sm text-text-secondary">Your Ranking</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;