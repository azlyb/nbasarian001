import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, FileText, Monitor, DollarSign, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const specialties = [
  {
    icon: GraduationCap,
    title: 'Academic Pathway Planning',
    description: 'Guiding students from foundation, certificate, diploma to degree with clear progression routes.',
  },
  {
    icon: BookOpen,
    title: 'Course & Career Matching',
    description: 'Helping students choose programmes based on interest, strength, and long term career goals.',
  },
  {
    icon: FileText,
    title: 'Higher Education Advisory',
    description: 'Providing accurate information about Malaysian university systems, MQA recognition, and programme accreditation.',
  },
  {
    icon: Monitor,
    title: 'Career Prospect Advisory',
    description: 'Explaining job market demand and employability outcomes after graduation.',
  },
  {
    icon: DollarSign,
    title: 'Scholarship & Financial Aid Guidance',
    description: 'Advising on tuition rebates, zakat assistance, PTPTN, and education funding options.',
  },
  {
    icon: Users,
    title: 'Parent Consultation Services',
    description: 'Providing counselling sessions for parents who want clarity before making education decisions.',
  },
];

export default function Specialties() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Title animation
      gsap.set(titleRef.current, { opacity: 0, y: 30 });
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
            });
          },
          once: true,
        })
      );

      // Cards animation with stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.set(card, { opacity: 0, rotateX: -30, y: 50 });
        
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(card, {
                opacity: 1,
                rotateX: 0,
                y: 0,
                duration: 0.7,
                delay: index * 0.1,
                ease: 'back.out(1.2)',
              });
            },
            once: true,
          })
        );
      });

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="specialties"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-apple-dark/30 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="section-label mb-4 block">Services</span>
          <h2 className="section-title text-white mb-4">
            My Specialties
          </h2>
          <p className="text-lg text-apple-gray max-w-2xl mx-auto">
            Comprehensive support for your educational journey
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1200">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative preserve-3d"
              >
                <div className="relative h-full p-8 rounded-3xl glass-card transition-all duration-500 hover:-translate-y-3 hover:shadow-card-hover">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-apple-blue/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-apple-blue/20">
                    <Icon className="w-7 h-7 text-apple-blue" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {specialty.title}
                  </h3>
                  <p className="text-apple-gray leading-relaxed">
                    {specialty.description}
                  </p>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl bg-apple-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
