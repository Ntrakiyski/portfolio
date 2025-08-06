

import { SectionWrapper } from '../common';
import SectionTitle from './SectionTitle';
import contentData from '../../data/content.json';
import { ContentData, FeatureItem } from '../../types/content.d';
import Card from '../common/Card';
import LiveDemos from './LiveDemos';

const Features = () => {
  const { features: featuresContent } = (contentData as ContentData).mainContent;

  return (
    <SectionWrapper id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
        <div className="text-left mb-16">
          <SectionTitle 
            tag={featuresContent.tag}
            title={featuresContent.headline}
            subtitle=""
          />
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gray-100"></div>
          <div className="relative grid grid-cols-1 md:grid-cols-3">
            {featuresContent.features_list.map((feature: FeatureItem, index: number) => (
              <Card
                key={index}
                image={feature.image}
                title={feature.title}
                description={feature.description}
                cta={{ routeOrSection: "#contact", text: "Learn more" }}
              />
            ))}
          </div>
        </div>
        <LiveDemos />

      </div>
    </SectionWrapper>
  );
};

export default Features;
