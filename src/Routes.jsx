import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import NCLEXNavigatorHomepage from './pages/homepage-nclex-navigator-learning-hub';
import PracticeTestsAdaptiveTestingArena from './pages/practice-tests-adaptive-testing-arena';
import CompleteStudyGuideNCLEXMasteryCenter from './pages/complete-study-guide-nclex-mastery-center';
import SuccessDashboard from './pages/success-dashboard-personal-progress-analytics';
import ResourceLibraryPage from './pages/resource-library-comprehensive-study-materials-hub';
import StudyPlansPage from './pages/study-plans-personalized-preparation-pathways';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CompleteStudyGuideNCLEXMasteryCenter />} />
        <Route path="/homepage-nclex-navigator-learning-hub" element={<NCLEXNavigatorHomepage />} />
        <Route path="/practice-tests-adaptive-testing-arena" element={<PracticeTestsAdaptiveTestingArena />} />
        <Route path="/complete-study-guide-nclex-mastery-center" element={<CompleteStudyGuideNCLEXMasteryCenter />} />
        <Route path="/success-dashboard-personal-progress-analytics" element={<SuccessDashboard />} />
        <Route path="/resource-library-comprehensive-study-materials-hub" element={<ResourceLibraryPage />} />
        <Route path="/study-plans-personalized-preparation-pathways" element={<StudyPlansPage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
