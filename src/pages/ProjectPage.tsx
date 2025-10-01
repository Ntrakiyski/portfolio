import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SectionWrapper } from '../components/common';
import SectionTitle from '../components/home-page/SectionTitle';
import MainButton from '../components/common/MainButton';
import Cta from '../components/home-page/Cta';
import Footer from '../components/home-page/Footer';
import contentData from '../data/content.json';
import { ContentData } from '../types/content';

// Video placeholder component
const VideoPlaceholder = ({ title }: { title: string }) => (
  <div className="bg-gray-200 border-2 border-dashed w-full h-64 md:h-96 flex items-center justify-center">
    <div className="text-center p-4">
      <div className="text-6xl mb-4">▶️</div>
      <span className="text-gray-600 font-medium">Demo Video</span>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  </div>
);

// Helper function to get tech explanations
const getTechExplanation = (tech: string): string => {
  const explanations: { [key: string]: string } = {
    'Telegram': 'Instant messaging platform for casual communication and bot integration.',
    'Slack': 'Team collaboration platform perfect for business communication and workflow automation.',
    'Codegen': 'AI-powered code generation platform that automatically writes production-ready code.',
    'Figma': 'Design tool for creating and extracting UI specifications and design assets.',
    'Dart': 'Modern project management tool for agile teams and workflow tracking.',
    'Linear': 'Issue tracking system designed for high-performance software teams.',
    'Jira': 'Comprehensive project management platform for enterprise software development.',
    'Notion': 'All-in-one workspace for notes, docs, and project management.',
    'Sentry': 'Error tracking and performance monitoring platform with AI-powered root cause analysis.',
    'GitHub': 'Version control platform with integrated CI/CD pipelines for automated deployment.',
    'Vercel': 'Frontend deployment platform optimized for Next.js and modern web frameworks.',
    'Netlify': 'Web hosting platform with automated builds and serverless functions.',
    'Umami': 'Privacy-focused web analytics platform for tracking user behavior.',
    'Plausible': 'Simple, privacy-friendly analytics alternative to Google Analytics.',
    'Gmail': 'Email platform for enterprise communication and automated notifications.',
    'Outlook': 'Microsoft email service for professional correspondence and scheduling.',
    'n8n': 'Self-hosted workflow automation platform for connecting multiple services.',
    'FastAPI': 'High-performance Python web framework for building APIs with automatic documentation.',
    'Celery': 'Distributed task queue for handling background jobs and asynchronous processing.',
    'Qdrant': 'Vector database optimized for similarity search and AI applications.',
    'Next.js': 'React framework providing server-side rendering and optimized performance.',
    'Supabase': 'Open-source Firebase alternative with real-time database and authentication.',
    'React': 'JavaScript library for building interactive user interfaces with components.',
    'MongoDB': 'NoSQL document database for flexible, scalable data storage.',
    'TailwindCSS': 'Utility-first CSS framework for rapid UI development.',
    'React 19': 'Latest version of React with improved performance and new features.',
    'Web Design': 'User interface and experience design for creating engaging websites.',
    'Forms': 'Interactive elements for collecting and processing user input.',
    'Static Site Generation': 'Pre-building web pages for faster loading and better SEO.',
    'Custom APIs': 'Tailor-made application programming interfaces for specific business needs.',
    'Process Mapping': 'Analyzing and documenting business workflows for optimization.',
    'Workflow Automation': 'Streamlining repetitive tasks through automated processes.',
    'Data Visualization': 'Creating visual representations of data for better insights.',
    'OCR': 'Optical Character Recognition for extracting text from images and documents.',
    'N8N': 'Workflow automation tool for connecting different services and APIs.'
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
  'pocketflow-rag-chat-platform': {
    'Healthcare': [
      'Medical professionals accessing patient history and treatment protocols instantly',
      'Hospital administrators searching through policy documents and compliance requirements',
      'Research teams querying vast medical literature databases for relevant studies',
      'Pharmaceutical companies analyzing drug interaction data and clinical trial results',
      'Healthcare consultants extracting insights from industry reports and regulations'
    ],
    'Legal Services': [
      'Law firms searching through case law and legal precedents efficiently',
      'Corporate legal teams accessing contract templates and compliance documentation',
      'Legal researchers analyzing regulatory changes and their business impact',
      'Patent attorneys searching through technical documentation and prior art',
      'Compliance officers querying policy documents for audit requirements'
    ],
    'Financial Services': [
      'Investment analysts researching market reports and financial statements',
      'Risk management teams accessing regulatory guidelines and compliance procedures',
      'Financial advisors querying product documentation for client recommendations',
      'Audit teams searching through transaction records and financial policies',
      'Insurance companies analyzing claims data and policy documentation'
    ]
  },
  'freightflow-logistics-management-system': {
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
  'automated-data-processing-for-fast-track': {
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
  const useCases = industryUseCases[projectKey as keyof typeof industryUseCases] || {};
  const industries = Object.keys(useCases);

  return (
    <div className="flex flex-col min-h-screen items-center">
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <SectionWrapper id="hero" className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 text-left">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {project.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium transition-opacity hover:opacity-75"
                    >
                      Preview Demo
                    </a>
                  )}
                  <MainButton>
                    Book Free Call
                  </MainButton>
                </div>
              </div>
              <div className="lg:w-1/2">
                <VideoPlaceholder title={project.title} />
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Problem Section */}
        <SectionWrapper id="problem" className="py-24 sm:py-32 bg-gray-50">
          <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
            <SectionTitle 
              tag="Problem"
              title="The Challenge"
              subtitle=""
            />
            <div className="mt-8">
              <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mb-6">
                {/* Generate problem statement based on project type */}
                {project.title.includes('AI-Powered') && "Building software traditionally requires large teams of 5 to 10+ people coordinating complex communication and workflows. Critical requirements frequently get lost or misunderstood as ideas pass through project managers, developers, and designers. This leads to time delays, cost overruns, and frustration due to miscommunication."}
                {project.title.includes('RAG') && "Organizations struggle with information silos where critical knowledge is scattered across documents, websites, and databases. Teams waste hours searching for answers that should be instantly accessible, leading to delayed decisions and repeated work."}
                {project.title.includes('FreightFlow') && "Logistics companies face complex operational challenges with manual invoice generation, scattered documentation, and inefficient load management. This results in delayed payments, lost paperwork, and reduced operational efficiency."}
                {project.title.includes('Automated') && "Businesses lose countless hours on repetitive manual tasks that could be automated. These processes are prone to human error, create bottlenecks, and prevent teams from focusing on high-value strategic work."}
              </p>
              {project.title.includes('AI-Powered') && (
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
              {project.title.includes('AI-Powered') && (
                <div className="space-y-6 mt-8">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">💬</span>
                      Step 1: Share Your Idea Naturally
                    </h4>
                    <p className="text-gray-700">Start by sharing your idea with the AI agent via Telegram, Slack, or your preferred platform in a casual chat or voice message—no coding skills needed. The AI acts as your personal software expert, asking the right questions to clarify and complete your version 1 requirements.</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      Step 2: Automatic Documentation
                    </h4>
                    <p className="text-gray-700">All requirements and project details are automatically documented in your project management tool (Dart, Linear, Jira, or Notion), ensuring transparency and accuracy. No more lost requirements or forgotten details.</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🤖</span>
                      Step 3: AI Orchestrates Everything
                    </h4>
                    <p className="text-gray-700">The AI orchestrates automatic code generation with Codegen, design extraction with Figma, testing and error detection with Sentry, deployment via GitHub CI/CD + Vercel/Netlify, and user analytics with Umami/Plausible.</p>
                  </div>
                  <div className="bg-gradient-to-r from-pink-50 to-green-50 border-l-4 border-pink-500 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🚀</span>
                      Result: Faster, Cheaper, Better
                    </h4>
                    <p className="text-gray-700">A faster, cheaper, more reliable product build—where you're the one-person show confidently leading from idea to launch, free of miscommunication headaches. Reduce development time by 70% and costs by 80%.</p>
                  </div>
                </div>
              )}
              {!project.title.includes('AI-Powered') && (
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
                {project.title.includes('AI-Powered') && '1-2 weeks'}
                {project.title.includes('RAG') && '3-4 months'}
                {project.title.includes('FreightFlow') && '4-6 months'}
                {project.title.includes('Automated') && '2-3 months'}
              </p>
              <p className="text-gray-600 mt-2">
                {project.title.includes('AI-Powered') 
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
                <div className="flex flex-wrap gap-2 mb-8">
                  {industries.map((industry, index) => (
                    <button
                      key={industry}
                      onClick={() => setActiveIndustryTab(index)}
                      className={`px-6 py-3 font-medium transition-colors ${
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
                    {useCases[industries[activeIndustryTab] as keyof typeof useCases]?.map((useCase, index) => (
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
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectPage;
