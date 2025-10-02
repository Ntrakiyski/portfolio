import React from 'react';
import { Hero, Footer } from '../components/home-page';
import AboutMe from '../components/home-page/AboutMe';
import Services from '../components/home-page/Services';
import ProjectCards from '../components/home-page/ProjectCards';
import Cta from '../components/home-page/Cta';
import Booker from '../components/home-page/Booker';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-grow">
        <Hero />
        <AboutMe />
        <Services />
        <ProjectCards />
        <Cta />
        <Booker />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
