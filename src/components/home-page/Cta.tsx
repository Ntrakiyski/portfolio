import React from 'react';

const Cta = () => {
  return (
    <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to start your project?
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
            Get in touch with me today and let's discuss how I can help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 mt-6">
            <a 
              href="mailto:nikolay.trakiyski@gmail.com" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-medium transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              Contact Me
            </a>
            <a 
              href="/cv/nikolay-trakiyski-cv.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-medium transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 border border-gray-700"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;