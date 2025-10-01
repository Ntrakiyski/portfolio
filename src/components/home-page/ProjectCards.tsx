import React, { useRef, useEffect } from 'react';
import { SectionWrapper } from '../common';
import SectionTitle from './SectionTitle';
import SecondaryButton from '../common/SecondaryButton';
import contentData from '../../data/content.json';
import { ContentData } from '../../types/content';
import { gsap } from 'gsap';

const ProjectCards = () => {
  const { projects: projectsContent } = (contentData as ContentData).mainContent;
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const button = card.querySelector('.project-button');
      if (!button) return;
      
      const handleMouseEnter = () => {
        gsap.to(button, {
          backgroundColor: '#000000',
          color: '#ffffff',
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(button, {
          backgroundColor: 'transparent',
          color: '#000000',
          duration: 0.3,
          ease: "power2.out"
        });
      };
      
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);
  
  // Flatten all projects from all categories
  const allProjects = projectsContent.categories.flatMap(category => 
    category.projects.map(project => ({
      ...project,
      id: project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      category: category.name
    }))
  );

  return (
    <SectionWrapper id="projects" className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 text-left">
        <SectionTitle 
          tag={projectsContent.tag}
          title={projectsContent.headline}
          subtitle={projectsContent.description}
        />
      </div>
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <div 
              key={index} 
              ref={(el) => cardsRef.current[index] = el}
              className="group flex flex-col border border-gray-200 shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <img 
                    src={`https://picsum.photos/400/200?random=${index + 1}`}
                    alt={project.title} 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <SecondaryButton
                    text="View Project"
                    routeOrSection={`/project/${project.id}`}
                    className="project-button"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProjectCards;