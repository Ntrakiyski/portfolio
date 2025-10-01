import { SectionWrapper } from '../common';
import SectionTitle from './SectionTitle';
import contentData from '../../data/content.json';
import { ContentData } from '../../types/content';
import { BrainCircuit, Globe, Zap, LayoutDashboard } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../common/ui/Accordion';

const Services = () => {
  const { features: featuresContent } = (contentData as ContentData).mainContent;

  return (
    <SectionWrapper id="services" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 text-left">
        <SectionTitle 
          tag={featuresContent.tag}
          title={featuresContent.headline}
          subtitle={featuresContent.description}
        />
      </div>
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresContent.features_list.map((feature, index) => (
            <div key={index} className="flex flex-col border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 flex-grow">
                <div className="mb-4">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
