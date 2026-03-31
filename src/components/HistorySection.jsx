import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── SVG Visuals for each timeline era ───
const FloatingVisuals = {
  // 236 BC — Archimedes: rope & pulley platform rising
  archimedes: (
    <svg viewBox="0 0 80 120" fill="none" className="w-16 md:w-20">
      {/* Rope */}
      <line x1="40" y1="0" x2="40" y2="45" stroke="#C45A3C" strokeWidth="2" strokeDasharray="4 3" />
      {/* Pulley wheel */}
      <circle cx="40" cy="12" r="6" stroke="#C45A3C" strokeWidth="1.5" fill="none" />
      {/* Platform */}
      <rect x="15" y="45" width="50" height="6" rx="1" fill="#C45A3C" opacity="0.8" />
      {/* Support ropes */}
      <line x1="20" y1="45" x2="40" y2="12" stroke="#C45A3C" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="45" x2="40" y2="12" stroke="#C45A3C" strokeWidth="1" opacity="0.5" />
      {/* Person on platform */}
      <circle cx="40" cy="38" r="3" fill="#1A1A1A" opacity="0.4" />
      <line x1="40" y1="41" x2="40" y2="44" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.4" />
    </svg>
  ),

  // 1743 — Flying Chair: ornate chair with ropes
  flyingChair: (
    <svg viewBox="0 0 80 100" fill="none" className="w-14 md:w-18">
      {/* Rope up */}
      <line x1="40" y1="0" x2="40" y2="25" stroke="#D4943A" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Chair back */}
      <rect x="24" y="25" width="32" height="30" rx="3" stroke="#D4943A" strokeWidth="1.5" fill="#D4943A" fillOpacity="0.1" />
      {/* Chair seat */}
      <rect x="20" y="55" width="40" height="5" rx="1" fill="#D4943A" opacity="0.6" />
      {/* Chair legs */}
      <line x1="24" y1="60" x2="22" y2="72" stroke="#D4943A" strokeWidth="1.5" />
      <line x1="56" y1="60" x2="58" y2="72" stroke="#D4943A" strokeWidth="1.5" />
      {/* Ornate detail */}
      <circle cx="40" cy="38" r="4" stroke="#D4943A" strokeWidth="1" fill="none" />
      <circle cx="40" cy="38" r="1.5" fill="#D4943A" opacity="0.5" />
    </svg>
  ),

  // 1823 — Ascending Room: platform with crowd
  ascendingRoom: (
    <svg viewBox="0 0 100 90" fill="none" className="w-16 md:w-20">
      {/* Platform base */}
      <rect x="10" y="55" width="80" height="8" rx="2" fill="#7A8B99" opacity="0.6" />
      {/* Railing */}
      <rect x="12" y="30" width="76" height="25" rx="2" stroke="#7A8B99" strokeWidth="1.5" fill="none" />
      {/* People silhouettes */}
      <circle cx="30" cy="42" r="3" fill="#1A1A1A" opacity="0.3" />
      <rect x="28" y="45" width="4" height="9" rx="1" fill="#1A1A1A" opacity="0.3" />
      <circle cx="50" cy="40" r="3.5" fill="#1A1A1A" opacity="0.3" />
      <rect x="47.5" y="43.5" width="5" height="11" rx="1" fill="#1A1A1A" opacity="0.3" />
      <circle cx="70" cy="43" r="3" fill="#1A1A1A" opacity="0.3" />
      <rect x="68" y="46" width="4" height="8" rx="1" fill="#1A1A1A" opacity="0.3" />
      {/* Up arrow */}
      <path d="M50 20L45 28H55L50 20Z" fill="#C45A3C" opacity="0.5" />
      <line x1="50" y1="28" x2="50" y2="10" stroke="#C45A3C" strokeWidth="1" opacity="0.3" strokeDasharray="2 2" />
    </svg>
  ),

  // 1854 — Otis Safety Brake: elevator with cut rope
  otisBrake: (
    <svg viewBox="0 0 70 110" fill="none" className="w-14 md:w-16">
      {/* Shaft walls */}
      <rect x="5" y="0" width="2" height="110" fill="#1A1A1A" opacity="0.1" />
      <rect x="63" y="0" width="2" height="110" fill="#1A1A1A" opacity="0.1" />
      {/* Rope (cut) */}
      <line x1="35" y1="0" x2="35" y2="28" stroke="#C45A3C" strokeWidth="1.5" />
      {/* Cut mark */}
      <line x1="30" y1="28" x2="40" y2="26" stroke="#C45A3C" strokeWidth="2" />
      {/* Frayed rope end */}
      <line x1="35" y1="35" x2="33" y2="40" stroke="#C45A3C" strokeWidth="1" opacity="0.5" />
      <line x1="35" y1="35" x2="37" y2="41" stroke="#C45A3C" strokeWidth="1" opacity="0.5" />
      {/* Elevator car — held in place! */}
      <rect x="12" y="35" width="46" height="35" rx="2" stroke="#D4943A" strokeWidth="2" fill="#D4943A" fillOpacity="0.08" />
      {/* Safety brake teeth */}
      <line x1="8" y1="40" x2="12" y2="42" stroke="#D4943A" strokeWidth="2" />
      <line x1="8" y1="50" x2="12" y2="52" stroke="#D4943A" strokeWidth="2" />
      <line x1="8" y1="60" x2="12" y2="62" stroke="#D4943A" strokeWidth="2" />
      <line x1="62" y1="40" x2="58" y2="42" stroke="#D4943A" strokeWidth="2" />
      <line x1="62" y1="50" x2="58" y2="52" stroke="#D4943A" strokeWidth="2" />
      <line x1="62" y1="60" x2="58" y2="62" stroke="#D4943A" strokeWidth="2" />
      {/* Person inside */}
      <circle cx="35" cy="48" r="3" fill="#1A1A1A" opacity="0.3" />
      {/* Exclamation */}
      <text x="35" y="90" textAnchor="middle" fill="#C45A3C" fontSize="14" fontWeight="bold" opacity="0.6">!</text>
    </svg>
  ),

  // 1880s — Electric: lightning bolt + elevator
  electric: (
    <svg viewBox="0 0 80 100" fill="none" className="w-14 md:w-18">
      {/* Lightning bolt */}
      <path d="M45 5L30 40H42L28 75L60 35H46L58 5H45Z" fill="#D4943A" fillOpacity="0.15" stroke="#D4943A" strokeWidth="1.5" />
      {/* Small elevator car */}
      <rect x="20" y="60" width="25" height="20" rx="2" stroke="#7A8B99" strokeWidth="1.5" fill="#7A8B99" fillOpacity="0.1" />
      {/* Doors */}
      <line x1="32.5" y1="62" x2="32.5" y2="78" stroke="#7A8B99" strokeWidth="1" />
      {/* Up arrow */}
      <path d="M32.5 55L28 60H37L32.5 55Z" fill="#D4943A" opacity="0.6" />
    </svg>
  ),

  // 1903 — Gearless Traction: skyscraper silhouette rising
  skyscraper: (
    <svg viewBox="0 0 100 120" fill="none" className="w-16 md:w-20">
      {/* Skyline of progressively taller buildings */}
      <rect x="5" y="80" width="12" height="35" fill="#1A1A1A" opacity="0.15" />
      <rect x="20" y="65" width="14" height="50" fill="#1A1A1A" opacity="0.15" />
      <rect x="37" y="40" width="16" height="75" fill="#C45A3C" opacity="0.2" />
      <rect x="56" y="25" width="14" height="90" fill="#C45A3C" opacity="0.25" />
      <rect x="73" y="10" width="18" height="105" rx="1" fill="#C45A3C" opacity="0.3" />
      {/* Windows on tallest */}
      {[20, 30, 40, 50, 60, 70, 80, 90].map((y) => (
        <g key={y}>
          <rect x="76" y={y} width="3" height="3" fill="#D4943A" opacity="0.4" />
          <rect x="82" y={y} width="3" height="3" fill="#D4943A" opacity="0.4" />
        </g>
      ))}
      {/* Arrow going up along tallest */}
      <path d="M82 5L78 12H86L82 5Z" fill="#C45A3C" opacity="0.5" />
    </svg>
  ),

  // Today — Globe with elevator arrows
  today: (
    <svg viewBox="0 0 90 90" fill="none" className="w-16 md:w-20">
      {/* Globe circle */}
      <circle cx="45" cy="45" r="30" stroke="#7A8B99" strokeWidth="1.5" fill="none" />
      {/* Latitude lines */}
      <ellipse cx="45" cy="45" rx="30" ry="10" stroke="#7A8B99" strokeWidth="0.5" fill="none" opacity="0.3" />
      <ellipse cx="45" cy="45" rx="30" ry="20" stroke="#7A8B99" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Longitude lines */}
      <ellipse cx="45" cy="45" rx="10" ry="30" stroke="#7A8B99" strokeWidth="0.5" fill="none" opacity="0.3" />
      <ellipse cx="45" cy="45" rx="20" ry="30" stroke="#7A8B99" strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Up arrows scattered */}
      <path d="M30 35L28 38H32L30 35Z" fill="#C45A3C" opacity="0.6" />
      <path d="M55 28L53 31H57L55 28Z" fill="#C45A3C" opacity="0.6" />
      <path d="M45 52L43 55H47L45 52Z" fill="#D4943A" opacity="0.6" />
      <path d="M65 45L63 48H67L65 45Z" fill="#C45A3C" opacity="0.5" />
      <path d="M25 55L23 58H27L25 55Z" fill="#D4943A" opacity="0.5" />
      {/* 18M text */}
      <text x="45" y="48" textAnchor="middle" fill="#C45A3C" fontSize="8" fontWeight="bold" opacity="0.5">18M</text>
    </svg>
  ),
};

// Map timeline items to their visuals and animation config
const visualConfigs = [
  { visual: 'archimedes', from: 'left', yOffset: -30, rotation: 0 },
  { visual: 'flyingChair', from: 'right', yOffset: -20, rotation: 5 },
  { visual: 'ascendingRoom', from: 'left', yOffset: -10, rotation: -3 },
  { visual: 'otisBrake', from: 'right', yOffset: -25, rotation: 0 },
  { visual: 'electric', from: 'left', yOffset: -15, rotation: 8 },
  { visual: 'skyscraper', from: 'right', yOffset: -20, rotation: -2 },
  { visual: 'today', from: 'left', yOffset: -10, rotation: 5 },
];

const timelineData = [
  {
    year: '236 BC',
    title: 'The Archimedes Lift',
    description:
      'The earliest known elevator: a platform hoisted by ropes and pulleys, reportedly designed by Archimedes. Simple, brutal, and powered by human or animal labor.',
    side: 'left',
  },
  {
    year: '1743',
    title: "The Flying Chair",
    description:
      'King Louis XV installs a personal lift at Versailles, a counterweighted chair that carried him between floors to visit his mistress. Luxury, not utility.',
    side: 'right',
  },
  {
    year: '1823',
    title: 'The "Ascending Room"',
    description:
      'London architects Burton and Hormer build a tourist platform that rises above the city. The public pays to be lifted. Height becomes spectacle.',
    side: 'left',
  },
  {
    year: '1854',
    title: 'Otis and the Safety Brake',
    description:
      'Elisha Otis demonstrates his safety elevator at the Crystal Palace. He cuts the rope. The platform holds. Fear of falling dies that day, and the skyscraper becomes possible.',
    side: 'right',
  },
  {
    year: '1880s',
    title: 'Electric Elevators Arrive',
    description:
      'Werner von Siemens unveils the first electric elevator. No more steam. No more hydraulics leaking. Buildings begin racing skyward.',
    side: 'left',
  },
  {
    year: '1903',
    title: 'The Gearless Traction Elevator',
    description:
      'Otis introduces gearless traction technology, enabling buildings of unlimited height. The modern skyscraper age begins. Manhattan will never look the same.',
    side: 'right',
  },
  {
    year: 'Today',
    title: 'Vertical Civilization',
    description:
      'Over 18 million elevators operate worldwide, making 7 billion trips per day. The elevator is the most-used transportation system on Earth, and the most invisible.',
    side: 'left',
  },
];

export default function HistorySection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const floatingRefs = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Timeline items
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach((item) => {
        const isLeft = item.dataset.side === 'left';
        gsap.fromTo(
          item,
          { x: isLeft ? -60 : 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
            },
          }
        );
      });

      // Center line growing
      const line = timelineRef.current.querySelector('.timeline-line-fill');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        );
      }

      // ── Floating visuals fly-in animations ──
      floatingRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const config = visualConfigs[i];
        const fromX = config.from === 'left' ? -200 : 200;

        gsap.fromTo(
          ref,
          {
            x: fromX,
            y: config.yOffset - 40,
            opacity: 0,
            rotation: config.rotation * 3,
            scale: 0.6,
          },
          {
            x: 0,
            y: config.yOffset,
            opacity: 1,
            rotation: config.rotation,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: items[i] || timelineRef.current,
              start: 'top 80%',
            },
          }
        );

        // Gentle floating after landing
        gsap.to(ref, {
          y: config.yOffset + 8,
          rotation: config.rotation + 2,
          repeat: -1,
          yoyo: true,
          duration: 2.5 + i * 0.3,
          ease: 'sine.inOut',
          delay: 1.5,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 overflow-hidden">
      {/* Section Header */}
      <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-24 md:mb-32">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-steel mb-4">
          Chapter One
        </p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal tracking-tight">
          A Brief History of
          <br />
          <span className="italic">Going Up</span>
        </h2>
        <div className="section-divider mx-auto mt-8" />
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative max-w-5xl mx-auto">
        {/* Center line */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-charcoal/10">
          <div
            className="timeline-line-fill w-full bg-charcoal/40 origin-top"
            style={{ height: '100%' }}
          />
        </div>

        <div className="space-y-16 md:space-y-24">
          {timelineData.map((item, index) => {
            const config = visualConfigs[index];
            const visualKey = config.visual;

            return (
              <div
                key={index}
                className="timeline-item relative"
                data-side={item.side}
              >
                {/* Dot on line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rust border-2 border-cream z-10" />

                {/* Floating visual — positioned on the opposite side of the text */}
                <div
                  ref={(el) => (floatingRefs.current[index] = el)}
                  className={`hidden md:block absolute top-0 pointer-events-none ${
                    item.side === 'left'
                      ? 'right-0 md:right-[5%] lg:right-[2%]'
                      : 'left-0 md:left-[5%] lg:left-[2%]'
                  }`}
                  style={{ opacity: 0 }}
                >
                  {FloatingVisuals[visualKey]}
                </div>

                {/* Content card */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${
                    item.side === 'right'
                      ? 'md:ml-auto md:pl-10'
                      : 'md:mr-auto md:pr-10 md:text-right'
                  }`}
                >
                  <span className="font-mono text-sm text-rust font-medium tracking-wide">
                    {item.year}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-base md:text-lg text-charcoal/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}