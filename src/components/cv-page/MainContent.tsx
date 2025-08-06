// src/components/MainContent.tsx
import React, { useMemo } from 'react';

// Import hooks
import { useSectionObserver } from '../../../hooks/useSectionObserver';
import { useSectionHighlight } from '../../../hooks/useSectionHighlight';

// Import the consolidated Content component
import Content from './Content'; // Make sure the path is correct

interface MainContentProps {
  mainContentData: any;
  setActiveSection: (section: string) => void;
  highlightTarget: string | null;
  setHighlightTarget: (value: string | null) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  mainContentData,
  setActiveSection,
  highlightTarget,
  setHighlightTarget
}) => {
  // Combine static and dynamic refs
  const sectionRefs = useMemo(() => {
    const staticRefs = {
      about: React.createRef<HTMLDivElement>(),
      experience: React.createRef<HTMLDivElement>(),
      skills: React.createRef<HTMLDivElement>(),
      'why-me': React.createRef<HTMLDivElement>(),
      contact: React.createRef<HTMLDivElement>(),
    };

    const dynamicJobRefs = mainContentData.experience.jobs.reduce((acc: any, _: any, index: number) => {
      acc[`job-${index}`] = React.createRef<HTMLDivElement>();
      return acc;
    }, {});

    return { ...staticRefs, ...dynamicJobRefs };
  }, [mainContentData.experience.jobs]);

  // Use custom hooks for logic
  useSectionObserver(sectionRefs, setActiveSection);
  const visualHighlightedSection = useSectionHighlight(highlightTarget, setHighlightTarget);

  return (
    <div id="cv-container" className="max-w-[800px]">
      {/* All content rendering is now delegated to the Content component */}
      <Content
        contentData={mainContentData}
        sectionRefs={sectionRefs}
        visualHighlightedSection={visualHighlightedSection}
      />
    </div>
  );
};

export default MainContent;