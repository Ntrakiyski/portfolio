
import { SectionWrapper } from '../common';
import SectionTitle from './SectionTitle';
import MainButton from '../common/MainButton';
import SecondaryButton from '../common/SecondaryButton';
import contentData from '../../data/content.json';
import { ContentData } from '../../types/content';

const Hero = () => {
  const { hero } = (contentData as ContentData).mainContent;

  

  return (
    <SectionWrapper id="hero" className="flex items-center bg-white min-h-[calc(100vh-8rem)] py-20">
      <div className="text-left max-w-4xl px-4 lg:px-8">
        <SectionTitle 
          tag={hero.tagline} 
          title={hero.headline.replace(/\n/g, ' ')} 
          subtitle={hero.description} 
          isHero 
        />
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-x-6 gap-y-4">
          <MainButton>
            {hero.primaryButtonText}
          </MainButton>
          <SecondaryButton
            text={hero.secondaryButtonText}
            routeOrSection={hero.secondaryButtonHref}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Hero;

