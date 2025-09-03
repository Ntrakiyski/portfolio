import React from 'react';
import { Hero, Features, AboutMe, Projects, Experience, Process, Contact, Footer, LiveDemos } from '../components/home-page';
import Booker from '../components/home-page/Booker';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      {/* <main className="flex-grow">
        <Hero />
        <Booker />
        <Features />
        <AboutMe />
        <Projects />
        <Experience />
        <Process />
        <Contact />
      </main> */}
      <Footer />
    </div>
  );
};

export default HomePage;
