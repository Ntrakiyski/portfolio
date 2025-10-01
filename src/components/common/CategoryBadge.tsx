import React from 'react';
import { ProjectCategoryType } from '../../types/content';

interface CategoryBadgeProps {
  category: ProjectCategoryType;
  className?: string;
}

const categoryStyles: Record<ProjectCategoryType, string> = {
  'AI Agent': 'bg-purple-100 text-purple-700 border-purple-200',
  'Web App': 'bg-green-100 text-green-700 border-green-200',
  'Automation': 'bg-orange-100 text-orange-700 border-orange-200',
  'Website': 'bg-pink-100 text-pink-700 border-pink-200',
  'Custom Tools': 'bg-teal-100 text-teal-700 border-teal-200',
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const styles = categoryStyles[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium border ${styles} ${className}`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;

