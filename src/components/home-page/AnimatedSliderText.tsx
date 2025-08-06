"use client";

import React, { useRef } from "react";
import { motion, MotionStyle, useScroll, useTransform } from "framer-motion";

type Props = {
  heading: string;
};

export type AnimatedSliderTextProps = React.ComponentPropsWithoutRef<"div"> & Props;

export const AnimatedSliderText: React.FC<AnimatedSliderTextProps> = ({ heading, ...props }) => {


  const headingRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start center", "end center"],
  });

  const words = heading.split(" ");

  const getHighlightedWords = () => {
    const lowerTitle = heading.toLowerCase();
    const highlightedWords = new Set<string>();

    const keywords = ["dual-minded", "translation-gap"];

    keywords.forEach(keyword => {
      if (lowerTitle.includes(keyword)) {
        const matchingWord = words.find(part => part.toLowerCase().includes(keyword));
        if (matchingWord) {
          highlightedWords.add(matchingWord);
        }
      }
    });

    return highlightedWords;
  };

  const highlightedWords = getHighlightedWords();

  return (
    <div {...props}>
      <h2 ref={headingRef} className="font-plex-mono text-2xl md:text-4xl text-primary-text leading-snug md:leading-normal">
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + 1 / words.length;
          const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
          const isHighlighted = highlightedWords.has(word);

          return (
            <React.Fragment key={index}>
              <motion.span className="inline-block" style={{ opacity } as MotionStyle}>
                {isHighlighted ? (
                  <span style={{ background: 'rgb(10, 10, 10)', color: 'white', padding: '0 0.5rem' }}>
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
              {index < words.length - 1 && " "}
            </React.Fragment>
          );
        })}
      </h2>
    </div>
  );
};

export const AnimatedSliderTextDefaults: Props = {
  heading:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
};
