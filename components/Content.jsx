// src/components/Content.jsx
import React from 'react';
import contentData from '../data/content.json';
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import SectionDivider from './SectionDivider';
import ExperienceTabs from './ExperienceTabs';

/**
 * Reusable Job Item Component (internal to Content.jsx)
 */
const Job = ({ title, company, dates, challenge, points, summarizedPoints }) => (
  <div>
    <h3 className="text-xl font-semibold text-black">{title}</h3>
    <p className="text-md text-gray-600">{company} | {dates}</p>
    <p className="italic text-gray-500 my-3 bg-gray-50 p-3 rounded-md">
      <strong>The Challenge:</strong> {challenge}
    </p>
    <ExperienceTabs points={points} summarizedPoints={summarizedPoints} />
  </div>
);

/**
 * Reusable Skill Item Component (internal to Content.jsx)
 */
const Skill = ({ title, description }) => (
  <div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-700 leading-relaxed mt-2">{description}</p>
  </div>
);

/**
 * Contact Badges Component (internal to Content.jsx)
 * Assumes `badge.icon` is a string like "📧" or "FaLinkedin"
 */
const ContactBadges = ({ badges }) => {
  const IconComponents = {
    FaEnvelope: FaEnvelope,
    FaPhone: FaPhone,
    FaMapMarkerAlt: FaMapMarkerAlt,
    FaLinkedin: FaLinkedin,
  };

  const getIconColorClass = (type) => {
    switch (type) {
      case 'email':
        return 'text-red-700'; // Dull red
      case 'phone':
        return 'text-green-700'; // Dull green
      case 'location':
        return 'text-blue-700'; // Dull blue
      default:
        return ''; // No specific color for others, or default to gray
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm mb-8">
      {badges.map((badge, index) => {
        const IconComponent = IconComponents[badge.icon];
        const iconColorClass = getIconColorClass(badge.type);
        const iconElement = IconComponent ? <IconComponent className={`w-4 h-4 mr-1 ${iconColorClass}`} /> : null;

        const isLinkedIn = badge.type === 'linkedin';
        const linkProps = (badge.type === 'email' || badge.type === 'phone') ? {} : { target: '_blank', rel: 'noopener noreferrer' };

        const baseBadgeClasses = "inline-flex items-center px-3 py-1 rounded-full transition-colors duration-200";
        const badgeClasses = isLinkedIn
          ? `${baseBadgeClasses} text-white border border-[#0077B5] bg-[#0077B5] hover:bg-[#006097]`
          : `${baseBadgeClasses} bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200`;

        const content = (
          <>
            {iconElement} {badge.text}
          </>
        );

        if (badge.href) {
          return (
            <a
              key={index}
              href={badge.href}
              className={badgeClasses}
              {...linkProps}
            >
              {content}
            </a>
          );
        } else {
          return (
            <span key={index} className={badgeClasses}>
              {content}
            </span>
          );
        }
      })}
    </div>
  );
};

/**
 * Section Wrapper Component (internal to Content.jsx)
 */
const SectionWrapper = ({ id, sectionRef, isHighlighted, children }) => {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={`scroll-mt-10 ${id === 'contact' ? 'text-center pb-8' : ''}`}
    >
      <div className={`
        px-4 rounded-xl
        ${isHighlighted ? 'animate-section-highlight' : ''}
      `}>
        {children}
      </div>
    </section>
  );
};


// Main Content Component
const Content = ({ sectionRefs, visualHighlightedSection }) => {
  const { mainContent } = contentData;

  return (
    <>
      {/* About Section */}
      <SectionWrapper id="about" sectionRef={sectionRefs.about} isHighlighted={visualHighlightedSection === 'about'}>
        <h1 className="text-4xl pt-4 font-bold text-black mb-3">{mainContent.intro.name}</h1>
        <p className="text-xl text-gray-700 mb-8">{mainContent.intro.tagline}</p>
        <ContactBadges badges={mainContent.intro.contactBadges} />
        <h2 className="text-3xl font-bold mb-6 text-black">{mainContent.bio.title}</h2>
        <p className="text-gray-700 leading-relaxed">{mainContent.bio.paragraph}</p>
      </SectionWrapper>

      <SectionDivider />

      {/* Experience Section */}
      <SectionWrapper id="experience" sectionRef={sectionRefs.experience} isHighlighted={visualHighlightedSection === 'experience'}>
        <h2 className="text-3xl font-bold mb-8 text-black">{mainContent.experience.title}</h2>
        <div className="space-y-12">
          {mainContent.experience.jobs.map((job, index) => <Job key={index} {...job} />)}
        </div>
      </SectionWrapper>

      <SectionDivider />

      {/* Skills Section */}
      <SectionWrapper id="skills" sectionRef={sectionRefs.skills} isHighlighted={visualHighlightedSection === 'skills'}>
        <h2 className="text-3xl font-bold mb-8 text-black">{mainContent.skills.title}</h2>
        <div className="space-y-6">
          {mainContent.skills.list.map((skill, index) => <Skill key={index} {...skill} />)}
        </div>
      </SectionWrapper>

      <SectionDivider />

      {/* Why Me Section */}
      <SectionWrapper id="why-me" sectionRef={sectionRefs['why-me']} isHighlighted={visualHighlightedSection === 'why-me'}>
        <h2 className="text-3xl font-bold mb-8 text-black">{mainContent.whyMe.title}</h2>
        {mainContent.whyMe.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
        ))}
      </SectionWrapper>

      <SectionDivider />

      {/* Contact Section */}
      <SectionWrapper id="contact" sectionRef={sectionRefs.contact} isHighlighted={visualHighlightedSection === 'contact'}>
        <h2 className="text-2xl font-bold mb-4 text-black">{mainContent.contactInfo.title}</h2>
        <p className="text-gray-700 leading-relaxed mb-6 max-w-xl mx-auto">{mainContent.contactInfo.introParagraph}</p>
        <div className="space-y-2 font-mono text-sm text-gray-800">
          <p><strong>Email:</strong> <a href={`mailto:${mainContent.contactInfo.email}`} className="text-indigo-600 hover:underline">{mainContent.contactInfo.email}</a></p>
          <p><strong>Phone:</strong> <a href={`tel:${mainContent.contactInfo.phone}`} className="text-indigo-600 hover:underline">{mainContent.contactInfo.phone}</a></p>
          <p><strong>LinkedIn:</strong> <a href={`https://www.linkedin.com/in/${mainContent.contactInfo.linkedin.split('/').pop()}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{mainContent.contactInfo.linkedin}</a></p>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Content;