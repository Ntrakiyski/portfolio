import { navItems } from '../../../constants/navItems';
import { ArrowUpRight } from 'lucide-react';
import { NavItem } from '../../types/types';

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden py-20">
      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-start gap-8 pb-60">
        <nav className="flex flex-col items-center gap-4">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            {navItems.map((item: NavItem) => (
              <li key={item.name}>
                <a href={item.href} className="font-medium text-gray-600 transition-opacity hover:opacity-75">
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/cv" className="flex items-center gap-0.5 font-medium text-gray-600 transition-opacity hover:opacity-75">
                CV <ArrowUpRight className="size-4" />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/nikolaytrakiyski" target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 font-medium text-gray-600 transition-opacity hover:opacity-75">
                LinkedIn <ArrowUpRight className="size-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <span
          className="bg-clip-text text-center font-bold text-transparent"
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
    </footer>
  );
};

export default Footer;
