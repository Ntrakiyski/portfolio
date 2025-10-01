import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

// Page transition variants
const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // ease-in-out
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// Main App content component
const AppContent: React.FC = () => {
  const location = useLocation();
  const [direction, setDirection] = useState(1);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    // Determine direction based on navigation
    if (prevPath === '/' && location.pathname.startsWith('/project')) {
      setDirection(1); // Forward: right to left
    } else if (prevPath.startsWith('/project') && location.pathname === '/') {
      setDirection(-1); // Back: left to right
    }
    setPrevPath(location.pathname);
  }, [location.pathname]);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="bg-gray-50 text-black min-h-screen font-sans flex justify-center">
      <div className="relative w-full max-w-screen-lg bg-white md:border md:border-gray-200 md:shadow-lg overflow-hidden">
        <AppHeader />
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.main
            key={location.pathname}
            custom={direction}
            variants={prefersReducedMotion ? {} : pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/project/:id" element={<ProjectPage />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
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

