import { SectionWrapper } from '../common';
import SectionTitle from './SectionTitle';
import { AnimatedSliderText } from './AnimatedSliderText';
import contentData from '../../data/content.json';
import { ContentData } from '../../types/content';

const AboutMe = () => {
  const { aboutMe } = (contentData as ContentData).mainContent;

  return (
    <SectionWrapper id="about" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
        <div className="text-left">
          <SectionTitle 
            tag={aboutMe.tag}
            title=""
          />
          <AnimatedSliderText heading={aboutMe.headline} />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutMe;
