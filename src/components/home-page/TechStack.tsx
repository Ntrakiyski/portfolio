import { SectionWrapper } from '../common';
import SectionTitle from './SectionTitle';

const TechStack = () => {
  const technologies = [
    'React',
    'TypeScript',
    'Node.js',
    'Python',
    'TensorFlow',
    'PyTorch',
    'AWS',
    'GCP',
    'Docker',
    'Kubernetes',
    'Next.js',
    'Vite',
  ];

  // Duplicate the array to create a seamless loop
  const allLogos = [...technologies, ...technologies];

  const headline = "Technologies I Work With";
  const subtitle = "I leverage a modern and robust stack to build high-performance, scalable, and intelligent applications.";

  return (
    <SectionWrapper id="tech-stack" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 text-center">
        <SectionTitle 
          tag="Tech Stack"
          title={headline}
          subtitle={subtitle}
        />
      </div>
      <div className="w-full overflow-hidden mt-16">
        <div className="flex w-max animate-scroll group-hover:pause">
          {allLogos.map((tech, index) => (
            <div key={index} className="flex-shrink-0 w-48 h-24 flex items-center justify-center mx-4">
              <span className="text-lg font-semibold text-gray-500">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TechStack;
