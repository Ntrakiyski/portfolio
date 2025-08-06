import React from 'react';

interface SectionTitleProps {
  tag?: string;
  title: string;
  subtitle?: React.ReactNode;
  isHero?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ tag, title, subtitle, isHero = false }) => {
  const highlightWords = ['AI', 'ML', 'Web', 'Full-Stack', 'DevOps', 'Cloud', 'Data', 'Software', 'Solutions'];

  const getHighlightedTitle = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\b\w+\b)/g);
    return parts.map((part, index) => {
      if (highlightWords.includes(part)) {
        return (
          <span key={index} className="text-highlight-text">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const titleSize = isHero ? 'md:text-6xl' : 'md:text-5xl';

  return (
    <div className="text-left">
      {tag && (
        <span className="font-plex-mono text-sm uppercase text-gray-600 block mb-2">
          [{tag}]
        </span>
      )}
      <h2 className={`font-plex-mono text-3xl ${titleSize} text-primary-text leading-snug md:leading-normal`}>
        {getHighlightedTitle(title)}
      </h2>
      {subtitle && <p className="mt-6 text-lg text-gray-600 max-w-xl">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;

