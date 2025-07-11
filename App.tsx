import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import MobileSectionNavigator from './components/MobileSectionNavigator'; // Import new component
import { navItems } from './constants/navItems'; // Import navItems
declare global {
  interface Window {
    gsap: any;
    ScrollToPlugin: any;
  }
}

const App: React.FC = () => {
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
    <div className="bg-white text-black min-h-screen font-sans">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        sidebarIsOpen={sidebarIsOpen} // Pass state
        setSidebarIsOpen={setSidebarIsOpen} // Pass setter
        scrollToSection={scrollToSection} // Pass shared scroll function
      />
      
      <main 
        className="flex justify-center md:p-12 
                   ml-0 lg:ml-[220px] 
                   flex-grow" 
      >
        <MainContent 
          setActiveSection={setActiveSection} 
          highlightTarget={highlightTarget} 
          setHighlightTarget={setHighlightTarget} 
        />
      </main>

      {/* Mobile navigation arrows */}
      <MobileSectionNavigator
        activeSection={activeSection}
        navItems={navItems} // Use the centralized navItems
        scrollToSection={scrollToSection}
        isSidebarOpen={sidebarIsOpen} // Pass sidebar state to hide arrows when sidebar is open
      />
    </div>
  );
};

export default App;