import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: User,
    label: 'Name',
    value: 'Counsellor Azly',
    href: null,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+6011-6747 0503',
    href: 'tel:+601167470503',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'norazly.basarian@icloud.com',
    href: 'mailto:norazly.basarian@icloud.com',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Card animation
      gsap.set(cardRef.current, { opacity: 0, scale: 0.9, y: 50 });
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(cardRef.current, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
            });
          },
          once: true,
        })
      );

      // Contact items animation
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.set(item, { opacity: 0, x: -40 });
        
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(item, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                ease: 'power3.out',
              });
            },
            once: true,
          })
        );
      });

      // Button animation
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: buttonRef.current,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(buttonRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.6,
              ease: 'back.out(1.5)',
            });
          },
          once: true,
        })
      );

      // Parallax float effect
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardRef.current, {
              y: 30 - 60 * progress,
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
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-apple-blue/5 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-apple-blue/5 blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label mb-4 block">Get in Touch</span>
          <h2 className="section-title text-white">
            Contact Information
          </h2>
        </div>

        {/* Glass Card */}
        <div
          ref={cardRef}
          className="relative p-8 md:p-12 rounded-[2rem] glass-card shadow-card animate-float-slow"
        >
          {/* Contact Items */}
          <div className="space-y-6 mb-8">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              const content = (
                <div
                  ref={(el) => { itemsRef.current[index] = el; }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-apple-blue/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-apple-blue/20">
                    <Icon className="w-5 h-5 text-apple-blue" />
                  </div>
                  <div>
                    <div className="text-xs text-apple-gray uppercase tracking-wider mb-1">
                      {item.label}
                    </div>
                    <div className="text-white font-medium">
                      {item.value}
                    </div>
                  </div>
                </div>
              );

              return item.href ? (
                <a key={index} href={item.href} className="block">
                  {content}
                </a>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>

          {/* WhatsApp Button */}
          <a
            ref={buttonRef}
            href="https://wa.me/601167470503"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-[#25D366] text-white font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            style={{
              boxShadow: '0 0 20px rgba(37, 211, 102, 0.3)',
            }}
          >
            <FaWhatsapp className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12" />
            WhatsApp Me Now!
          </a>

          {/* Decorative elements */}
          <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
