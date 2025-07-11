import React, { useState, useEffect, useRef } from 'react';
import { FaList, FaCompressAlt, FaTools, FaLightbulb, FaProjectDiagram } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

interface ExperienceTabsProps {
  points: string[];
  summarizedPoints: string[];
}

const ExperienceTabs: React.FC<ExperienceTabsProps> = ({ points, summarizedPoints }) => {
  const tabs = [
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
      content: [
        'Proficient in various development tools.',
        'Experienced with version control systems.',
        'Familiar with CI/CD pipelines.',
        'Adept at using IDEs and debugging tools.',
      ],
    },
    {
      name: 'Skills',
      icon: FaLightbulb,
      content: [
        'Strong problem-solving abilities.',
        'Excellent communication skills.',
        'Quick learner and adaptable.',
        'Team player with leadership potential.',
      ],
    },
    {
      name: 'Projects',
      icon: FaProjectDiagram,
      content: [
        'Contributed to open-source projects.',
        'Developed several personal applications.',
        'Managed full-stack development projects.',
        'Successfully delivered client projects on time and within budget.',
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<string>('Summarised');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [numVisibleTabs, setNumVisibleTabs] = useState(tabs.length);
  const [showOverflowMenu, setShowOverflowMenu] = useState(false);
  const overflowMenuRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="mt-4">
      <div ref={tabsContainerRef} className="flex border-b border-gray-200 mb-4 relative">
        {tabs.slice(0, numVisibleTabs).map((tab) => (
          <button
            key={tab.name}
            className={`
              py-2 px-4 text-sm font-medium flex items-center
              ${activeTab === tab.name
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'}
            `}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon && <tab.icon className="mr-2" />}
            {tab.name}
          </button>
        ))}
        {tabs.length > numVisibleTabs && (
          <div className="relative ml-auto" ref={overflowMenuRef}>
            <button
              className={`
                py-2 px-4 text-sm font-medium flex items-center
                text-gray-500
              `}
              onClick={() => setShowOverflowMenu(!showOverflowMenu)}
            >
              <BsThreeDots className="mr-2" />
            </button>
            {showOverflowMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {tabs.slice(numVisibleTabs).map((tab) => (
                  <button
                    key={tab.name}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setActiveTab(tab.name);
                      setShowOverflowMenu(false);
                    }}
                  >
                    {tab.icon && <tab.icon className="mr-2 inline-block" />}
                    {tab.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 rounded-md">
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {tabs.find((tab) => tab.name === activeTab)?.content.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceTabs;
