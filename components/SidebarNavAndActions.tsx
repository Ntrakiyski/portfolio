// components/SidebarNavAndActions.tsx (or wherever you prefer to place it)
import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FiDownload } from 'react-icons/fi';
import { IoMdMail } from 'react-icons/io';
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
    </>
  );
};

export default SidebarNavAndActions;