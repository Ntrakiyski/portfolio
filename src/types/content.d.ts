export interface ContactBadge {
  icon: string;
  text: string;
  href?: string;
  type: string;
}

export interface Intro {
  name: string;
  tagline: string;
  contactBadges: ContactBadge[];
}

export interface Bio {
  title: string;
  paragraph: string;
}

export interface SkillItem {
  list: string[];
}

export interface Job {
  title: string;
  company: string;
  dates: string;
  challenge: string;
  points: string[];
  summarizedPoints: string[];
  skills: SkillItem;
  tools: SkillItem;
  projects: SkillItem;
}

export interface Experience {
  title: string;
  jobs: Job[];
}

export interface CoreSkill {
  title: string;
  description: string;
}

export interface Skills {
  title: string;
  list: CoreSkill[];
}

export interface WhyMe {
  title: string;
  paragraphs: string[];
}

export interface LiveDemoItem {
  icon: string;
  title: string;
  description: string;
  githubLink?: string | null;
  liveLink?: string | null;
  status?: string;
}

export interface LiveDemosContent {
  tag: string;
  headline: string;
  description: string;
  demos_list: LiveDemoItem[];
}

export interface ContactSectionContent {
  tag: string;
  headline: string;
  description: string;
  emailLinkText: string;
  emailLinkHref: string;
}

export interface AboutMeContent {
  tag: string;
  headline: string;
  paragraph1: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  image: string;
}

export interface FeaturesContent {
  tag: string;
  headline: string;
  features_list: FeatureItem[];
}

export interface HeroContent {
  tagline: string;
  headline: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
}

export interface ExperienceItem {
  title: string;
  description: string;
  image: string;
}

export interface ExperienceContent {
  tag: string;
  headline: string;
  experience_list: ExperienceItem[];
}

export interface ProjectCategory {
  name: string;
  detailedDescription?: string;
  servicesInclude?: string[];
  deliverables?: string[];
  projects: ProjectItem[];
}

export interface ProjectsContent {
  tag: string;
  headline: string;
  description: string;
  categories: ProjectCategory[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  tag: string;
  headline: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  steps: ProcessStep[];
}

export interface MainContent {
  hero: HeroContent;
  aboutMe: AboutMeContent;
  features: FeaturesContent;
  projects: ProjectsContent;
  experience: ExperienceContent;
  process: ProcessContent;
  contactSection: ContactSectionContent;
}

export interface ContentData {
  mainContent: MainContent;
}
