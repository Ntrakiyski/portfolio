// src/components/MobileSectionNavigator.tsx
import React, { useEffect } from 'react';
import gsap from 'gsap';
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
  sidebarIsOpen: boolean;
}

const MobileSectionNavigator: React.FC<MobileSectionNavigatorProps> = ({
  activeSection,
  navItems,
  scrollToSection,
  sidebarIsOpen,
}) => {
  const arrowsRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (arrowsRef.current) {
      if (sidebarIsOpen) {
        // Hide arrows: move to the right and fade out
        gsap.to(arrowsRef.current, {
          x: 100, // Move 100px to the right
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            arrowsRef.current!.style.display = 'none'; // Hide completely after animation
          },
        });
      } else {
        // Show arrows: bring back from the right and fade in
        arrowsRef.current.style.display = 'flex'; // Make visible before animation
        gsap.fromTo(arrowsRef.current,
          { x: 100, opacity: 0 }, // Start from right and hidden
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [sidebarIsOpen]);
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
    rounded-lg shadow-lg text-gray-400 hover:text-black 
    hover:bg-gray-100 transition-colors cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2
  `;

  return (
    <div 
      ref={arrowsRef}
      className={`
        fixed bottom-5 right-5 z-20 
        flex-row gap-2 
        lg:hidden // Hide on large screens
        flex // Always show on mobile
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