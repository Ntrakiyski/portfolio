// src/components/MainContent.tsx
import React, { useRef } from 'react';

// Import hooks
import { useSectionObserver } from '../hooks/useSectionObserver';
import { useSectionHighlight } from '../hooks/useSectionHighlight';

// Import the consolidated Content component
import Content from './Content'; // Make sure the path is correct

interface MainContentProps {
  setActiveSection: (section: string) => void;
  highlightTarget: string | null;
  setHighlightTarget: (value: string | null) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  setActiveSection,
  highlightTarget,
  setHighlightTarget
}) => {
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    'why-me': useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Use custom hooks for logic
  useSectionObserver(sectionRefs, setActiveSection);
  const visualHighlightedSection = useSectionHighlight(highlightTarget, setHighlightTarget);

  return (
    <div id="cv-container" className="max-w-[800px]">
      {/* All content rendering is now delegated to the Content component */}
      <Content
        sectionRefs={sectionRefs}
        visualHighlightedSection={visualHighlightedSection}
      />
    </div>
  );
};

export default MainContent;