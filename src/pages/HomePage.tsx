import React from 'react';
import { Hero, Footer } from '../components/home-page';
import AboutMe from '../components/home-page/AboutMe';
import Services from '../components/home-page/Services';
import ProjectCards from '../components/home-page/ProjectCards';
import Cta from '../components/home-page/Cta';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-grow">
        <Hero />
        <AboutMe />
        <Services />
        <ProjectCards />
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
