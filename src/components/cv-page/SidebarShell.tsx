// components/SidebarShell.tsx (or wherever you prefer to place it)
import React, { useRef, useEffect } from 'react';

interface SidebarShellProps {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (value: boolean) => void;
  children: React.ReactNode; // To render the navigation and actions inside
}

const SidebarShell: React.FC<SidebarShellProps> = ({ sidebarIsOpen, setSidebarIsOpen, children }) => {
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the sidebar AND sidebar is open AND it's a mobile view
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarIsOpen &&
        window.innerWidth < 1024 // Tailwind's 'lg' breakpoint is 1024px
      ) {
        setSidebarIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarIsOpen, setSidebarIsOpen]);

  return (
    <aside 
      ref={sidebarRef}
      className={`fixed bottom-5 lg:bottom-auto left-5 lg:top-5 bg-white/80 backdrop-blur-sm border border-gray-200 -lg shadow-lg z-10 transition-all duration-700 ease-in-out ${sidebarIsOpen ? 'w-[270px] lg:w-80' : 'w-[142px] lg:w-48'}`}>
      <div className={`transition-all duration-700 ease-in-out ${sidebarIsOpen ? 'p-6' : 'p-3'}`}>
        <div
          role="button"
          tabIndex={0}
          aria-expanded={sidebarIsOpen}
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSidebarIsOpen(!sidebarIsOpen)}
          className="flex justify-between items-center gap-x-4 cursor-pointer"
        >
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider select-none">
            Navigation <span className="text-gray-300 text-xs ml-1 hidden lg:inline">[esc]</span>
          </h2>
          <div className="text-gray-400" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-4 h-4 transform transition-transform duration-700 ease-in-out ${sidebarIsOpen ? '' : 'rotate-180'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </div>
        </div>
        
        {/* Collapsible Content */}
        <div className={`grid transition-all duration-500 ease-in-out ${sidebarIsOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
          <div className="overflow-hidden">
            {children} {/* Renders content passed from parent */}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarShell;