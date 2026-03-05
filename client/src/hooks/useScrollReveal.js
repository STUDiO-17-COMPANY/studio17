import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollReveal(containerRef) {
  useEffect(() => {
    if (!containerRef?.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set('.hero-reveal, .scroll-reveal', { visibility: 'visible', opacity: 1, y: 0 });
      } else {
        gsap.set('.hero-reveal', { visibility: 'visible', opacity: 0, y: 30 });
        gsap.set('.scroll-reveal', { visibility: 'visible', opacity: 0, y: 40 });

        gsap.to('.hero-reveal', {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15,
        });

        ScrollTrigger.batch('.scroll-reveal', {
          onEnter: (elements) => {
            gsap.to(elements, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              overwrite: true,
            });
          },
          start: 'top 90%',
          once: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
