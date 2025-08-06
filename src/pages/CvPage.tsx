import React from 'react';
import Sidebar from '../components/cv-page/Sidebar';
import MainContent from '../components/cv-page/MainContent';
import cvContent from '../data/cv-content.json';

interface CvPageProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  highlightTarget: string | null;
  setHighlightTarget: (value: string | null) => void;
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (isOpen: boolean) => void;
  scrollToSection: (href: string) => void;
}

const CvPage: React.FC<CvPageProps> = ({
  activeSection,
  setActiveSection,
  highlightTarget,
  setHighlightTarget,
  sidebarIsOpen,
  setSidebarIsOpen,
  scrollToSection,
}) => {
  return (
    <>
      <Sidebar
        activeSection={activeSection}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
        scrollToSection={scrollToSection}
      />
      <main
        className={`flex justify-center md:p-12 flex-grow transition-all duration-300 ${sidebarIsOpen ? 'md:ml-40' : 'ml-0'}`}
      >
        <MainContent
          mainContentData={cvContent.mainContent}
          setActiveSection={setActiveSection}
          highlightTarget={highlightTarget}
          setHighlightTarget={setHighlightTarget}
        />
      </main>
    </>
  );
};

export default CvPage;
