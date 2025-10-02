import { ArrowUpRight } from 'lucide-react';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
];

const Footer = () => {
  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    if (!targetId) return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-12">
      <div className="max-w-screen-lg mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Nikolay Trakiyski. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={handleScroll}
                className="text-gray-600 hover:text-black text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <a
              href="https://linkedin.com/in/nikolaytrakiyski"
              className="inline-flex items-center text-gray-600 hover:text-black text-sm font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight className="size-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;