import SectionWrapper from "../hoc/SectionWrapper";
import content from "../../data/content.json";
import { LiveDemoItem } from "../../types/content";
import LiveDemoTitle from "./LiveDemoTitle";
import { Github, Globe } from 'lucide-react';

const LiveDemos = () => {
  const { liveDemos } = content.mainContent;

  return (
    <div className="mx-auto max-w-screen-lg py-32 sm:py-16 bg-white">
      <div className="text-left mb-10">
        {/* Placeholder for new SectionTitle component */}
        <LiveDemoTitle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {liveDemos.demos_list.map((demo: LiveDemoItem, index: number) => (
          <a
            key={index}
            href={demo.liveLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 p-6"
          >
            <div className="flex flex-col">
              {demo.status && (
                <span className={`w-fit inline-block text-xs font-medium px-2 py-0.5 rounded-full ${(() => {
                  switch (demo.status.toLowerCase()) {
                    case 'done': return 'bg-green-100 text-green-800 border border-green-400';
                    case 'in progress': return 'bg-yellow-100 text-yellow-800 border border-yellow-400';
                    default: return 'bg-gray-100 text-gray-800 border border-gray-400';
                  }
                })()} mb-1 uppercase tracking-wider`}>
                  {demo.status}
                </span>
              )}
              <h3 className="font-semibold text-lg text-gray-900">{demo.title}</h3>
              <p className="mt-2 text-gray-600">{demo.description}</p>
              <div className="flex flex-row mt-4 space-x-4">
                {demo.githubLink && (
                  <a href={demo.githubLink || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-900">
                    <Github className="h-5 w-5" />
                    <span className="ml-1">GitHub</span>
                  </a>
                )}
                {demo.liveLink && (
                  <a href={demo.liveLink || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-900">
                    <Globe className="h-5 w-5" />
                    <span className="ml-1">Preview</span>
                  </a>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(LiveDemos, "live-demos");
