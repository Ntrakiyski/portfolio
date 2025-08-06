// components/SidebarNavAndActions.tsx (or wherever you prefer to place it)
import React, { useState } from 'react';
import { navItems } from '../../../constants/navItems'; // Ensure this path is correct

declare global {
  interface Window {
    umami: any;
  }
}

interface SidebarNavAndActionsProps {
  activeSection: string;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement> | { preventDefault: () => void }, href: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const SidebarNavAndActions: React.FC<SidebarNavAndActionsProps> = ({ activeSection, handleNavClick, setIsModalOpen }) => {
  const [isExperienceOpen, setIsExperienceOpen] = useState(true);

  return (
    <>
      <nav>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isParentOfActive = item.subItems?.some(sub => activeSection === sub.href.substring(1));
            const isDirectlyActive = activeSection === item.href.substring(1) && !item.subItems;
            const isActive = isDirectlyActive || isParentOfActive;

            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
                    if (item.subItems) {
                      setIsExperienceOpen(!isExperienceOpen);
                    }
                  }}
                  data-umami-event={`Navigation - ${item.name} Click`}
                  className={`block pl-3 pr-3 py-2 text-sm border-l-2 transition-all duration-200 cursor-pointer flex justify-between items-center ${ 
                    isActive
                      ? 'text-black border-black font-semibold'
                      : 'text-gray-600 border-transparent hover:border-gray-400 hover:text-black'
                  }`}
                >
                  <span>{item.name}</span>
                  {!item.subItems && item.shortcut && <span className="text-gray-400 text-xs ml-2">[{item.shortcut}]</span>}
                </a>
                {item.subItems && isExperienceOpen && (
                  <ul className="pl-4 mt-2 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <a
                          href={subItem.href}
                          onClick={(e) => handleNavClick(e, subItem.href)}
                          data-umami-event={`Navigation - ${subItem.name} Click`}
                          className={`block pl-3 pr-3 py-1 text-sm border-l-2 transition-all duration-200 cursor-pointer flex justify-between items-center ${ 
                            activeSection === subItem.href.substring(1)
                              ? 'text-black border-black font-semibold'
                              : 'text-gray-500 border-transparent hover:border-gray-400 hover:text-black'
                          }`}
                        >
                          <span>{subItem.name}</span>
                          <span className="text-gray-400 text-xs ml-2">[{subItem.shortcut}]</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="space-y-3">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsModalOpen(true);
                if (window.umami) {
                  window.umami.track('Mail me Button Click');
                }
              }}
              aria-label="Mail me"
              className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-semibold text-black bg-white hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <span>Mail me</span>
            </button>
            <a
              href="https://www.linkedin.com/in/nikolaytrakiyski"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="Message me (LinkedIn) Button Click"
              aria-label="Message me on LinkedIn"
              className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-[#0077B5] hover:bg-[#006097] transition-colors"
            >
              <span>Message me</span>
            </a>
          </div>
          <a
            href="/cv/nikolay-trakiyski-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV as PDF"
            data-umami-event="Download CV Button Click"
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-black hover:bg-gray-800 transition-colors shadow-sm"
          >
            <span className="flex-grow text-center">Download CV</span>
          </a>
        </div>
        <div className="mt-4">
          <a 
            href="/"
            aria-label="Back to home"
            data-umami-event="Back to Home Button Click"
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
          >
            <span className="flex-grow text-center">Back to Home</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default SidebarNavAndActions;