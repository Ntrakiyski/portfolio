import React, { useEffect, useRef, useState } from 'react';
import contentData from '../data/content.json'; 
import { FaLinkedin } from 'react-icons/fa'; // Import FaLinkedin icon
import { navItems } from '../constants/navItems'; // Import navItems (for consistency)

interface MainContentProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
  highlightTarget: string | null; // ID of the section to highlight
  setHighlightTarget: (value: string | null) => void; // To clear the highlight target
}

const MainContent: React.FC<MainContentProps> = ({ 
  setActiveSection, 
  activeSection,
  highlightTarget, 
  setHighlightTarget 
}) => {
  const { mainContent } = contentData; 

  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    'why-me': useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const [visualHighlightedSection, setVisualHighlightedSection] = useState<string | null>(null);
  const highlightAnimationTimerRef = useRef<NodeJS.Timeout | null>(null); 

  // Effect for Intersection Observer: determines the currently active section based on scroll position
  // This is primarily for updating the sidebar's active link.
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-200px 0px -50% 0px', 
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); 
        }
      });
    }, observerOptions);

    const refs = Object.values(sectionRefs);
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [setActiveSection]);

  // Effect for triggering the visual highlight based on highlightTarget prop
  // This highlight is now strictly controlled by the scrollToSection function in App.tsx
  useEffect(() => {
    if (highlightTarget) {
      if (highlightAnimationTimerRef.current) {
        clearTimeout(highlightAnimationTimerRef.current);
      }

      setVisualHighlightedSection(highlightTarget);
      
      const clearHighlightTimeout = setTimeout(() => {
        setVisualHighlightedSection(null);
        setHighlightTarget(null); // Crucially, reset the highlightTarget in App.tsx after animation
      }, 1500); 
      
      highlightAnimationTimerRef.current = clearHighlightTimeout;
    } else {
      // If highlightTarget is null (e.g., initial load, manual scroll), ensure no highlight is active
      setVisualHighlightedSection(null);
      if (highlightAnimationTimerRef.current) {
        clearTimeout(highlightAnimationTimerRef.current);
        highlightAnimationTimerRef.current = null;
      }
    }

    return () => {
      if (highlightAnimationTimerRef.current) {
        clearTimeout(highlightAnimationTimerRef.current);
      }
    };
  }, [highlightTarget, setHighlightTarget]); 

  interface JobProps {
    title: string;
    company: string;
    dates: string;
    challenge: string;
    points: string[];
  }
  
  const Job: React.FC<JobProps> = ({ title, company, dates, challenge, points }) => (
    <div>
      <h3 className="text-xl font-semibold text-black">{title}</h3>
      <p className="text-md text-gray-600">{company} | {dates}</p>
      <p className="italic text-gray-500 my-3 bg-gray-50 p-3 rounded-md">
        <strong>The Challenge:</strong> {challenge}
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700 mt-3">
        {points.map((point, index) => <li key={index}>{point}</li>)}
      </ul>
    </div>
  );

  interface SkillProps {
    title: string;
    description: string;
  }

  const Skill: React.FC<SkillProps> = ({ title, description }) => (
     <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-700 leading-relaxed mt-2">{description}</p>
    </div>
  );

  const badgeClasses = "inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors duration-200";

  return (
    <div id="cv-container" className="max-w-[800px] space-y-16">
      <section 
        id="about" 
        ref={sectionRefs.about} 
        className="scroll-mt-10" 
      >
        <div className={`
          p-5 rounded-xl 
          ${visualHighlightedSection === 'about' ? 'animate-section-highlight' : ''}
        `}>
          <h1 className="text-5xl font-bold text-black mb-3">
            {mainContent.intro.name}
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            {mainContent.intro.tagline}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm mb-8">
            {mainContent.intro.contactBadges.map((badge, index) => {
              if (badge.type === 'linkedin') {
                return (
                  <a 
                    key={index} 
                    href={badge.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-white px-3 py-1 rounded-full border border-[#0077B5] bg-[#0077B5] hover:bg-[#006097] transition-colors duration-200"
                  >
                    <FaLinkedin className="w-4 h-4 mr-1" />
                    {badge.text}
                  </a>
                );
              } else if (badge.type === 'location') {
                return (
                  <span key={index} className={badgeClasses}>
                    {badge.icon} {badge.text}
                  </span>
                );
              } else { 
                return (
                  <a key={index} href={badge.href} target="_blank" rel="noopener noreferrer" className={badgeClasses}>
                    {badge.icon} {badge.text}
                  </a>
                );
              }
            })}
          </div>

          <h2 className="text-3xl font-bold mb-6 text-black">{mainContent.bio.title}</h2>
          <p className="text-gray-700 leading-relaxed">
            {mainContent.bio.paragraph}
          </p>
        </div>
      </section>

      <hr />

      <section id="experience" ref={sectionRefs.experience} className="scroll-mt-10">
        <div className={`
          p-5 rounded-xl 
          ${visualHighlightedSection === 'experience' ? 'animate-section-highlight' : ''}
        `}>
          <h2 className="text-3xl font-bold mb-8 text-black">{mainContent.experience.title}</h2>
          <div className="space-y-12">
            {mainContent.experience.jobs.map((job, index) => (
              <Job 
                key={index} 
                title={job.title}
                company={job.company}
                dates={job.dates}
                challenge={job.challenge}
                points={job.points}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="skills" ref={sectionRefs.skills} className="scroll-mt-10">
        <div className={`
          p-5 rounded-xl 
          ${visualHighlightedSection === 'skills' ? 'animate-section-highlight' : ''}
        `}>
          <h2 className="text-3xl font-bold mb-8 text-black">{mainContent.skills.title}</h2>
          <div className="space-y-6">
            {mainContent.skills.list.map((skill, index) => (
              <Skill 
                key={index} 
                title={skill.title}
                description={skill.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="why-me" ref={sectionRefs['why-me']} className="scroll-mt-10">
        <div className={`
          p-5 rounded-xl 
          ${visualHighlightedSection === 'why-me' ? 'animate-section-highlight' : ''}
        `}>
          <h2 className="text-3xl font-bold mb-8 text-black">{mainContent.whyMe.title}</h2>
          {mainContent.whyMe.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <hr/>

      <section id="contact" ref={sectionRefs.contact} className="text-center pb-8 scroll-mt-10">
        <div className={`
          p-5 rounded-xl 
          ${visualHighlightedSection === 'contact' ? 'animate-section-highlight' : ''}
        `}>
          <h2 className="text-2xl font-bold mb-4 text-black">{mainContent.contactInfo.title}</h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-xl mx-auto">
            {mainContent.contactInfo.introParagraph}
          </p>
          <div className="space-y-2 font-mono text-sm text-gray-800">
            <p><strong>Email:</strong> <a href={`mailto:${mainContent.contactInfo.email}`} className="text-indigo-600 hover:underline">{mainContent.contactInfo.email}</a></p>
            <p><strong>Phone:</strong> <a href={`tel:${mainContent.contactInfo.phone}`} className="text-indigo-600 hover:underline">{mainContent.contactInfo.phone}</a></p>
            <p><strong>LinkedIn:</strong> <a href={`https://www.linkedin.com/in/${mainContent.contactInfo.linkedin.split('/').pop()}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{mainContent.contactInfo.linkedin}</a></p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default MainContent;