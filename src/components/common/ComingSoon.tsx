import React from 'react';

const ComingSoon: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 text-center">
        Coming Soon
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 text-center max-w-2xl leading-relaxed">
        My website is under construction. I'm working hard to bring you an amazing experience. Stay tuned for exciting updates!
      </p>
    </div>
  );
};

export default ComingSoon;