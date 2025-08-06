import { SectionWrapper } from '../common';
import SectionTitle from './SectionTitle';
import contentData from '../../data/content.json';
import { ContentData } from '../../types/content';
import { BrainCircuit, Globe, Zap, LayoutDashboard } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../common/ui/Accordion';

const Projects = () => {
  const { projects: projectsContent } = (contentData as ContentData).mainContent;

  return (
    <SectionWrapper id="projects" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 text-left">
        <SectionTitle 
          tag={projectsContent.tag}
          title={projectsContent.headline}
          subtitle={projectsContent.description}
        />
      </div>
      <div className="mx-auto max-w-screen-lg px-4 lg:px-8 mt-16">
        <div className="rounded-lg border border-gray-200 shadow-sm w-full">
          <Accordion type="single" collapsible className="w-full">
            {projectsContent.categories.map((category, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger
                icon={(() => {
                  switch (category.name) {
                    case 'AI Agents with Vector store and tools': return BrainCircuit;
                    case 'Full-stack web application': return Globe;
                    case 'Workflow automations': return Zap;
                    case 'Dashboards': return LayoutDashboard;
                    default: return undefined;
                  }
                })()}
                subtitle={projectsContent.description}
              >
                {category.name}
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600 border-t border-gray-200 p-6">
                {category.detailedDescription && (
                  <p className="mb-4">{category.detailedDescription}</p>
                )}
                {(category.servicesInclude && category.servicesInclude.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-primary-text mb-2">Services Include:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {category.servicesInclude.map((service, i) => (
                          <li key={i}>{service}</li>
                        ))}
                      </ul>
                    </div>
                    {(category.deliverables && category.deliverables.length > 0) && (
                      <div>
                        <h4 className="font-semibold text-primary-text mb-2">Deliverables:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {category.deliverables.map((deliverable, i) => (
                            <li key={i}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
    </SectionWrapper>
  );
};

export default Projects;
