import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const laws = [
  {
    number: 'I',
    title: 'Ground is Privilege',
    description:
      'The powerful occupy the lowest, easiest, most accessible spaces. Proximity to the earth is proximity to power.',
    color: 'text-amber',
    borderColor: 'border-amber/30',
  },
  {
    number: 'II',
    title: 'Height is Punishment',
    description:
      'The less important you are, the more stairs you climb and the more energy your life consumes.',
    color: 'text-rust',
    borderColor: 'border-rust/30',
  },
  {
    number: 'III',
    title: 'Distance is Inequality',
    description:
      'Because cities spread outward, the poor pay more in time, fatigue, risk, and exclusion.',
    color: 'text-red-400',
    borderColor: 'border-red-400/30',
  },
];

export default function ThreeLaws() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const lawRefs = useRef([]);
  const closingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 75%' },
        }
      );

      // Each law — dramatic staggered reveal
      lawRefs.current.forEach((law, i) => {
        if (!law) return;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: law, start: 'top 78%' },
        });

        tl.fromTo(
          law.querySelector('.law-number'),
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
        )
          .fromTo(
            law.querySelector('.law-title'),
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          )
          .fromTo(
            law.querySelector('.law-desc'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          );
      });

      // Closing statement
      gsap.fromTo(
        closingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: closingRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6">
      {/* Atmospheric glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10"
        style={{ background: 'radial-gradient(circle, #C45A3C, transparent)' }}
      />

      {/* Header */}
      <div ref={headerRef} className="text-center mb-20 md:mb-32 relative z-10">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-rust/50 mb-4">
          The Core Thesis
        </p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream/95 tracking-tight">
          The Three Laws
        </h2>
        <p className="font-body text-lg text-cream/40 mt-4">
          of a world without lifts
        </p>
      </div>

      {/* The Three Laws */}
      <div className="max-w-4xl mx-auto space-y-12 md:space-y-16 relative z-10">
        {laws.map((law, i) => (
          <div
            key={i}
            ref={(el) => (lawRefs.current[i] = el)}
            className={`flex items-start gap-6 md:gap-10 p-8 md:p-12 border ${law.borderColor} bg-cream/[0.01]`}
          >
            <div className="flex-shrink-0">
              <span className={`law-number font-display text-5xl md:text-7xl font-bold ${law.color} opacity-80`}>
                {law.number}
              </span>
            </div>
            <div>
              <h3 className={`law-title font-display text-3xl md:text-4xl lg:text-5xl font-bold ${law.color} tracking-tight`}>
                {law.title}
              </h3>
              <p className="law-desc font-body text-base md:text-lg text-cream/50 leading-relaxed mt-4">
                {law.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Closing synthesis */}
      <div ref={closingRef} className="max-w-3xl mx-auto text-center mt-20 md:mt-32 relative z-10">
        <p className="font-display text-xl md:text-3xl text-cream/70 leading-relaxed font-medium italic">
          The genius of this world is that its inequality would feel{' '}
          <span className="text-cream/90 not-italic font-bold">normal.</span>
        </p>
        <p className="font-body text-base md:text-lg text-cream/40 leading-relaxed mt-6">
          People would stop seeing it as oppression and start seeing it as common sense.
          Of course the CEO should not waste time climbing. Of course premium shops should be downstairs.
          Of course junior employees can handle more stairs.
        </p>
        <p className="font-display text-lg md:text-2xl text-rust/80 italic mt-8">
          The absence of the lift would not merely preserve inconvenience.
          <br />
          It would manufacture a whole ideology of deserved access.
        </p>
      </div>
    </section>
  );
}
