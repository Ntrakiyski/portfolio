import React, { useState, useEffect, useRef } from 'react';
import { gsap, Power3 } from 'gsap';
import { FaList, FaCompressAlt, FaTools, FaLightbulb, FaProjectDiagram } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

import { IconType } from 'react-icons';

interface ExperienceTabsProps {
  points: string[];
  summarizedPoints: string[];
  jobTitle: string;
  company: string;
  dates: string;
  challenge: string;
  skills: string[];
  tools: string[];
  projects: string[];
}

interface Tab {
  name: string;
  icon: IconType;
  content: string[];
}

const ExperienceTabs: React.FC<ExperienceTabsProps> = ({ points, summarizedPoints, jobTitle, company, dates, challenge, skills, tools, projects }) => {
  const tabs: Tab[] = [
    {
      name: 'Summarised',
      icon: FaList,
      content: summarizedPoints,
    },
    {
      name: 'Concise',
      icon: FaCompressAlt,
      content: points,
    },
    {
      name: 'Tools',
      icon: FaTools,
      content: tools,
    },
    {
      name: 'Skills',
      icon: FaLightbulb,
      content: skills,
    },
    {
      name: 'Projects',
      icon: FaProjectDiagram,
      content: projects,
    },
  ];

  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map()); // Ref to store tab button elements
  const underlineRef = useRef<HTMLDivElement>(null); // Ref for the animated underline

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [numVisibleTabs, setNumVisibleTabs] = useState(tabs.length);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const overflowMenuRef = useRef<HTMLDivElement>(null);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const swipeThreshold = 50; // Minimum pixels for a swipe to be recognized

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(0); // Reset end position on new touch start
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchEndX === 0) return; // No movement, not a swipe

    const diff = touchStartX - touchEndX;

    if (diff > swipeThreshold) {
      // Swiped left, go to next tab
      const currentIndex = tabs.findIndex(tab => tab.name === activeTab.name);
      const nextIndex = (currentIndex + 1) % tabs.length;
      handleTabClick(tabs[nextIndex]);
    } else if (diff < -swipeThreshold) {
      // Swiped right, go to previous tab
      const currentIndex = tabs.findIndex(tab => tab.name === activeTab.name);
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      handleTabClick(tabs[prevIndex]);
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overflowMenuRef.current && !overflowMenuRef.current.contains(event.target as Node)) {
        setShowOverflowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [overflowMenuRef]);

  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!tabsContainerRef.current) return;

      const containerWidth = tabsContainerRef.current.offsetWidth;
      // Estimate average tab width + some padding/margin for the "more" button
      // This is a rough estimate and might need fine-tuning based on actual content and styling.
      // A more accurate approach would involve measuring each tab's width after rendering.
      const estimatedTabWidth = 120; // px, average width of a tab (text + icon + padding)
      const moreButtonWidth = 50; // px, width of the three dots button
      const gap = 16; // px, for space-x-4 (4 * 4px = 16px)

      let currentWidth = 0;
      let visibleCount = 0;

      // Calculate how many tabs can fit
      for (let i = 0; i < tabs.length; i++) {
        const tabWidth = estimatedTabWidth; // Placeholder, ideally measure actual tab width
        if (currentWidth + tabWidth + (i > 0 ? gap : 0) + (tabs.length - (i + 1) > 0 ? moreButtonWidth : 0) < containerWidth) {
          currentWidth += tabWidth + (i > 0 ? gap : 0);
          visibleCount++;
        } else {
          break;
        }
      }
      setNumVisibleTabs(visibleCount === 0 ? 1 : visibleCount); // Ensure at least one tab is always visible
    };

    // Use ResizeObserver for more efficient and accurate width monitoring
    const observer = new ResizeObserver(calculateVisibleTabs);
    if (tabsContainerRef.current) {
      observer.observe(tabsContainerRef.current);
    }

    // Initial calculation
    calculateVisibleTabs();

    return () => {
      if (tabsContainerRef.current) {
        observer.unobserve(tabsContainerRef.current);
      }
    };
  }, [tabs]); // Recalculate if tabs change

  useEffect(() => {
    // Set initial underline position
    if (underlineRef.current && tabsContainerRef.current) {
      const initialTabButton = tabRefs.current.get(activeTab.name);
      if (initialTabButton) {
        const buttonOffsetLeft = initialTabButton.offsetLeft;
        const buttonWidth = initialTabButton.offsetWidth;

        gsap.set(underlineRef.current, {
          left: buttonOffsetLeft,
          width: buttonWidth,
        });
      }
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab); // Update active tab immediately

    // Animate underline immediately on click
    if (underlineRef.current && tabsContainerRef.current) {
      const clickedTabButton = tabRefs.current.get(tab.name);
      if (clickedTabButton) {
        const buttonOffsetLeft = clickedTabButton.offsetLeft;
        const buttonWidth = clickedTabButton.offsetWidth;

        gsap.to(underlineRef.current, {
          left: buttonOffsetLeft,
          width: buttonWidth,
          duration: 0.3,
          ease: Power3.easeOut,
        });
      }
    }

    if (contentRef.current) {
      const currentHeight = contentRef.current.offsetHeight; // Capture current height
      gsap.set(contentRef.current, { height: currentHeight }); // Lock height

      gsap.to(contentRef.current, {
        opacity: 0,
        x: -50, // Slide out to the left
        duration: 0.3,
        ease: Power3.easeOut,
        onComplete: () => {
          // After content fades out and activeTab is updated, measure new height
          // Temporarily set height to 'auto' to get natural height, then animate
          gsap.set(contentRef.current, { height: 'auto', opacity: 0, x: 50 }); // Reset for new content
          const newHeight = contentRef.current ? contentRef.current.offsetHeight : 'auto';

          gsap.fromTo(contentRef.current,
            { opacity: 0, x: 50, height: currentHeight }, // Start from right, hidden, and old height
            { 
              opacity: 1, 
              x: 0, 
              height: newHeight, // Animate to new natural height
              duration: 0.3, 
              ease: Power3.easeOut,
              onComplete: () => {
                gsap.set(contentRef.current, { height: 'auto' }); // Remove fixed height after animation
              }
            }
          );
        }
      });
    } else {
      // Fallback if ref is not available
    }
  };

  return (
    <div className="mt-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">{jobTitle}</h2>
        <h3 className="text-xl text-gray-600">{company}</h3>
        <p className="text-gray-500">{dates}</p>
        <p className="mt-2 text-gray-700 italic">{challenge}</p>
      </div>
      <div 
        ref={tabsContainerRef} 
        className="flex border-b-2 border-gray-200 mb-4 relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {tabs.slice(0, numVisibleTabs).map((tab) => (
          <button
            key={tab.name}
            ref={(el) => { if (el) tabRefs.current.set(tab.name, el); }}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg focus:outline-none flex items-center ${activeTab.name === tab.name ? 'bg-white text-black' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.icon && <tab.icon className="mr-2" />} 
            {tab.name}
          </button>
        ))}
        {/* Animated underline */} 
        <div 
          ref={underlineRef} 
          className="absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-out"
        />
        {tabs.length > numVisibleTabs && (
          <div className="relative ml-auto" ref={overflowMenuRef}>
            <button
              className={`py-2 px-4 text-sm font-medium flex items-center text-gray-500`}
              onClick={() => setShowOverflowMenu(!showOverflowMenu)}
            >
              <BsThreeDots className="mr-2" />
            </button>
            {showOverflowMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {tabs.slice(numVisibleTabs).map((tab) => (
                  <li key={tab.name}>
                    <button
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${activeTab.name === tab.name ? 'bg-gray-100 text-black' : 'text-gray-600'}`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab.name}
                    </button>
                  </li>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div 
        className="p-4 rounded-md" 
        ref={contentRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {activeTab.content && activeTab.content.length > 0 ? (
          activeTab.content.map((item, index) => (
            <li key={index} className="mb-2 last:mb-0">
              {item}
            </li>
          ))
        ) : (
          <p>No content available for this section.</p>
        )}
      </div>
    </div>
  );
};

export default ExperienceTabs;
