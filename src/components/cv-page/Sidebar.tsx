// components/Sidebar.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { navItems } from '../../../constants/navItems';

// Import the destructured components
import SidebarShell from './SidebarShell';
import SidebarNavAndActions from './SidebarNavAndActions';
import EmailModal from './EmailModal'; // Import the new EmailModal component
import MobileSectionNavigator from './MobileSectionNavigator';

declare global {
  interface Window {
    gsap: any;
    ScrollToPlugin: any;
  }
}

interface SidebarProps {
  activeSection: string;
  sidebarIsOpen: boolean; 
  setSidebarIsOpen: (value: boolean) => void; 
  scrollToSection: (href: string) => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  sidebarIsOpen, 
  setSidebarIsOpen, 
  scrollToSection 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement> | { preventDefault: () => void }, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  }, [scrollToSection]); 

  // Effect for keyboard shortcuts (Escape and 1-7 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setSidebarIsOpen(!sidebarIsOpen);
      } else if (e.key >= '1' && e.key <= '9') { // Expanded to include all possible shortcuts
        const shortcut = e.key;
        let targetItem;

        // Find the navigation item corresponding to the pressed shortcut key
        for (const item of navItems) {
          if (item.shortcut === shortcut && !item.subItems) {
            targetItem = item;
            break;
          }
          if (item.subItems) {
            const subItem = item.subItems.find(sub => sub.shortcut === shortcut);
            if (subItem) {
              targetItem = subItem;
              break;
            }
          }
        }

        if (targetItem) {
          e.preventDefault();
          handleNavClick({ preventDefault: () => {} } as React.MouseEvent<HTMLAnchorElement>, targetItem.href);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleNavClick, setSidebarIsOpen, sidebarIsOpen]);

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
      <MobileSectionNavigator
        activeSection={activeSection}
        navItems={navItems}
        scrollToSection={scrollToSection}
        sidebarIsOpen={sidebarIsOpen}
      />
    </>
  );
};

export default Sidebar;