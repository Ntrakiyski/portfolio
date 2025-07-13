// components/SidebarNavAndActions.tsx (or wherever you prefer to place it)
import React from 'react';
import { navItems } from '../constants/navItems'; // Ensure this path is correct

interface SidebarNavAndActionsProps {
  activeSection: string;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement> | { preventDefault: () => void }, href: string) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const SidebarNavAndActions: React.FC<SidebarNavAndActionsProps> = ({ activeSection, handleNavClick, setIsModalOpen }) => {
  return (
    <>
      <nav>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                data-umami-event={`Navigation - ${item.name} Click`}
                className={`block pl-3 pr-3 py-2 text-sm border-l-2 transition-all duration-200 cursor-pointer flex justify-between items-center ${ 
                  activeSection === item.href.substring(1)
                    ? 'text-black border-black font-semibold'
                    : 'text-gray-600 border-transparent hover:border-gray-400 hover:text-black'
                }`}
              >
                <span>{item.name}</span>
                <span className="text-gray-300 text-xs ml-2 hidden lg:inline">[{item.shortcut}]</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="space-y-3">
          <a
            href="/cv/nikolay-trakiyski-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download CV as PDF"
            data-umami-event="Download CV Button Click"
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg text-white bg-black hover:bg-gray-800 transition-colors shadow-sm"
          >
            <span className="flex-grow text-center">Download CV</span>
          </a>
          <button
            onClick={() => {
              setIsModalOpen(true);
              if (window.umami) {
                window.umami.track('Send an email Button Click');
              }
            }}
            aria-label="Email me"
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg text-black bg-white hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <span className="flex-grow text-center">Send an email</span>
          </button>
          <a
            href="https://www.linkedin.com/in/nikolaytrakiyski"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="Send a message (LinkedIn) Button Click"
            aria-label="Message me on LinkedIn"
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-lg text-white bg-[#0077B5] hover:bg-[#006097] transition-colors"
          >
            <span className="flex-grow text-center">Send a message</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default SidebarNavAndActions;