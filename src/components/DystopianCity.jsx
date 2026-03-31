import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Decorative SVG Visuals ───

// Sprawling flat city silhouette
const FlatCitySVG = () => (
  <svg viewBox="0 0 400 60" fill="none" className="w-full max-w-2xl mx-auto opacity-0" style={{ filter: 'drop-shadow(0 0 8px rgba(196, 90, 60, 0.1))' }}>
    {/* Endless low buildings */}
    {Array.from({ length: 30 }).map((_, i) => {
      const x = i * 14 - 10;
      const h = 8 + Math.random() * 18;
      const w = 8 + Math.random() * 10;
      return (
        <rect key={i} x={x} y={60 - h} width={w} height={h} fill="#F5F0EB" fillOpacity={0.04 + Math.random() * 0.06} stroke="#F5F0EB" strokeOpacity={0.08} strokeWidth="0.5" />
      );
    })}
    {/* Ground line */}
    <line x1="0" y1="60" x2="400" y2="60" stroke="#F5F0EB" strokeOpacity="0.1" strokeWidth="0.5" />
    {/* Tiny cars on the ground */}
    {[50, 130, 220, 310].map((cx, i) => (
      <g key={i}>
        <rect x={cx} y={55} width={8} height={3} rx="1" fill="#C45A3C" fillOpacity={0.15 + i * 0.05} />
        <circle cx={cx + 2} cy={58.5} r="1" fill="#C45A3C" fillOpacity="0.2" />
        <circle cx={cx + 6} cy={58.5} r="1" fill="#C45A3C" fillOpacity="0.2" />
      </g>
    ))}
  </svg>
);

// Rich person's compact world — small radius circle
const RichWorldSVG = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-24 md:w-32">
    {/* Compact circle — everything close */}
    <circle cx="60" cy="60" r="35" stroke="#D4943A" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
    {/* Center: person */}
    <circle cx="60" cy="60" r="4" fill="#D4943A" opacity="0.5" />
    {/* Nearby amenities clustered */}
    <g opacity="0.4">
      {/* Hospital */}
      <rect x="42" y="35" width="8" height="8" rx="1" stroke="#D4943A" strokeWidth="0.8" fill="none" />
      <line x1="46" y1="37" x2="46" y2="41" stroke="#D4943A" strokeWidth="0.8" />
      <line x1="44" y1="39" x2="48" y2="39" stroke="#D4943A" strokeWidth="0.8" />
      {/* School */}
      <polygon points="80,38 74,44 86,44" stroke="#D4943A" strokeWidth="0.8" fill="none" />
      <rect x="76" y="44" width="8" height="5" stroke="#D4943A" strokeWidth="0.8" fill="none" />
      {/* Shop */}
      <rect x="70" y="72" width="10" height="7" rx="1" stroke="#D4943A" strokeWidth="0.8" fill="none" />
      {/* Office */}
      <rect x="38" y="70" width="7" height="12" rx="1" stroke="#D4943A" strokeWidth="0.8" fill="none" />
    </g>
    {/* Connecting lines — short distances */}
    <line x1="60" y1="56" x2="46" y2="43" stroke="#D4943A" strokeWidth="0.5" opacity="0.2" />
    <line x1="64" y1="58" x2="78" y2="44" stroke="#D4943A" strokeWidth="0.5" opacity="0.2" />
    <line x1="62" y1="64" x2="75" y2="74" stroke="#D4943A" strokeWidth="0.5" opacity="0.2" />
    <line x1="56" y1="63" x2="42" y2="74" stroke="#D4943A" strokeWidth="0.5" opacity="0.2" />
    {/* Label */}
    <text x="60" y="108" textAnchor="middle" fill="#D4943A" fontSize="6" opacity="0.4" fontFamily="monospace">COMPACT</text>
  </svg>
);

// Poor person's sprawling world — huge radius, everything far
const PoorWorldSVG = () => (
  <svg viewBox="0 0 160 160" fill="none" className="w-28 md:w-36">
    {/* Massive circle — everything far */}
    <circle cx="80" cy="80" r="65" stroke="#C45A3C" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
    {/* Center: person — tiny and alone */}
    <circle cx="80" cy="80" r="3" fill="#C45A3C" opacity="0.5" />
    {/* Amenities scattered at the edges */}
    <g opacity="0.35">
      {/* Hospital — far top */}
      <rect x="72" y="20" width="8" height="8" rx="1" stroke="#C45A3C" strokeWidth="0.8" fill="none" />
      <line x1="76" y1="22" x2="76" y2="26" stroke="#C45A3C" strokeWidth="0.8" />
      <line x1="74" y1="24" x2="78" y2="24" stroke="#C45A3C" strokeWidth="0.8" />
      {/* School — far right */}
      <polygon points="135,78 129,84 141,84" stroke="#C45A3C" strokeWidth="0.8" fill="none" />
      <rect x="131" y="84" width="8" height="5" stroke="#C45A3C" strokeWidth="0.8" fill="none" />
      {/* Shop — far bottom */}
      <rect x="75" y="132" width="10" height="7" rx="1" stroke="#C45A3C" strokeWidth="0.8" fill="none" />
      {/* Office — far left */}
      <rect x="18" y="74" width="7" height="12" rx="1" stroke="#C45A3C" strokeWidth="0.8" fill="none" />
    </g>
    {/* Long exhausting lines */}
    <line x1="80" y1="77" x2="76" y2="28" stroke="#C45A3C" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 3" />
    <line x1="83" y1="80" x2="131" y2="82" stroke="#C45A3C" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 3" />
    <line x1="80" y1="83" x2="80" y2="132" stroke="#C45A3C" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 3" />
    <line x1="77" y1="80" x2="25" y2="80" stroke="#C45A3C" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 3" />
    {/* Label */}
    <text x="80" y="155" textAnchor="middle" fill="#C45A3C" fontSize="6" opacity="0.4" fontFamily="monospace">SPRAWLING</text>
  </svg>
);

// Car as weapon — luxury vs broken
const CarSVG = ({ luxury = false }) => (
  <svg viewBox="0 0 100 50" fill="none" className={luxury ? 'w-20 md:w-24' : 'w-16 md:w-20'}>
    {luxury ? (
      // Sleek luxury car
      <g>
        <path d="M15 30C15 30 20 18 35 16C50 14 65 14 75 16C85 18 88 24 88 28V32H15V30Z" fill="#D4943A" fillOpacity="0.15" stroke="#D4943A" strokeWidth="1.2" />
        <circle cx="28" cy="34" r="5" stroke="#D4943A" strokeWidth="1" fill="#D4943A" fillOpacity="0.1" />
        <circle cx="75" cy="34" r="5" stroke="#D4943A" strokeWidth="1" fill="#D4943A" fillOpacity="0.1" />
        {/* Windows */}
        <path d="M30 20C30 20 38 16 52 16C60 16 65 17 68 20" stroke="#D4943A" strokeWidth="0.8" opacity="0.4" />
        {/* Speed lines */}
        <line x1="5" y1="25" x2="12" y2="25" stroke="#D4943A" strokeWidth="0.5" opacity="0.3" />
        <line x1="3" y1="29" x2="10" y2="29" stroke="#D4943A" strokeWidth="0.5" opacity="0.3" />
      </g>
    ) : (
      // Worn-out car / walking person
      <g>
        {/* Person walking — exhausted posture */}
        <circle cx="50" cy="15" r="4" stroke="#C45A3C" strokeWidth="1" fill="none" opacity="0.4" />
        <line x1="50" y1="19" x2="50" y2="32" stroke="#C45A3C" strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="32" x2="44" y2="42" stroke="#C45A3C" strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="32" x2="56" y2="42" stroke="#C45A3C" strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="24" x2="42" y2="30" stroke="#C45A3C" strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="24" x2="58" y2="28" stroke="#C45A3C" strokeWidth="1" opacity="0.4" />
        {/* Sweat drops */}
        <circle cx="56" cy="12" r="1" fill="#C45A3C" opacity="0.3" />
        <circle cx="59" cy="16" r="0.8" fill="#C45A3C" opacity="0.2" />
        {/* Steps / footprints */}
        <ellipse cx="38" cy="45" rx="2" ry="1" fill="#C45A3C" opacity="0.15" />
        <ellipse cx="33" cy="45" rx="2" ry="1" fill="#C45A3C" opacity="0.1" />
        <ellipse cx="28" cy="45" rx="2" ry="1" fill="#C45A3C" opacity="0.07" />
      </g>
    )}
  </svg>
);

// Farmland being eaten by houses
const FarmlandSVG = () => (
  <svg viewBox="0 0 120 60" fill="none" className="w-full max-w-[120px]">
    {/* Farm section (shrinking) */}
    <rect x="0" y="30" width="40" height="30" fill="#4a7c59" fillOpacity="0.15" />
    {/* Crop rows */}
    {[34, 40, 46, 52].map((y) => (
      <line key={y} x1="5" y1={y} x2="35" y2={y} stroke="#4a7c59" strokeWidth="0.5" opacity="0.3" />
    ))}
    {/* Arrow: houses encroaching */}
    <path d="M45 45L55 45" stroke="#C45A3C" strokeWidth="1" opacity="0.4" />
    <path d="M52 42L55 45L52 48" stroke="#C45A3C" strokeWidth="1" opacity="0.4" />
    {/* Houses taking over */}
    {[60, 75, 90, 105].map((x, i) => (
      <g key={i}>
        <rect x={x} y={42} width={10} height={10} fill="#C45A3C" fillOpacity={0.08 + i * 0.03} stroke="#C45A3C" strokeOpacity="0.15" strokeWidth="0.5" />
        <polygon points={`${x},42 ${x + 5},35 ${x + 10},42`} fill="#C45A3C" fillOpacity={0.06 + i * 0.02} stroke="#C45A3C" strokeOpacity="0.12" strokeWidth="0.5" />
      </g>
    ))}
  </svg>
);

export default function DystopianCity() {
  const sectionRef = useRef(null);
  const flatCityRef = useRef(null);
  const richWorldRef = useRef(null);
  const poorWorldRef = useRef(null);
  const luxuryCarRef = useRef(null);
  const walkingRef = useRef(null);
  const farmRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal blocks
      const blocks = sectionRef.current.querySelectorAll('.reveal-block');
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 82%' },
          }
        );
      });

      // City scroll
      const cityScroll = sectionRef.current.querySelector('.city-scroll');
      if (cityScroll) {
        gsap.to(cityScroll, {
          x: '-30%',
          ease: 'none',
          scrollTrigger: {
            trigger: cityScroll,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Flat city SVG fade + draw in
      if (flatCityRef.current) {
        gsap.fromTo(flatCityRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: flatCityRef.current, start: 'top 85%' },
        });
      }

      // Rich world — scale in from center
      if (richWorldRef.current) {
        gsap.fromTo(richWorldRef.current, { opacity: 0, scale: 0.5 }, {
          opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: richWorldRef.current, start: 'top 80%' },
        });
        // Gentle rotation
        gsap.to(richWorldRef.current, { rotation: 3, repeat: -1, yoyo: true, duration: 4, ease: 'sine.inOut', delay: 1.5 });
      }

      // Poor world — expand outward dramatically
      if (poorWorldRef.current) {
        gsap.fromTo(poorWorldRef.current, { opacity: 0, scale: 0.3 }, {
          opacity: 1, scale: 1, duration: 1.3, ease: 'power3.out',
          scrollTrigger: { trigger: poorWorldRef.current, start: 'top 80%' },
        });
        gsap.to(poorWorldRef.current, { rotation: -2, repeat: -1, yoyo: true, duration: 5, ease: 'sine.inOut', delay: 1.5 });
      }

      // Luxury car — slides in from left smoothly
      if (luxuryCarRef.current) {
        gsap.fromTo(luxuryCarRef.current, { opacity: 0, x: -80 }, {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: luxuryCarRef.current, start: 'top 82%' },
        });
        // Subtle bobbing like driving
        gsap.to(luxuryCarRef.current, { y: -3, repeat: -1, yoyo: true, duration: 1.5, ease: 'sine.inOut', delay: 1.5 });
      }

      // Walking person — enters slowly from the right, labored
      if (walkingRef.current) {
        gsap.fromTo(walkingRef.current, { opacity: 0, x: 60 }, {
          opacity: 1, x: 0, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: walkingRef.current, start: 'top 82%' },
        });
        // Slight trudging motion
        gsap.to(walkingRef.current, { y: 2, rotation: 1, repeat: -1, yoyo: true, duration: 0.8, ease: 'sine.inOut', delay: 2 });
      }

      // Farmland cards
      farmRefs.current.forEach((ref, i) => {
        if (!ref) return;
        gsap.fromTo(ref, { opacity: 0, y: 30, scale: 0.9 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: ref, start: 'top 85%' },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 px-6 overflow-hidden">
      {/* Section header */}
      <div className="reveal-block max-w-3xl mx-auto mb-20 md:mb-28">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-rust/50 mb-4">
          The Sprawling City
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-cream/90 tracking-tight leading-[1.1]">
          Wide, Exhausting, and
          <br />
          <span className="italic text-rust">Unequal by Design</span>
        </h2>
      </div>

      {/* ── Animated flat city skyline ── */}
      <div className="relative mb-12 md:mb-16 overflow-hidden py-8">
        <div className="city-scroll flex items-end gap-1 md:gap-2 px-12" style={{ width: '150%' }}>
          {Array.from({ length: 60 }).map((_, i) => {
            const maxH = 30;
            const h = 8 + Math.random() * maxH;
            const w = 12 + Math.random() * 20;
            return (
              <div
                key={i}
                className="flex-shrink-0 bg-cream/5 border border-cream/10"
                style={{ height: `${h}px`, width: `${w}px` }}
              />
            );
          })}
        </div>
        <div className="absolute bottom-8 left-0 right-0 h-px bg-cream/10" />
      </div>

      {/* ── Static flat city SVG below the scroll ── */}
      <div ref={flatCityRef} className="mb-16 md:mb-24 px-4">
        <FlatCitySVG />
        <p className="text-center font-mono text-[10px] text-cream/20 mt-3 tracking-widest uppercase">
          No building exceeds five floors. The city stretches endlessly.
        </p>
      </div>

      {/* Content blocks */}
      <div className="max-w-3xl mx-auto space-y-20 md:space-y-28">
        {/* ── The Rich ── */}
        <div className="reveal-block">
          <div className="flex items-start gap-6">
            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-amber/40 to-transparent flex-shrink-0 mt-2" />
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream/85 mb-4">
                The rich solve distance with proximity.
              </h3>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed mb-4">
                They live near the commercial core, near government, near hospitals, near schools, near culture.
                Their world is compact. Covered walkways, private courtyards, and chauffeur lanes eliminate friction
                through architecture.
              </p>
              {/* Rich world diagram */}
              <div ref={richWorldRef} className="flex justify-center my-8 opacity-0">
                <RichWorldSVG />
              </div>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed">
                A wealthy executive crosses the city in comfort. Parks close. Leaves for lunch.
                Returns home without meaningful physical cost.
              </p>
            </div>
          </div>
        </div>

        {/* ── The Poor ── */}
        <div className="reveal-block">
          <div className="flex items-start gap-6">
            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-rust/40 to-transparent flex-shrink-0 mt-2" />
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream/85 mb-4">
                The poor live in the horizontal overflow.
              </h3>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed mb-4">
                Pushed to the periphery where land is cheap but life is expensive in time.
                A simple errand becomes a journey. Work is far. Services are far. Opportunity is far.
                Every day begins earlier and ends later.
              </p>
              {/* Poor world diagram */}
              <div ref={poorWorldRef} className="flex justify-center my-8 opacity-0">
                <PoorWorldSVG />
              </div>
              <p className="font-body text-lg md:text-xl text-cream/70 leading-relaxed font-medium italic border-l-2 border-rust/30 pl-6">
                In this world, poverty is measured not just in money but in kilometres and steps.
              </p>
            </div>
          </div>
        </div>

        {/* ── Cars as class weapons ── */}
        <div className="reveal-block">
          <div className="flex items-start gap-6">
            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-steel/40 to-transparent flex-shrink-0 mt-2" />
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream/85 mb-4">
                Cars become class weapons.
              </h3>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed mb-4">
                When cities spread outward, whoever controls private transport controls time itself.
                The wealthy preserve energy and convert it into productivity, charm, social life, and ambition.
                The poor burn energy merely to remain functional.
              </p>

              {/* Visual comparison: luxury car vs walking */}
              <div className="flex items-center justify-center gap-8 md:gap-16 my-10">
                <div ref={luxuryCarRef} className="text-center opacity-0">
                  <CarSVG luxury />
                  <p className="font-mono text-[9px] text-amber/40 mt-2 tracking-widest">THE WEALTHY</p>
                </div>
                <div className="font-mono text-cream/15 text-lg">vs</div>
                <div ref={walkingRef} className="text-center opacity-0">
                  <CarSVG luxury={false} />
                  <p className="font-mono text-[9px] text-rust/40 mt-2 tracking-widest">THE POOR</p>
                </div>
              </div>

              <p className="font-body text-lg md:text-xl text-cream/70 leading-relaxed font-medium italic border-l-2 border-rust/30 pl-6">
                The poor do not just have less. They arrive at every opportunity already diminished.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Food systems impact ── */}
      <div className="max-w-4xl mx-auto mt-24 md:mt-32">
        {/* Section mini-header */}
        <div className="reveal-block mb-10">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-rust/40 mb-2">Impact on Food Systems</p>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream/80">
            When cities eat the land that feeds them
          </h3>
        </div>

        {/* Farmland visual */}
        <div className="reveal-block flex justify-center mb-10">
          <FarmlandSVG />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Urban Sprawl Eats Farmland',
              text: 'More housing means less farming land. Reduced food production chokes supply near cities.',
              icon: '🌾',
            },
            {
              title: 'Supply Chains Worsen',
              text: 'Food travels further, costs rise, waste increases. Distribution networks buckle under horizontal pressure.',
              icon: '🚛',
            },
            {
              title: 'Food Inequality Deepens',
              text: 'Prices surge from inefficiency. Poorer populations, already pushed to the periphery, are hit hardest.',
              icon: '⚖️',
            },
          ].map((item, i) => (
            <div
              key={i}
              ref={(el) => (farmRefs.current[i] = el)}
              className="p-6 border border-cream/8 bg-cream/[0.02] opacity-0 group hover:border-cream/15 transition-all duration-500"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{item.icon}</span>
                <span className="font-mono text-xs text-rust/50 tracking-widest">0{i + 1}</span>
              </div>
              <h4 className="font-display text-lg font-semibold text-cream/80 mb-3">{item.title}</h4>
              <p className="font-body text-sm text-cream/40 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}