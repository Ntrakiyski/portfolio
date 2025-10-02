import React, { useState, useEffect, useRef, useMemo } from 'react';
import { easeInOut } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './src/pages/HomePage';
import ProjectPage from './src/pages/ProjectPage';
import { Navbar } from './src/components/home-page';
import ComingSoon from './src/components/common/ComingSoon';

// Header component that conditionally renders Navbar
const AppHeader = () => {
  const location = useLocation();
  // Show Navbar on all pages
  return <Navbar />;
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
      duration: 0.3,
      ease: easeInOut
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut
    },
  }),
};

// Main App content component
const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prevPathRef = useRef(location.pathname);

  const direction = useMemo(() => {
    const prevPath = prevPathRef.current;
    if (prevPath === '/' && location.pathname.startsWith('/project')) {
      return 1; // Forward: right to left
    } else if (prevPath.startsWith('/project') && location.pathname === '/') {
      return -1; // Back: left to right
    }
    return 0;
  }, [location.pathname]);

  useEffect(() => {
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="bg-white text-black min-h-screen font-sans flex justify-center">
      <div className="relative w-full max-w-[1200px] bg-white md:border md:border-gray-200 md:shadow-lg overflow-hidden">
        {/* Navbar hidden for coming soon */}
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.main
            key={location.pathname}
            custom={direction}
            variants={prefersReducedMotion ? undefined : pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full pt-24"
          >
            <ComingSoon />
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

