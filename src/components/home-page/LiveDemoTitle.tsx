import React from 'react';

const LiveDemoTitle: React.FC = () => {
  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 text-sm font-medium">
        <div className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
        Latest Projects
      </div>
    </div>
  );
};

export default LiveDemoTitle;
