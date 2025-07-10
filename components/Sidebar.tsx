import React, { useState, useEffect, useCallback } from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FiDownload } from 'react-icons/fi';
import { IoLogoGoogle, IoMdMail } from 'react-icons/io';
import { navItems } from '../constants/navItems'; // Import navItems from constants

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const email = 'nikolay.trakiyski@gmail.com'; 
  const subject = 'Intersted in collaboration';
  const bodyContent = 'Hello Nikolay,\n\n'; 

  const encodedSubject = encodeURIComponent(subject);
  const encodedBodyContent = encodeURIComponent(bodyContent);

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBodyContent}`;
  const outlookLink = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${email}&subject=${encodedSubject}&body=${encodedBodyContent}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Choose your email client</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
           <a
            href={gmailLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg text-white bg-[#DB4437] hover:bg-[#C53D30] transition-colors"
          >
            <IoLogoGoogle className="w-5 h-5" />
            Open in Gmail
          </a>
          <a
            href={outlookLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg text-white bg-[#0078D4] hover:bg-[#005A9E] transition-colors"
          >
            <IoMdMail className="w-5 h-5" />
            Open in Outlook
          </a>
        </div>
      </div>
    </div>
  );
};


declare global {
  interface Window {
    gsap: any;
    ScrollToPlugin: any;
  }
}

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarIsOpen: boolean; // Managed by App.tsx
  setSidebarIsOpen: (value: boolean) => void; // Managed by App.tsx
  scrollToSection: (href: string) => void; // Shared scroll function from App.tsx
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  setActiveSection, 
  sidebarIsOpen, // Use prop for isOpen
  setSidebarIsOpen, // Use prop for setter
  scrollToSection // Use prop for scroll function
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // No need to register GSAP here, it's done in App.tsx now.

  // handleNavClick now uses the passed scrollToSection prop
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement> | { preventDefault: () => void }, href: string) => {
    e.preventDefault();
    scrollToSection(href); // Use the shared scroll function
  }, [scrollToSection]); 

  // Effect for keyboard shortcuts (Escape and 1-4 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault(); 
        setSidebarIsOpen(!sidebarIsOpen); // Use prop setter for sidebar state
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
  }, [handleNavClick, navItems, setSidebarIsOpen]); // Added setSidebarIsOpen to dependencies

  return (
    <>
      <aside className={`fixed bottom-5 lg:bottom-auto left-5 lg:top-5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg z-10 transition-all duration-700 ease-in-out ${sidebarIsOpen ? 'w-80' : 'w-48'}`}>
        <div className={`transition-all duration-700 ease-in-out ${sidebarIsOpen ? 'p-6' : 'p-3'}`}>
          <div
            role="button"
            tabIndex={0}
            aria-expanded={sidebarIsOpen}
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)} // Use prop setter for click
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSidebarIsOpen(!sidebarIsOpen)} // Use prop setter for enter/space
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
              <nav>
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`block pl-3 pr-3 py-2 text-sm border-l-4 transition-all duration-200 cursor-pointer flex justify-between items-center ${ 
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
                  <button
                    disabled
                    aria-label="Download CV as PDF"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg text-white bg-black transition-colors shadow-sm opacity-50 cursor-not-allowed"
                  >
                    <span className="w-6 flex justify-center items-center"><FiDownload className="w-4 h-4" /></span>
                    Download CV
                  </button>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Email me"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg text-black bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                  >
                    <span className="w-6 flex justify-center items-center"><IoMdMail className="w-4 h-4" /></span>
                    Email Me
                  </button>
                  <a
                    href="https://www.linkedin.com/in/nikolaytrakiyski"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Message me on LinkedIn"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg text-white bg-[#0077B5] hover:bg-[#006097] transition-colors"
                  >
                    <span className="w-6 flex justify-center items-center"><FaLinkedin className="w-5 h-5" /></span>
                    Message Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Sidebar;