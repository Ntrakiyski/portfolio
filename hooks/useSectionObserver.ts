// src/hooks/useSectionObserver.ts
import { useEffect, RefObject } from 'react';

interface SectionRefs {
  // CORRECTED: Allow RefObject to hold HTMLDivElement OR null
  [key: string]: RefObject<HTMLDivElement | null>; 
}

export const useSectionObserver = (
  sectionRefs: SectionRefs,
  setActiveSection: (section: string) => void
) => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-200px 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const refs = Object.values(sectionRefs);
    refs.forEach(ref => {
      if (ref.current) { // This check is crucial and works with HTMLDivElement | null
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs, setActiveSection]);
};