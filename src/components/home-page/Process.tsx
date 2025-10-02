import { SectionWrapper } from '../common';
import MainButton from '../common/MainButton';
import SectionTitle from './SectionTitle';
import contentData from '../../data/content.json';
import { ContentData, ProcessStep } from '../../types/content';

const Process = () => {
  const { process } = (contentData as ContentData).mainContent;

  

  return (
    <SectionWrapper id="process" className="py-24 sm:py-32">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start">
          <div className="text-left">
            <SectionTitle 
              tag={process.tag}
              title={process.headline}
              subtitle={process.description}
            />
            <div className="mt-8 max-sm:w-full">
              <MainButton>
                {process.primaryButtonText}
              </MainButton>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <div className="flex flex-col">
              {process.steps.map((step: ProcessStep) => (
                <div key={step.id} className="py-8 border-b border-gray-200">
                  <div className="flex items-start gap-x-6">
                    <span className="text-xl text-gray-400 w-8 text-right flex-shrink-0">{step.id}</span>
                    <div className="flex-grow">
                      <h3 className="text-xl text-black">{step.title}</h3>
                      <p className="mt-2 text-base text-gray-900">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Process;
