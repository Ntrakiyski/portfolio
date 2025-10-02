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
        />
      </div>
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {featuresContent.features_list.map((feature, index) => (
            <div
              key={index}
              className={`h-96 overflow-hidden group flex flex-col border border-gray-200 ${index === 1 ? 'border-l-0 border-r-0' : ''}`}
            >
              <div className="flex-1 relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${feature.image})` }}
                ></div>
              </div>
              <div className="p-6 text-black bg-white/90 flex-shrink-0">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;
