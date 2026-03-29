import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, User, ChevronDown } from 'lucide-react';
import { SiTiktok, SiFacebook } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set([imageRef.current, labelRef.current, titleRef.current, subtitleRef.current, taglineRef.current, buttonsRef.current, socialsRef.current], {
        opacity: 0,
      });
      gsap.set(imageRef.current, { scale: 0.5, rotateY: 90 });
      gsap.set(labelRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(titleRef.current, { y: 60, rotateX: -40 });
      gsap.set(subtitleRef.current, { filter: 'blur(10px)' });
      gsap.set(taglineRef.current, { y: 30 });
      gsap.set(buttonsRef.current, { scale: 0 });
      gsap.set(socialsRef.current, { rotate: -15 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: 'back.out(1.2)',
      })
      .to(labelRef.current, {
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.6,
        ease: 'expo.out',
      }, '-=0.4')
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.3')
      .to(subtitleRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.4')
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')
      .to(buttonsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.5)',
      }, '-=0.2')
      .to(socialsRef.current, {
        opacity: 1,
        rotate: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');

      // Scroll-triggered fade out
      const scrollTriggers: ScrollTrigger[] = [];
      
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=30%',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(imageRef.current, {
              y: -80 * progress,
              scale: 1 - 0.1 * progress,
            });
            gsap.set([labelRef.current, titleRef.current, subtitleRef.current, taglineRef.current, buttonsRef.current, socialsRef.current], {
              opacity: 1 - progress,
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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated background orbs */}
      <div ref={orbsRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-32 h-32 rounded-full bg-apple-blue/10 blur-[40px] animate-float-slow" />
        <div className="absolute top-[20%] right-[15%] w-24 h-24 rounded-full bg-apple-blue/15 blur-[30px] animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[20%] left-[20%] w-20 h-20 rounded-full bg-apple-blue/10 blur-[25px] animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[15%] right-[10%] w-28 h-28 rounded-full bg-apple-blue/10 blur-[35px] animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-apple-dark/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 perspective-1200">
        {/* Profile Image */}
        <div
          ref={imageRef}
          className="relative mb-8 preserve-3d"
        >
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 animate-pulse-glow">
            <img
              src="/profile-hero.jpg"
              alt="Norazly Basarian"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-apple-blue/20 blur-xl -z-10 scale-110" />
        </div>

        {/* Label */}
        <div ref={labelRef} className="mb-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.15em] text-apple-blue bg-apple-blue/10 border border-apple-blue/20">
            Education Counsellor
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-4 tracking-tight preserve-3d"
          style={{ letterSpacing: '-0.03em' }}
        >
          Norazly Basarian
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-3"
        >
          Let's Talk About Education!
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-base md:text-lg text-apple-gray mb-10 max-w-md"
        >
          Helping Students Achieve Their Dreams
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 mb-8">
          <button onClick={scrollToContact} className="btn-primary flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            Get in Touch
          </button>
          <button onClick={scrollToAbout} className="btn-secondary flex items-center justify-center gap-2">
            <User className="w-4 h-4" />
            About Me
          </button>
        </div>

        {/* Social Links */}
        <div ref={socialsRef} className="flex gap-4">
          <a
            href="https://www.tiktok.com/@city.academy.sabah"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black border border-white/20 text-white text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:scale-105"
          >
            <SiTiktok className="w-4 h-4" />
            TikTok
          </a>
          <a
            href="https://www.facebook.com/share/18J3ii83D4/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1877F2] text-white text-sm font-medium transition-all duration-300 hover:bg-[#1864d4] hover:scale-105"
          >
            <SiFacebook className="w-4 h-4" />
            Facebook
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/40" />
      </div>
    </section>
  );
}
