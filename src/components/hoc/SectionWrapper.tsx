import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = (Component: React.ComponentType, idName: string) => 
  function HOC() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (sectionRef.current) {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // Animation starts when the top of the section is 80% from the top of the viewport
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        });

        timeline.fromTo(
          sectionRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );

        return () => {
          timeline.kill();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    }, []);

    return (
      <section ref={sectionRef} id={idName} className="relative z-0 opacity-0">
        <span className='hash-span' id={idName}>&nbsp;</span>
        <Component />
      </section>
    );
  };

export default SectionWrapper;
