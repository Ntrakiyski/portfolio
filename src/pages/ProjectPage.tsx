import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SectionWrapper } from '../components/common';
import SectionTitle from '../components/home-page/SectionTitle';
import MainButton from '../components/common/MainButton';
import Cta from '../components/home-page/Cta';
import Footer from '../components/home-page/Footer';
import Booker from '../components/home-page/Booker';
import contentData from '../data/content.json';
import { ContentData } from '../types/content';

// Video placeholder component
const VideoPlaceholder = ({ title }: { title: string }) => {
  const youtubeVideoId = 'ky1oHHJ5Ne8'; // Temporary video ID for all projects

  return (
    <div className="bg-gray-300 p-2 sm:p-6 lg:p-8 w-full">
      <div className="w-full aspect-video">
        <iframe
          className="w-full h-full shadow-lg"
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&rel=0`}
          title={`Demo Video - ${title}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

// Helper function to get tech explanations
const getTechExplanation = (tech: string): string => {
  const explanations: { [key: string]: string } = {
    'Telegram/Slack': 'Used for initial idea sharing and real-time communication with the AI agent through chat interfaces.',
    'Codegen': 'Generates production-ready code automatically based on the AI-analyzed requirements.',
    'Figma': 'Extracts UI design specifications and assets to guide the automated development process.',
    'Dart/Linear/Jira/Notion': 'Stores and manages project requirements, tasks, and documentation in your preferred project management system.',
    'Sentry': 'Monitors application errors and performance issues during development and deployment.',
    'GitHub': 'Handles version control and triggers automated CI/CD pipelines for code deployment.',
    'Vercel & Netlify': 'Deploys the generated frontend application with automatic scaling and preview environments.',
    'Umami & Plausible': 'Tracks user interactions and application usage analytics without compromising privacy.',
    'Gmail & Outlook': 'Integrates with email services for notifications and workflow updates.',
    'n8n': 'Orchestrates complex workflows connecting all tools in the AI development pipeline.',
    'FastAPI': 'Builds high-performance backend APIs for the AI agent orchestration.',
    'Celery': 'Handles asynchronous task processing for long-running AI operations.',
    'Qdrant': 'Stores and retrieves vector embeddings for semantic search in documentation.',
    'Next.js': 'Powers the frontend interface for user interactions with the AI agent.',
    'Supabase': 'Provides real-time database and authentication for user management.',
    'React': 'Builds interactive UI components for the development dashboard.',
    'MongoDB': 'Stores flexible project data and user configurations.',
    'TailwindCSS': 'Styles the application with utility classes for rapid development.',
    'React 19': 'Utilizes the latest React features for improved performance and concurrent rendering.',
    'Web Design': 'Ensures user-friendly interfaces through thoughtful UX/UI design principles.',
    'Forms': 'Captures user input for requirements gathering and feedback collection.',
    'Static Site Generation': 'Generates optimized static pages for documentation and landing sites.',
    'Custom APIs': 'Creates tailored endpoints for integrating third-party services.',
    'Process Mapping': 'Visualizes workflows to identify automation opportunities.',
    'Workflow Automation': 'Automates repetitive development tasks to accelerate delivery.',
    'Data Visualization': 'Displays project metrics and progress through interactive charts.',
    'OCR': 'Extracts text from design documents and scanned materials.',
    'N8N': 'Connects disparate tools through no-code workflow automation.',
    'Gmail API Integration': 'Reads and sends emails programmatically for communication automation.',
    'Next.js Chat Interface': 'Delivers a responsive chat UI with server-side rendering for speed.',
    'AI Elements for Contextual Responses': 'Generates intelligent replies based on conversation history and context.',
    'Shadcn/UI Components': 'Provides accessible, customizable UI building blocks.',
    'Email Drawer and Task Management': 'Manages email threads and creates action items from conversations.',
    'Built-in Logging': 'Tracks system events for debugging and performance optimization.',
    'Usage Metrics for Interactions': 'Measures user engagement to improve AI agent effectiveness.'
  };
  
  return explanations[tech] || 'Specialized technology used in this project implementation.';
};

// Industry-specific use cases data
const industryUseCases = {
  'ai-powered-software-development-agent': {
    'Startups & Entrepreneurs': [
      'Solo founders launching MVPs without hiring expensive development teams',
      'Non-technical entrepreneurs testing business ideas before major investment',
      'Startup teams reducing time-to-market from months to weeks',
      'Bootstrapped companies minimizing burn rate while building core products',
      'Idea-stage founders validating concepts with working prototypes'
    ],
    'Small Businesses': [
      'Local businesses digitizing operations without IT departments',
      'Service providers automating booking and customer management systems',
      'Retailers launching e-commerce platforms on tight budgets',
      'Consultants building custom client portals and reporting tools',
      'Agencies creating internal tools to streamline operations'
    ],
    'Enterprise & Corporate': [
      'Innovation teams rapidly prototyping new digital initiatives',
      'Internal tool development without overwhelming IT departments',
      'Department leaders building custom workflows without IT bottlenecks',
      'Digital transformation projects with reduced development costs',
      'Proof-of-concept development for executive approval processes'
    ]
  },
  'ai-powered-client-context-assistant': {
    'Startups & Entrepreneurs': [
      'Rapid client onboarding by pulling email history into chats for quick personalization during pitch meetings.',
      'Preparing investor updates with aggregated context from correspondence, avoiding manual email dives.',
      'Managing freelance client relationships with real-time query responses based on past interactions.',
      'Streamlining product feedback loops by chatting with compiled client email insights for iterative improvements.',
      'Coordinating remote team handoffs with centralized client context to maintain continuity without lost details.'
    ],
    'Small Businesses': [
      'Enhancing customer service by accessing order history and preferences from emails during support chats.',
      'Preparing sales calls with up-to-date client negotiation points pulled from email threads.',
      'Organizing vendor communications in one interface for efficient contract reviews and follow-ups.',
      'Tracking marketing campaign responses through contextual email aggregation for performance analysis.',
      'Facilitating team meetings with shared client context to ensure aligned discussions and decisions.'
    ],
    'Enterprise & Corporate': [
      'Compliance audits by querying historical client interactions without sifting through vast email archives.',
      'Executive briefings with instant summaries of key client developments from integrated email data.',
      'Cross-departmental collaboration via chat interfaces that provide unified client context for strategy alignment.',
      'Risk management through real-time alerts on client sentiment shifts detected in email patterns.',
      'Global team coordination with multilingual email context translated and centralized for international dealings.'
    ]
  },
  'automated-freight-logistics-and-invoice-management-system': {
    'Logistics & Transportation': [
      'Freight companies managing complex multi-modal shipping operations',
      'Supply chain managers tracking inventory across multiple warehouses',
      'Delivery services optimizing route planning and driver scheduling',
      'Port authorities coordinating vessel arrivals and cargo handling',
      'Third-party logistics providers managing client shipments and billing'
    ],
    'Manufacturing': [
      'Production facilities coordinating raw material deliveries with production schedules',
      'Automotive manufacturers managing just-in-time component delivery systems',
      'Food processing companies tracking temperature-sensitive ingredient shipments',
      'Electronics manufacturers coordinating global component sourcing and delivery',
      'Pharmaceutical companies managing controlled substance transportation compliance'
    ],
    'E-commerce & Retail': [
      'Online retailers managing last-mile delivery operations and customer expectations',
      'Fashion brands coordinating seasonal inventory distribution to retail locations',
      'Electronics retailers managing high-value product shipments and insurance',
      'Grocery chains coordinating fresh produce delivery and cold chain management',
      'Furniture retailers managing large item delivery scheduling and installation coordination'
    ]
  },
  'ai-powered-autonomous-scheduling-execution-agent': {
    'Healthcare': [
      'Hospitals automating patient intake and insurance verification processes',
      'Medical practices streamlining appointment scheduling and follow-up communications',
      'Clinical research organizations processing trial data and regulatory submissions',
      'Healthcare networks standardizing patient data across multiple facilities',
      'Insurance companies automating claims processing and fraud detection workflows'
    ],
    'Financial Services': [
      'Banks automating loan application processing and credit scoring workflows',
      'Investment firms processing trade settlements and regulatory reporting',
      'Insurance companies automating policy renewals and customer communications',
      'Credit unions streamlining member onboarding and account management',
      'Financial advisors automating client reporting and portfolio rebalancing'
    ],
    'Government & Public Sector': [
      'Municipal governments automating permit applications and approval workflows',
      'Social services agencies streamlining benefit application processing',
      'Tax departments automating return processing and refund distribution',
      'Public health departments processing epidemiological data and reporting',
      'Educational institutions automating student enrollment and transcript processing'
    ]
  }
};

const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = (contentData as ContentData).mainContent;
  
  // Find project from content.json data
  const project = projects.categories
    .flatMap(category => category.projects)
    .find(p => p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === id);

  const [activeIndustryTab, setActiveIndustryTab] = useState(0);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
        <a 
          href="/" 
          className="px-6 py-3 bg-black text-white font-medium transition-opacity hover:opacity-75"
        >
          Back to Home
        </a>
      </div>
    );
  }

  // Get project-specific use cases
  const projectKey = project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const useCases: Record<string, string[]> = industryUseCases[projectKey as keyof typeof industryUseCases] || {};
  const industries: string[] = Object.keys(useCases);

  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <SectionWrapper id="hero" className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
            <div className="flex flex-col items-center gap-12 text-center">
              <div className="w-full">
                <h1 className="text-3xl font-plex-mono tracking-tight sm:text-4xl md:text-5xl mb-6 leading-snug md:leading-normal text-primary-text">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                  {project.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center items-center">
                  <MainButton>
                    Book Free Call
                  </MainButton>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 bg-white text-black font-medium text-sm uppercase text-center border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
                    >
                      Preview
                    </a>
                  )}
                </div>
              </div>
              <div className="w-full max-w-4xl">
                <VideoPlaceholder title={project.title} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Powered by</p>
                <div className="flex justify-center gap-6 flex-wrap">
                  <img src="/logos/gmail.svg" alt="Gmail" className="h-6 w-auto" />
                  <img src="/logos/n8n.svg" alt="n8n" className="h-6 w-auto" />
                  <img src="/logos/nextjs.svg" alt="Next.js" className="h-6 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Problem Section */}
        <SectionWrapper id="problem" className="py-24 sm:py-32 bg-gray-50">
          <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
            <SectionTitle
              tag="Problem"
              title="The Challenge"
              subtitle=""
            />
            <div className="mt-8">
              <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mb-6">
                {/* Generate problem statement based on project type */}
                {project.title.includes('Software Development Agent') && "Building software traditionally requires large teams of 5 to 10+ people coordinating complex communication and workflows. Critical requirements frequently get lost or misunderstood as ideas pass through project managers, developers, and designers. This leads to time delays, cost overruns, and frustration due to miscommunication."}
                {project.title.includes('PocketFlow') && "Traditional client management involves scattered emails across multiple inboxes, outdated information, and time lost searching through old threads for context during meetings or onboardings."}
                {project.title.includes('FreightFlow') && "Logistics companies face complex operational challenges with manual invoice generation, scattered documentation, and inefficient load management. This results in delayed payments, lost paperwork, and reduced operational efficiency."}
                {project.title.includes('Scheduling') && "Businesses lose countless hours on repetitive manual tasks that could be automated. These processes are prone to human error, create bottlenecks, and prevent teams from focusing on high-value strategic work."}
              </p>
              {project.title.includes('Software Development Agent') && (
                <div className="space-y-4 mt-6">
                  <div className="bg-white border-l-4 border-red-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Multiple Handoffs = Lost Details</h4>
                    <p className="text-gray-600">Ideas are communicated verbally or in writing to project managers, who translate them to developers and designers. Each handoff increases the chances of crucial details being lost or misinterpreted.</p>
                  </div>
                  <div className="bg-white border-l-4 border-red-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Fear Holds Creators Back</h4>
                    <p className="text-gray-600">Many idea owners hesitate to start because they fear they lack technical skills, worry about wasting money, or fear security issues like hacks or downtime.</p>
                  </div>
                  <div className="bg-white border-l-4 border-red-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Coordination Overhead Slows Everything</h4>
                    <p className="text-gray-600">Teams rely heavily on meetings, emails, and assorted tools to sync up, slowing development and inflating costs significantly.</p>
                  </div>
                </div>
              )}
              {project.title.includes('PocketFlow') && (
                <div className="space-y-4 mt-6">
                  <div className="bg-white border-l-4 border-red-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Scattered Emails = Lost Context</h4>
                    <p className="text-gray-600">Client information is fragmented across multiple email threads and inboxes, making it difficult to maintain a complete picture of relationships and interactions.</p>
                  </div>
                  <div className="bg-white border-l-4 border-red-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Manual Searching Wastes Time</h4>
                    <p className="text-gray-600">Professionals spend valuable hours digging through old conversations to find relevant context before meetings or when responding to client inquiries.</p>
                  </div>
                  <div className="bg-white border-l-4 border-red-500 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Outdated Info Leads to Missteps</h4>
                    <p className="text-gray-600">Relying on memory or incomplete notes about past interactions can result in misunderstandings, missed opportunities, or inappropriate responses in client communications.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SectionWrapper>

        {/* Solution Section */}
        <SectionWrapper id="solution" className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
            <SectionTitle 
              tag="Solution"
              title="How It Works"
              subtitle=""
            />
            <div className="mt-8">
              <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mb-6">
                {project.description}
              </p>
              {project.title.includes('Software Development Agent') && (
                <div className="space-y-6 mt-8">
                  <div className="bg-white border-l-4 border-gray-300 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">💬</span>
                      Step 1: Share Your Idea Naturally
                    </h4>
                    <p className="text-gray-700">Start by sharing your idea with the AI agent via Telegram, Slack, or your preferred platform in a casual chat or voice message—no coding skills needed. The AI acts as your personal software expert, asking the right questions to clarify and complete your version 1 requirements.</p>
                  </div>
                  <div className="bg-white border-l-4 border-gray-300 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      Step 2: Automatic Documentation
                    </h4>
                    <p className="text-gray-700">All requirements and project details are automatically documented in your project management tool (Dart, Linear, Jira, or Notion), ensuring transparency and accuracy. No more lost requirements or forgotten details.</p>
                  </div>
                  <div className="bg-white border-l-4 border-gray-300 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      Step 3: AI Orchestrates Everything
                    </h4>
                    <p className="text-gray-700">The AI orchestrates automatic code generation with Codegen, design extraction with Figma, testing and error detection with Sentry, deployment via GitHub CI/CD + Vercel/Netlify, and user analytics with Umami/Plausible.</p>
                  </div>
                  <div className="bg-white border-l-4 border-gray-300 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🚀</span>
                      Result: Faster, Cheaper, Better
                    </h4>
                    <p className="text-gray-700">A faster, cheaper, more reliable product build—where you're the one-person show confidently leading from idea to launch, free of miscommunication headaches. Reduce development time by 70% and costs by 80%.</p>
                  </div>
                </div>
              )}
              {project.title.includes('PocketFlow') && (
                <div className="space-y-6 mt-8">
                  <div className="bg-white border-l-4 border-gray-300 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🔗</span>
                      Step 1: Connect Your Gmail Account (Seamless Integration)
                    </h4>
                    <p className="text-gray-700">Securely connect your Gmail account through a simple authorization process. The integration accesses only the necessary email data while maintaining full privacy and security standards.</p>
                  </div>
                  <div className="bg-white border-l-4 border-gray-300 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      Step 2: AI Aggregates and Organizes Client Emails (Centralized Context)
                    </h4>
                    <p className="text-gray-700">The AI automatically analyzes, categorizes, and indexes your client emails, creating a comprehensive knowledge base of interactions, preferences, and important details accessible through natural language queries.</p>
                  </div>
                  <div className="bg-white border-l-4 border-gray-300 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">💬</span>
                      Step 3: Chat with Real-Time, Up-to-Date Client Insights (Prepared Responses and Queries)
                    </h4>
                    <p className="text-gray-700">Interact with a conversational AI interface that provides instant access to client context. Ask questions like "What did we discuss with Client X last month?" or "Show me recent communications with our top accounts" and receive accurate, context-aware responses.</p>
                  </div>
                  <div className="bg-white border-l-4 border-gray-300 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📈</span>
                      Result/Key Benefits
                    </h4>
                    <p className="text-gray-700">Achieve 80% reduction in search time, always-current client knowledge, enhanced meeting preparation with instant context access, and improved client interactions through better-informed communication.</p>
                  </div>
                </div>
              )}
              {!project.title.includes('Software Development Agent') && !project.title.includes('PocketFlow') && (
                <div className="mt-8 bg-gray-100 p-6 border border-gray-300">
                  <p className="text-gray-600 italic text-center">
                    [Architecture diagram will be displayed here]
                  </p>
                </div>
              )}
            </div>
          </div>
        </SectionWrapper>

        {/* Tech Stack Section */}
        <SectionWrapper id="tech-stack" className="py-24 sm:py-32 bg-gray-50">
          <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
            <SectionTitle 
              tag="Technology"
              title="Tech Stack"
              subtitle=""
            />
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.tech.map((tech, index) => (
                  <div key={index} className="bg-white border border-gray-300 p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{tech}</h4>
                    <p className="text-gray-600 text-sm">{getTechExplanation(tech)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Duration Section */}
        <SectionWrapper id="duration" className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
            <SectionTitle 
              tag="Timeline"
              title="Project Duration"
              subtitle=""
            />
            <div className="mt-8">
              <p className="text-3xl font-bold text-gray-900">
                {/* Generate duration based on project complexity */}
                {project.title.includes('Software Development Agent') && '1-2 weeks'}
                {project.title.includes('PocketFlow') && 'Initial setup and integration in 1 week, full chat features in 2 weeks'}
                {project.title.includes('FreightFlow') && '4-6 months'}
                {project.title.includes('Scheduling') && '2-3 months'}
              </p>
              <p className="text-gray-600 mt-2">
                {project.title.includes('Software Development Agent')
                  ? 'From idea to deployed MVP with the AI-powered workflow'
                  : 'From initial consultation to full deployment and team training'}
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* Use Cases Section with Industry Tabs */}
        {industries.length > 0 && (
          <SectionWrapper id="use-cases" className="py-24 sm:py-32 bg-gray-50">
            <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
              <SectionTitle 
                tag="Applications"
                title="Industry Use Cases"
                subtitle="See how this solution transforms operations across different industries"
              />
              <div className="mt-12">
                {/* Industry Tabs */}
                <div className="flex flex-col sm:flex-wrap sm:flex-row gap-2 mb-8">
                  {industries.map((industry, index) => (
                    <button
                      key={industry}
                      onClick={() => setActiveIndustryTab(index)}
                      className={`w-full sm:w-auto px-6 py-3 font-medium text-center transition-colors ${
                        activeIndustryTab === index
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
                
                {/* Use Cases List */}
                <div className="bg-white border border-gray-200 p-8">
                  <h3 className="text-2xl font-semibold mb-6">
                    {industries[activeIndustryTab]} Applications
                  </h3>
                  <div className="space-y-4">
                    {useCases[industries[activeIndustryTab]]?.map((useCase: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="text-green-600 mr-3 mt-1">✓</span>
                        <p className="text-gray-700">{useCase}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionWrapper>
        )}

        {/* CTA Section */}
        <Cta />
        <Booker />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectPage;
