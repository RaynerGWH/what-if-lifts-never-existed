import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const impacts = [
  {
    number: '18M',
    label: 'Elevators worldwide',
    detail: 'Moving more people daily than cars, trains, buses, and planes combined.',
  },
  {
    number: '7B',
    label: 'Trips per day',
    detail: 'The elevator is the most frequently used transportation system on Earth.',
  },
  {
    number: '830m',
    label: 'Tallest served height',
    detail: 'The Burj Khalifa. Impossible without vertical transport technology.',
  },
  {
    number: '6B+',
    label: 'Urban population by 2050',
    detail: 'Dense vertical cities are the only way to house a growing world.',
  },
];

const transformations = [
  {
    title: 'Urban Density',
    text: 'Without elevators, Manhattan would need to sprawl across the entire state of Connecticut to house the same population. The elevator made density possible, and with it, the modern city.',
  },
  {
    title: 'Social Mobility',
    text: 'Elevators democratized height. Before them, the wealthy lived low and the poor climbed. Otis inverted that, making penthouses aspirational and upper floors desirable.',
  },
  {
    title: 'Industrial Power',
    text: 'Mining, factories, warehouses: all relied on vertical transport to scale. The elevator did not just build cities. It powered the Industrial Revolution itself.',
  },
  {
    title: 'Accessibility',
    text: 'For the elderly, disabled, and anyone carrying the weight of daily life, the elevator is not convenience. It is participation. Without it, upper floors become prisons.',
  },
];

export default function ImpactSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(
        headerRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
        }
      );

      // Stats — count up animation
      const statEls = statsRef.current.querySelectorAll('.stat-item');
      statEls.forEach((stat) => {
        gsap.fromTo(
          stat,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: stat, start: 'top 85%' },
          }
        );
      });

      // Transformation cards
      const cards = cardsRef.current.querySelectorAll('.transform-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-36 px-6">
      {/* Header */}
      <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-20 md:mb-28">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-steel mb-4">
          Chapter Two
        </p>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight">
          What the Elevator
          <br />
          <span className="italic">Made Possible</span>
        </h2>
        <div className="section-divider mx-auto mt-8" />
      </div>

      {/* Stats Grid */}
      <div ref={statsRef} className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24 md:mb-32">
        {impacts.map((item, i) => (
          <div key={i} className="stat-item text-center">
            <span className="font-display text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
              {item.number}
            </span>
            <p className="font-body text-sm md:text-base font-semibold text-charcoal mt-2">
              {item.label}
            </p>
            <p className="font-body text-sm md:text-base text-charcoal/50 mt-1 leading-snug">
              {item.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Transformation Cards */}
      <div ref={cardsRef} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
        {transformations.map((item, i) => (
          <div
            key={i}
            className="transform-card group p-8 md:p-10 border border-charcoal/10 hover:border-charcoal/25 transition-all duration-500 relative overflow-hidden"
          >
            {/* Hover accent */}
            <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-rust transition-all duration-500" />

            <span className="font-mono text-xs text-rust tracking-widest uppercase">
              0{i + 1}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-charcoal mt-3 mb-4">
              {item.title}
            </h3>
            <p className="font-body text-base md:text-lg text-charcoal/60 leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Transition hint */}
      <div className="max-w-2xl mx-auto text-center mt-24 md:mt-32">
        <p className="font-body text-base md:text-lg text-charcoal/40 italic leading-relaxed">
          The elevator became so ordinary, so invisible, that we forgot what it gave us.
          <br />
          <span className="text-charcoal/60 font-medium">
            But what if it had never been invented at all?
          </span>
        </p>
      </div>
    </section>
  );
}
