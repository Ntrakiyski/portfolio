// src/constants/navItems.ts

import { NavItem } from '../types';
import cvContent from '../src/data/cv-content.json';

const experienceSubItems: NavItem[] = cvContent.mainContent.experience.jobs.map((job, index) => ({
  name: job.title,
  href: `#job-${index}`,
  shortcut: (index + 2).toString(),
}));

export const navItems: NavItem[] = [
  { name: 'About', href: '#about', shortcut: '1' },
  {
    name: 'Experience',
    href: '#experience',
    shortcut: '2', // This is a placeholder, the real shortcuts are in the sub-items
    subItems: experienceSubItems,
  },
];