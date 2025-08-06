import { SectionWrapper } from '../common';
import SectionTitle from './SectionTitle';
import contentData from '../../data/content.json';
import { ContentData } from '../../types/content';
import Card from '../common/Card';

const Experience = () => {
  const { experience: experienceContent } = (contentData as ContentData).mainContent;

  return (
    <SectionWrapper id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
        <div className="text-left mb-16">
          <SectionTitle 
            tag={experienceContent.tag}
            title={experienceContent.headline}
            subtitle=""
          />
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gray-100"></div>
          <div className="relative grid grid-cols-1 md:grid-cols-3">
            {experienceContent.experience_list.map((experienceItem, index) => (
              <Card
                key={index}
                image={experienceItem.image}
                title={experienceItem.title}
                description={experienceItem.description}
                cta={{ routeOrSection: "#contact", text: "Learn more" }}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
