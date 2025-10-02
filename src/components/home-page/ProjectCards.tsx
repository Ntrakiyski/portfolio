import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SectionWrapper, CategoryBadge } from '../common';
import SectionTitle from './SectionTitle';
import SecondaryButton from '../common/SecondaryButton';
import contentData from '../../data/content.json';
import { ContentData, ProjectCategoryType } from '../../types/content';
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
      category: (project.category || category.name) as ProjectCategoryType,
      featured: project.featured || false
    }))
  );

  // Sort projects: featured first
  const sortedProjects = [...allProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <SectionWrapper id="projects" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 text-left">
        <SectionTitle 
          tag={projectsContent.tag}
          title={projectsContent.headline}
          subtitle={projectsContent.description}
        />
      </div>
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedProjects.map((project, index) => (
            <Link
              key={index}
              to={`/project/${project.id}`}
              className={`group flex flex-col border shadow-sm overflow-hidden bg-white transition-all duration-300 ${
                project.featured
                  ? 'md:col-span-2'
                  : 'border-gray-200'
              }`}
            >
              <div
                ref={(el) => { cardsRef.current[index] = el }}
                className={`p-6 flex-grow flex flex-col h-full ${project.featured ? 'md:flex-row md:gap-8' : ''}`}
              >
                <div className={`mb-4 ${project.featured ? 'md:w-1/2 md:mb-0 md:h-full md:flex md:items-center md:justify-center' : 'h-64 flex items-center justify-center'}`}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`flex flex-col flex-grow ${project.featured ? 'md:w-1/2' : ''}`}>
                  <div className="mb-3">
                    <CategoryBadge category={project.category} />
                  </div>
                  <h3 className={`font-semibold mb-4 ${
                    project.featured ? 'text-2xl md:text-3xl' : 'text-xl'
                  }`}>
                    {project.title}
                  </h3>
                  {project.featured && (
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  )}
                  <div className="mt-auto pt-4">
                    <SecondaryButton
                      text="View Project"
                      routeOrSection={`/project/${project.id}`}
                      className="project-button w-full sm:w-auto"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ProjectCards;
