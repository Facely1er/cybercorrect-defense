import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TeamProvider } from './context/TeamContext';
import { ProjectProvider } from './context/ProjectContext';
import { Toaster } from './components/ui/Toaster';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';

import LandingLayout from './components/layout/LandingLayout';
import AppLayout from './components/layout/AppLayout';
import DevTools from './components/DevTools';

// Public Pages
import Landing from './pages/Landing';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Features from './pages/Features';
import Demo from './pages/Demo';
import NotFound from './pages/NotFound';

// CMMC Assessment Pages
import CmmcAssessmentStart from './pages/assessment/CmmcAssessmentStart';
import CmmcQuickCheck from './pages/assessment/CmmcQuickCheck';
import CmmcLevel1Assessment from './pages/assessment/CmmcLevel1Assessment';
import CmmcLevel2Assessment from './pages/assessment/CmmcLevel2Assessment';
import AssessmentResults from './pages/assessment/AssessmentResults';

// CMMC Implementation Pages
import Dashboard from './pages/app/Dashboard';
import ControlImplementation from './pages/app/ControlImplementation';
import EvidenceVault from './pages/app/EvidenceVault';
import ProjectManagement from './pages/app/ProjectManagement';
import TeamManagement from './pages/app/TeamManagement';
import DocumentGeneration from './pages/app/DocumentGeneration';

// Documentation and Resources
import Documentation from './pages/resources/Documentation';
import CmmcGuide from './pages/resources/CmmcGuide';
import Nist800171Guide from './pages/resources/Nist800171Guide';
import ImplementationGuide from './pages/resources/ImplementationGuide';

// User Management
import UserProfile from './pages/UserProfile';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
             (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('darkMode', newValue.toString());
      return newValue;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <TeamProvider>
          <ProjectProvider>
            <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />}>
                  <Route index element={<Landing />} />
                  <Route path="about" element={<About />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="features" element={<Features />} />
                  <Route path="demo" element={<Demo />} />
                  <Route path="login" element={<Login />} />
                  
                  {/* CMMC Assessment Routes */}
                  <Route path="assessment" element={<CmmcAssessmentStart />} />
                  <Route path="assessment/quick-check" element={<CmmcQuickCheck />} />
                  <Route path="assessment/level-1" element={<CmmcLevel1Assessment />} />
                  <Route path="assessment/level-2" element={<CmmcLevel2Assessment />} />
                  <Route path="assessment/results" element={<AssessmentResults />} />
                  
                  {/* Documentation Routes */}
                  <Route path="documentation" element={<Documentation />} />
                  <Route path="documentation/cmmc-guide" element={<CmmcGuide />} />
                  <Route path="documentation/nist-800-171-guide" element={<Nist800171Guide />} />
                  <Route path="documentation/implementation-guide" element={<ImplementationGuide />} />
                </Route>
                
                {/* Authenticated App Routes */}
                <Route path="/app" element={
                  <ProtectedRoute>
                    <AppLayout toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="controls" element={<ControlImplementation />} />
                  <Route path="evidence" element={<EvidenceVault />} />
                  <Route path="projects" element={<ProjectManagement />} />
                  <Route path="team" element={<TeamManagement />} />
                  <Route path="documents" element={<DocumentGeneration />} />
                  <Route path="profile" element={<UserProfile />} />
                </Route>
                
                {/* Redirect old routes */}
                <Route path="/privacy-assessment" element={<Navigate to="/assessment" replace />} />
                <Route path="/cui-assessment" element={<Navigate to="/assessment" replace />} />
                <Route path="/toolkit/*" element={<Navigate to="/app/controls" replace />} />
                
                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              <Toaster />
              <DevTools />
            </div>
          </ProjectProvider>
        </TeamProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;