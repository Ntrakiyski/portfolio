import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './src/pages/HomePage';
import ProjectPage from './src/pages/ProjectPage';
import { Navbar } from './src/components/home-page';

// Header component that conditionally renders Navbar
const AppHeader = () => {
  const location = useLocation();
  // Only show Navbar on the homepage
  if (location.pathname !== '/') {
    return null;
  }
  return (
    <header className="sticky top-0 z-50 bg-white">
      <Navbar />
    </header>
  );
};

// Main App content component
const AppContent: React.FC = () => {
  return (
    <div className="bg-gray-50 text-black min-h-screen font-sans flex justify-center">
      <div className="relative w-full max-w-screen-lg bg-white md:border md:border-gray-200 md:shadow-lg">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// App component that wraps everything with Router
const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;