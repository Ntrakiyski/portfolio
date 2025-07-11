// src/hooks/useSectionHighlight.ts
import { useState, useEffect, useRef } from 'react';

export const useSectionHighlight = (
  highlightTarget: string | null,
  setHighlightTarget: (value: string | null) => void
) => {
  const [visualHighlightedSection, setVisualHighlightedSection] = useState<string | null>(null);
  const highlightAnimationTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (highlightTarget) {
      if (highlightAnimationTimerRef.current) {
        clearTimeout(highlightAnimationTimerRef.current);
      }

      setVisualHighlightedSection(highlightTarget);
      
      const clearHighlightTimeout = setTimeout(() => {
        setVisualHighlightedSection(null);
        setHighlightTarget(null); // Reset highlightTarget after animation
      }, 1500);
      
      highlightAnimationTimerRef.current = clearHighlightTimeout;
    } else {
      setVisualHighlightedSection(null);
      if (highlightAnimationTimerRef.current) {
        clearTimeout(highlightAnimationTimerRef.current);
        highlightAnimationTimerRef.current = null;
      }
    }

    return () => {
      if (highlightAnimationTimerRef.current) {
        clearTimeout(highlightAnimationTimerRef.current);
      }
    };
  }, [highlightTarget, setHighlightTarget]);

  return visualHighlightedSection;
};