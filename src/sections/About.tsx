import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Image animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(imageRef.current, {
              x: -100 * (1 - progress),
              rotateY: 25 * (1 - progress),
              opacity: progress,
            });
          },
        })
      );

      // Content animations
      gsap.set([labelRef.current, titleRef.current, textRef.current], {
        opacity: 0,
        y: 50,
      });

      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: contentRef.current,
          start: 'top 75%',
          onEnter: () => {
            gsap.to(labelRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            });
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.1,
              ease: 'power3.out',
            });
            gsap.to(textRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3,
              ease: 'power2.out',
            });
          },
          once: true,
        })
      );

      // Parallax effect on scroll
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(imageRef.current, {
              y: 50 - 100 * progress,
            });
          },
        })
      );

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative perspective-1200"
          >
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/profile-about.jpg"
                alt="Norazly Basarian"
                className="w-full h-[500px] md:h-[600px] object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {/* Decorative shadow */}
            <div className="absolute -inset-4 bg-apple-blue/10 blur-3xl -z-10 rounded-full scale-90" />
            {/* Border accent */}
            <div className="absolute -inset-[1px] rounded-3xl border border-white/10 pointer-events-none" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="lg:pl-8">
            <span
              ref={labelRef}
              className="section-label mb-4 block"
            >
              About Me
            </span>
            <h2
              ref={titleRef}
              className="section-title text-white mb-8"
            >
              Your Guide to{' '}
              <span className="text-gradient">Educational Success</span>
            </h2>
            <div ref={textRef} className="space-y-6">
              <p className="text-lg text-white/80 leading-relaxed">
                Hi there! I'm an Education Counsellor at one of the top universities in 
                Kota Kinabalu, Petaling Jaya, Cyberjaya and Johor Bahru. I'm here to help 
                you navigate the admissions process, offering personalised advice, and 
                guiding you to the perfect program that aligns with your interests and 
                career aspirations.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Whether you're a fresh graduate or looking to further your studies, I'm 
                dedicated to making your journey to higher education smooth and successful.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-white mb-1">10+</div>
                <div className="text-sm text-apple-gray">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-white mb-1">1000+</div>
                <div className="text-sm text-apple-gray">Students Helped</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-semibold text-white mb-1">4</div>
                <div className="text-sm text-apple-gray">Campus Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
