import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SectionWrapper, CategoryBadge } from '../common';
import SectionTitle from './SectionTitle';
import SecondaryButton from '../common/SecondaryButton';
import contentData from '../../data/content.json';
import { ContentData, ProjectCategoryType } from '../../types/content';
import { gsap } from 'gsap';

const NewProjectCards = () => {
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

  const gradients = [
    'from-pink-400 via-pink-500 to-red-500',
    'from-blue-900 via-blue-800 to-indigo-900',
    'from-teal-500 via-teal-600 to-cyan-600',
    'from-blue-500 via-blue-600 to-indigo-700',
    'from-purple-500 via-purple-600 to-pink-600',
    'from-green-500 via-green-600 to-teal-600'
  ];

  const leftProjects = sortedProjects.slice(0, 3);
  const rightProjects = sortedProjects.slice(3, 5);

  return (
    <SectionWrapper id="projects" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 text-left">
        <SectionTitle
          tag={projectsContent.tag}
          title={projectsContent.headline}
        />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {leftProjects.map((project, index) => {
              const globalIndex = index;
              const gradientClass = gradients[globalIndex % gradients.length];
              return (
                <Link
                  key={globalIndex}
                  to={`/project/${project.id}`}
                  className={`group flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 bg-gradient-to-br ${gradientClass}`}
                >
                  <div
                    ref={(el) => { cardsRef.current[globalIndex] = el }}
                    className="p-6 lg:p-8 flex flex-col h-full relative"
                  >
                    <div className="flex flex-col justify-between flex-1 text-white relative z-10">
                      <div>
                        <div className="mb-3">
                          <CategoryBadge category={project.category} />
                        </div>
                        <h3 className="font-semibold mb-4 text-xl lg:text-2xl leading-tight">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <p className="text-white/90 mb-6 line-clamp-3 text-sm lg:text-base">
                            {project.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-6">
                        <img
                          src="/images/test.png"
                          alt={project.title}
                          className="w-full h-48 lg:h-64 object-cover rounded-xl mix-blend-multiply"
                        />
                      </div>
                      <div className="mt-4 pt-4">
                        <SecondaryButton
                          text="View Project"
                          routeOrSection={`/project/${project.id}`}
                          className="project-button w-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="space-y-8 lg:col-span-1">
            {rightProjects.map((project, index) => {
              const globalIndex = 3 + index;
              const gradientClass = gradients[globalIndex % gradients.length];
              return (
                <Link
                  key={globalIndex}
                  to={`/project/${project.id}`}
                  className={`group flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 bg-gradient-to-br ${gradientClass}`}
                >
                  <div
                    ref={(el) => { cardsRef.current[globalIndex] = el }}
                    className="p-6 lg:p-8 flex flex-col h-full relative"
                  >
                    <div className="flex flex-col justify-between flex-1 text-white relative z-10">
                      <div>
                        <div className="mb-3">
                          <CategoryBadge category={project.category} />
                        </div>
                        <h3 className="font-semibold mb-4 text-xl lg:text-2xl leading-tight">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <p className="text-white/90 mb-6 line-clamp-3 text-sm lg:text-base">
                            {project.description}
                          </p>
                        )}
                      </div>
                      <div className="mt-6">
                        <img
                          src="/images/test.png"
                          alt={project.title}
                          className="w-full h-48 lg:h-64 object-cover rounded-xl mix-blend-multiply"
                        />
                      </div>
                      <div className="mt-4 pt-4">
                        <SecondaryButton
                          text="View Project"
                          routeOrSection={`/project/${project.id}`}
                          className="project-button w-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default NewProjectCards;