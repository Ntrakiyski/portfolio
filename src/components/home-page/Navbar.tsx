import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  // FIX 1: Use useRef to store the last scroll position. This prevents the useEffect from re-running constantly on scroll.
  const lastScrollY = useRef(0);
  const headerRef = useRef(null);

  useEffect(() => {
    // Threshold in pixels to start hiding/showing the navbar (e.g., scroll 100px before it starts hiding)
    const scrollThreshold = 100;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Hide on Scroll Down past the threshold
      if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
        setIsVisible(false); // Scrolling down -> Hide
      } 
      // 2. Show on Scroll Up
      else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true); // Scrolling up -> Show
      }

      // 3. Always show at the very top (currentScrollY <= 0)
      if (currentScrollY <= 0) {
        setIsVisible(true);
      }

      // Update the ref value for the next scroll event
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Cleanup function to remove the listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures it runs only once

  // GSAP Animation: runs whenever isVisible changes
  useEffect(() => {
    if (headerRef.current) {
      // isVisible ? y: 0 (visible) : y: -100 (hidden)
      // -100 is chosen assuming the navbar height is less than or equal to 100px (it's h-24, or 96px)
      gsap.to(headerRef.current, {
        y: isVisible ? 0 : -100, 
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  }, [isVisible]);

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
      <header
        ref={headerRef}
        className="bg-white z-50 border-t border-l border-r border-gray-200"
        // FIX 2: Change position 'sticky' to 'fixed' for smooth GSAP y-translation
        style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '1200px' }}
      >
        <div className="w-full px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-primary-text">
                NT
              </Link>
            </div>

            {/* Desktop Navigation Links - Centered */}
            <nav className="hidden md:flex flex-1 justify-center items-center space-x-10">
              <a href="#about" onClick={handleScroll} className="text-base text-gray-500 hover:text-primary-text transition-colors">About</a>
              <a href="#services" onClick={handleScroll} className="text-base text-gray-500 hover:text-primary-text transition-colors">Services</a>
              <a href="#projects" onClick={handleScroll} className="text-base text-gray-500 hover:text-primary-text transition-colors">Projects</a>
            </nav>

            {/* Desktop Book Call Button - Right */}
            <div className="hidden md:block">
              <a
                href="/book-a-call"
                data-cal-namespace="free-call"
                data-cal-link="trakiyski/free-call"
                data-cal-config='{"layout":"month_view"}'
                onClick={(e) => e.preventDefault()}
                className="inline-block text-white bg-black hover:bg-gray-800 text-sm py-3 px-5 uppercase border border-transparent text-center transition-colors"
              >
                Book free call
              </a>
            </div>

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
      <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center md:hidden transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
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
    </>
  );
};

export default Navbar;