import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What programs are offered?',
    answer: "We've got a fantastic selection of diploma, degree, and postgraduate programs, covering everything from business and IT to education and science!",
  },
  {
    question: 'How do I apply for admission?',
    answer: 'You can easily fill out the registration form, or if you\'d prefer, feel free to reach out to me directly for a step-by-step guide!',
  },
  {
    question: 'Are there scholarships available?',
    answer: "Absolutely! We've got a bunch of scholarships and financial aid options available, all tailored to help students based on their academic achievements and financial situations (just a heads-up, the Terms & Conditions apply).",
  },
  {
    question: 'Can I visit the campus before applying?',
    answer: "Awesome! I'd be happy to set up a guided tour of the campus for you. Just give me a shout on the phone or email when you have a moment.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
              duration: 0.6,
              ease: 'power3.out',
            });
          },
          once: true,
        })
      );

      // FAQ items animation
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.set(item, { opacity: 0, x: -50 });
        
        scrollTriggers.push(
          ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(item, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: 'power3.out',
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-apple-dark/20 to-black pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="section-label mb-4 block">FAQ</span>
          <h2 className="section-title text-white">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? 'bg-white/5 border-l-2 border-apple-blue'
                  : 'bg-white/[0.02] border-l-2 border-transparent hover:bg-white/5'
              }`}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-medium text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-apple-gray flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-apple-gray leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
