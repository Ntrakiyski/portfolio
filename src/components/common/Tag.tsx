import React from 'react';

interface TagProps {
  text: string;
  color?: string; // Optional color for the dot, defaults to green
}

const Tag: React.FC<TagProps> = ({ text, color = 'bg-green-500' }) => {
  return (
    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-800 text-sm">
            <span className={`w-2 h-2 ${color}`}></span>
      <span>{text}</span>
    </div>
  );
};

export default Tag;
