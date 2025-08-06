import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CvPage from './src/pages/CvPage';
import HomePage from './src/pages/HomePage';
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
  const [activeSection, setActiveSection] = useState('about'); 
  const [highlightTarget, setHighlightTarget] = useState<string | null>(null);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true); // App manages sidebar state

  // Register GSAP ScrollToPlugin once on mount
  useEffect(() => {
    if (window.gsap && window.ScrollToPlugin) {
      window.gsap.registerPlugin(window.ScrollToPlugin);
    }
  }, []);

  // Centralized scroll logic, shared by Sidebar and MobileSectionNavigator
  const scrollToSection = useCallback((href: string) => {
    const sectionId = href.substring(1);

    if (window.gsap && window.ScrollToPlugin) {
      window.gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: href, offsetY: 100 }, 
        ease: 'power3.inOut',
        onComplete: () => { 
          setHighlightTarget(sectionId); // Trigger highlight ONLY after scroll animation completes
        }
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Fallback: Add a small timeout to allow native smooth scroll to settle
        setTimeout(() => {
          setHighlightTarget(sectionId);
        }, 500); 
      }
    }
  }, [setHighlightTarget]); // Dependency on setHighlightTarget

  return (
    <div className="bg-gray-50 text-black min-h-screen font-sans flex justify-center">
      <div className="relative w-full max-w-screen-lg bg-white md:border md:border-gray-200 md:shadow-lg">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/cv"
              element={
                <CvPage
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  highlightTarget={highlightTarget}
                  setHighlightTarget={setHighlightTarget}
                  sidebarIsOpen={sidebarIsOpen}
                  setSidebarIsOpen={setSidebarIsOpen}
                  scrollToSection={scrollToSection}
                />
              }
            />
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