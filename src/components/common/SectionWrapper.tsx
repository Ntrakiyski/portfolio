import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, id }) => {
  return (
        <section id={id} className={`relative w-full max-w-[1200px] mx-auto py-16 ${className || ''}`}>
      {children}
      <hr className="absolute bottom-0 left-0 w-full border-b border-gray-200" />
    </section>
  );
};

export default SectionWrapper;
