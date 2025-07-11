// components/Sidebar.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { navItems } from '../constants/navItems';

// Import the destructured components
import SidebarShell from './SidebarShell';
import SidebarNavAndActions from './SidebarNavAndActions';
import EmailModal from './EmailModal'; // Import the new EmailModal component

declare global {
  interface Window {
    gsap: any;
    ScrollToPlugin: any;
  }
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarIsOpen: boolean; 
  setSidebarIsOpen: (value: boolean) => void; 
  scrollToSection: (href: string) => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  sidebarIsOpen, 
  setSidebarIsOpen, 
  scrollToSection 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement> | { preventDefault: () => void }, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  }, [scrollToSection]); 

  // Effect for keyboard shortcuts (Escape and 1-4 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault(); 
        setSidebarIsOpen(!sidebarIsOpen);
      } 
      else if (e.key >= '1' && e.key <= '4') { 
        const index = parseInt(e.key) - 1; 
        if (index >= 0 && index < navItems.length) {
          const item = navItems[index];
          e.preventDefault(); 
          handleNavClick({ preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>, item.href);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNavClick, navItems, setSidebarIsOpen, sidebarIsOpen]);

  return (
    <>
      <SidebarShell 
        sidebarIsOpen={sidebarIsOpen} 
        setSidebarIsOpen={setSidebarIsOpen}
      >
        <SidebarNavAndActions 
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          setIsModalOpen={setIsModalOpen}
        />
      </SidebarShell>
      
      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Sidebar;