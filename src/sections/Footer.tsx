import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Divider animation
      gsap.set(dividerRef.current, { scaleX: 0 });
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(dividerRef.current, {
              scaleX: 1,
              duration: 0.8,
              ease: 'power3.out',
            });
          },
          once: true,
        })
      );

      // Content animation
      gsap.set(contentRef.current, { opacity: 0, y: 20 });
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 95%',
          onEnter: () => {
            gsap.to(contentRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.3,
              ease: 'power2.out',
            });
          },
          once: true,
        })
      );

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-12 bg-black"
    >
      {/* Divider with shimmer effect */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px origin-center"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <p className="text-sm text-apple-gray mb-2">
          © 2026 Counsellor Azly, IPT - Recognized by Malaysians Qualifications Agency
        </p>
        <p className="text-sm text-apple-gray/60 mb-2">
          All rights reserved.
        </p>
        <p className="text-xs text-apple-gray/40">
          Last updated: February 2026
        </p>
      </div>
    </footer>
  );
}
