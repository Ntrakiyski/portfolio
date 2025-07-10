// src/components/MobileSectionNavigator.tsx
import React from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'; // Import arrow icons

interface NavItem {
  name: string;
  href: string;
  shortcut: string;
}

interface MobileSectionNavigatorProps {
  activeSection: string;
  navItems: NavItem[];
  scrollToSection: (href: string) => void;
  isSidebarOpen: boolean; // To hide arrows when sidebar is open
}

const MobileSectionNavigator: React.FC<MobileSectionNavigatorProps> = ({
  activeSection,
  navItems,
  scrollToSection,
  isSidebarOpen,
}) => {
  const currentSectionIndex = navItems.findIndex(
    (item) => item.href.substring(1) === activeSection
  );

  const canScrollUp = currentSectionIndex > 0;
  const canScrollDown = currentSectionIndex < navItems.length - 1;

  const handleScroll = (direction: 'up' | 'down') => {
    let targetIndex = -1;

    if (direction === 'up' && canScrollUp) {
      targetIndex = currentSectionIndex - 1;
    } else if (direction === 'down' && canScrollDown) {
      targetIndex = currentSectionIndex + 1;
    }

    if (targetIndex !== -1) {
      scrollToSection(navItems[targetIndex].href);
    }
  };

  // Styling for the arrow buttons to match sidebar aesthetic
  const arrowButtonClasses = `
    w-12 h-12 flex items-center justify-center 
    bg-white/80 backdrop-blur-sm border border-gray-200 
    rounded-lg shadow-lg text-gray-600 hover:text-black 
    hover:bg-gray-100 transition-colors cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
  `;

  return (
    <div 
      className={`
        fixed bottom-5 right-5 z-20 
        flex-col gap-2 
        lg:hidden // Hide on large screens
        ${isSidebarOpen ? 'hidden' : 'flex'} // Hide if sidebar is open
      `}
    >
      <button
        onClick={() => handleScroll('up')}
        disabled={!canScrollUp}
        className={`${arrowButtonClasses} ${!canScrollUp ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Scroll to previous section"
      >
        <FaChevronUp className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleScroll('down')}
        disabled={!canScrollDown}
        className={`${arrowButtonClasses} ${!canScrollDown ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Scroll to next section"
      >
        <FaChevronDown className="w-5 h-5" />
      </button>
    </div>
  );
};

export default MobileSectionNavigator;