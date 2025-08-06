import React from 'react';

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ href, children, className = '', variant = 'primary', ...rest }) => {
  const baseClasses = 'px-7 py-5 text-base font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors uppercase';

  const styles = {
    primary: 'bg-black text-white hover:bg-gray-800 focus-visible:outline-gray-900',
    secondary: 'bg-white text-primary-text border border-gray-300 hover:bg-black hover:text-white focus-visible:outline-gray-900',
  };

    const finalClasses = `${baseClasses} ${styles[variant]} ${className} max-sm:w-full text-center`;

  return (
    <a href={href} className={finalClasses} {...rest}>
      {children}
    </a>
  );
};

export default Button;
