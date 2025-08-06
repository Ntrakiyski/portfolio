import React from "react";

// A reusable main CTA button that always opens the Cal.com modal
interface MainButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  children: React.ReactNode;
}

const MainButton: React.FC<MainButtonProps> = ({ className = "", children, ...rest }) => {
  const baseClasses =
    "inline-block text-white bg-black hover:bg-gray-800 text-sm py-3 px-5 uppercase border border-transparent w-[160px] text-center";
  return (
    <a
      href="/book-a-call"
      data-cal-namespace="free-call"
      data-cal-link="trakiyski/free-call"
      data-cal-config='{"layout":"month_view"}'
      className={`${baseClasses} ${className}`.trim()}
      onClick={(e) => {
        // Prevent navigation; Cal.com data attributes handle opening the modal
        e.preventDefault();
      }}
      {...rest}
    >
      {children}
    </a>
  );
};

export default MainButton;
