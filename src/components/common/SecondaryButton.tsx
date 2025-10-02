import React from "react";

interface SecondaryButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  routeOrSection: string; // accepts "#section" or "/route"
  text: string;
  className?: string;
  disableUnderline?: boolean;
  newTab?: boolean;
}

/**
 * SecondaryButton - similar styling to MainButton, but navigates to a hash section or route.
 * Props:
 *  - text: label to display
 *  - routeOrSection: "#section" for in-page smooth scroll or "/route" for navigation
 */
const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  routeOrSection,
  text = "Learn more",
  className = "",
  onClick,
  disableUnderline = false,
  newTab = false,
  ...rest
}) => {
  const baseClasses =
    "group relative w-full sm:w-[160px] inline-block text-black text-sm py-3 px-5 uppercase text-center overflow-visible";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an in-page hash, smooth scroll and prevent default navigation
    if (routeOrSection.startsWith("#")) {
      const el = document.querySelector(routeOrSection);
      if (el) {
        e.preventDefault();
        (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (onClick) onClick(e);
  };

  return (
    <a
      href={routeOrSection}
      className={`${baseClasses} ${className}`.trim()}
      onClick={handleClick}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span className="mt-[5px] relative z-10 flex items-center justify-center gap-x-1">
        {text} <span aria-hidden="true">→</span>
      </span>
      {!disableUnderline && (
        <div
          aria-hidden="true"
          className="relative mt-[5px] flex justify-center"
        >
          <span className="block h-[2px] w-0 bg-black transition-[width] duration-300 ease-out group-hover:w-full" />
        </div>
      )}
    </a>
  );
};

export default SecondaryButton;
