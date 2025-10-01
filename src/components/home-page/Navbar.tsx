import React from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    if (!targetId) return;
    const targetElement = document.querySelector(targetId);
    if (targetId === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    handleScroll(event);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="w-full bg-white z-50 border-b border-gray-200 flex justify-center">
        <div className="w-full max-w-screen-lg px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#top" onClick={handleScroll} className="text-xl font-bold text-primary-text">
                NT
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              <a href="#about" onClick={handleScroll} className="text-base text-gray-500 hover:text-primary-text transition-colors">About</a>
              <a href="#services" onClick={handleScroll} className="text-base text-gray-500 hover:text-primary-text transition-colors">Services</a>
              <a href="#projects" onClick={handleScroll} className="text-base text-gray-500 hover:text-primary-text transition-colors">Projects</a>
              <a
                href="/book-a-call"
                data-cal-namespace="free-call"
                data-cal-link="trakiyski/free-call"
                data-cal-config='{"layout":"month_view"}'
                onClick={(e) => e.preventDefault()}
                className="ml-4 inline-block text-white bg-black hover:bg-gray-800 text-sm py-3 px-5 uppercase border border-transparent text-center"
              >
                Book free call
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-primary-text focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center md:hidden">
          <nav className="flex flex-col items-center space-y-8">
            <a href="#about" onClick={handleMobileLinkClick} className="text-2xl text-gray-600 hover:text-primary-text transition-colors">About</a>
            <a href="#services" onClick={handleMobileLinkClick} className="text-2xl text-gray-600 hover:text-primary-text transition-colors">Services</a>
            <a href="#projects" onClick={handleMobileLinkClick} className="text-2xl text-gray-600 hover:text-primary-text transition-colors">Projects</a>
            <a
              href="/book-a-call"
              data-cal-namespace="free-call"
              data-cal-link="trakiyski/free-call"
              data-cal-config='{"layout":"month_view"}'
              onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); }}
              className="mt-2 inline-block text-white bg-black hover:bg-gray-800 text-base py-4 px-6 uppercase border border-transparent text-center"
            >
              Book free call
            </a>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
