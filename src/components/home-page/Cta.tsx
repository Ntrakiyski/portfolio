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
          <div className="w-full flex flex-col sm:flex-row gap-4 mt-8 items-center justify-center">
            <a
              href="mailto:nikolay.trakiyski@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 bg-white text-black font-medium text-sm uppercase text-center transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 border border-transparent"
            >
              Contact Me
            </a>
            <a
              data-cal-namespace="free-call"
              data-cal-link="trakiyski/free-call"
              data-cal-config='{"layout":"month_view"}'
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 bg-black text-white font-medium text-sm uppercase text-center transition-opacity hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 border border-transparent cursor-pointer"
            >
              Book Free Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;