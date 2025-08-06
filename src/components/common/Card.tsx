import React from "react";

type CardProps = {
  image?: string;
  title: string;
  description: string;
  // Optional action for the bottom-right button
  cta?: {
    text?: string;
    routeOrSection: string;
    className?: string;
  };
  className?: string;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  cta,
  className = "",
}) => {
  return (
    <div className={`relative group flex flex-col text-left h-full ${className}`}>
      {/* Card surface */}
      <div className="relative bg-white border border-gray-200 overflow-hidden p-6 h-full transform transition-all duration-300 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:shadow-lg/40">
        {image ? (
          <img src={image} alt={title} className="w-full h-auto" />
        ) : null}

        <h3 className="text-lg text-primary-text mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>

        {/* Stamp + Button (revealed on hover) */}
        {cta ? (
          <div className="pointer-events-none absolute bottom-0 right-0 transition-all duration-300 ease-out opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
            {/* White stamp behind button - snug to borders */}
            {/*
            <div className="absolute bottom-0 right-0">
              <div className="relative w-40 h-[60px]">
                <div className="absolute bottom-0 right-0 w-full h-full bg-black rounded-tl-[40px] shadow-[0_6px_16px_rgba(0,0,0,0.08)] ring-1 ring-black/5" />
              </div>
            </div>
            */}

            {/* Button on top of stamp */}
            {/* <div className="relative pointer-events-auto pr-2 pb-2">
              <SecondaryButton
                routeOrSection={cta.routeOrSection}
                text={cta.text ?? "Learn more"}
                className={`!py-2.5 !px-3.5 text-sm text-white ${cta.className ?? ""}`}
                disableUnderline
              />
            </div> */}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
