// src/components/SectionWrapper.tsx
import React, { RefObject } from 'react';

interface SectionWrapperProps {
  id: string;
  sectionRef: RefObject<HTMLDivElement>;
  isHighlighted: boolean;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, sectionRef, isHighlighted, children }) => {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={`scroll-mt-10 ${id === 'contact' ? 'text-center pb-8' : ''}`}
    >
      <div className={`
        p-6 -xl
        ${isHighlighted ? 'animate-section-highlight' : ''}
      `}>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;