// import { navItems } from '../../../constants/navItems'; // Not needed as only CV and LinkedIn links are kept
import { ArrowUpRight } from 'lucide-react';
// import { NavItem } from '../../types/types'; // Not needed as navItems are commented out

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden flex items-center justify-center min-h-screen">
      {/* Background "n.trakiyski" text */}
      <div
        className="absolute inset-0 flex items-center justify-center" // This centers the text visually in the footer
      >
        <span
          className="bg-clip-text font-bold text-transparent text-center"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            fontSize: 'clamp(4rem, 20vw, 12rem)',
            lineHeight: '1',
            color: 'rgba(0, 0, 0, 0.08)',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          n.trakiyski
        </span>
      </div>

      {/* Content overlay: "Website coming soon" and buttons */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* "Website coming soon" message as an H1 title */}
        <h1 className="text-gray-600 text-3xl font-semibold mb-6">Website coming soon</h1>

        {/* Buttons container, positioned under the H1 title */}
        <div className="flex gap-x-4"> {/* Adjust gap between buttons as needed */}
          {/* CV Button */}
          <a href="https://trakiyski.work/cv/nikolay-trakiyski-cv.pdf"
             className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
             target="_blank" rel="noopener noreferrer">
            CV <ArrowUpRight className="size-4 ml-1" /> {/* Added margin-left to icon */}
          </a>

          {/* LinkedIn Button */}
          <a href="https://linkedin.com/in/nikolaytrakiyski"
             className="inline-flex items-center justify-center px-6 py-3 text-white font-medium transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
             style={{ backgroundColor: '#0A66C2' }} // LinkedIn blue hex color
             target="_blank" rel="noopener noreferrer">
            LinkedIn <ArrowUpRight className="size-4 ml-1" /> {/* Added margin-left to icon */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;