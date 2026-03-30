import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DystopianCity() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate all reveal blocks
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

      // Horizontal scroll effect for the city visualization
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

      {/* City skyline visualization — abstract representation */}
      <div className="relative mb-20 md:mb-28 overflow-hidden py-12">
        <div className="city-scroll flex items-end gap-1 md:gap-2 px-12" style={{ width: '150%' }}>
          {Array.from({ length: 60 }).map((_, i) => {
            const maxH = 30; // All buildings are low
            const h = 8 + Math.random() * maxH;
            const w = 12 + Math.random() * 20;
            return (
              <div
                key={i}
                className="flex-shrink-0 bg-cream/5 border border-cream/10"
                style={{
                  height: `${h}px`,
                  width: `${w}px`,
                }}
              />
            );
          })}
        </div>
        <div className="absolute bottom-12 left-0 right-0 h-px bg-cream/10" />
        <p className="text-center font-mono text-[10px] text-cream/20 mt-4 tracking-widest uppercase">
          No building exceeds five floors. The city stretches endlessly.
        </p>
      </div>

      {/* Content blocks */}
      <div className="max-w-3xl mx-auto space-y-20 md:space-y-28">
        {/* The Rich */}
        <div className="reveal-block">
          <div className="flex items-start gap-6">
            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-amber/40 to-transparent flex-shrink-0 mt-2" />
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream/85 mb-4">
                The rich solve distance with proximity.
              </h3>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed mb-4">
                They live near the commercial core, near government, near hospitals, near schools, near culture.
                Their world is compact. Covered walkways, private courtyards, chauffeur lanes. Friction
                is eliminated through architecture.
              </p>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed">
                A wealthy executive crosses the city in comfort. Parks close. Leaves for lunch.
                Returns home without meaningful physical cost.
              </p>
            </div>
          </div>
        </div>

        {/* The Poor */}
        <div className="reveal-block">
          <div className="flex items-start gap-6">
            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-rust/40 to-transparent flex-shrink-0 mt-2" />
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream/85 mb-4">
                The poor live in the horizontal overflow.
              </h3>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed mb-4">
                Pushed to the periphery where land is cheap but life is expensive in time.
                A simple errand becomes a journey. Work is far. Services are far. Opportunity is far.
                Every day begins earlier and ends later.
              </p>
              <p className="font-body text-lg md:text-xl text-cream/70 leading-relaxed font-medium italic border-l-2 border-rust/30 pl-6">
                In this world, poverty is measured not just in money, but in kilometres and steps.
              </p>
            </div>
          </div>
        </div>

        {/* Cars as class weapons */}
        <div className="reveal-block">
          <div className="flex items-start gap-6">
            <div className="hidden md:block w-px h-32 bg-gradient-to-b from-steel/40 to-transparent flex-shrink-0 mt-2" />
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream/85 mb-4">
                Cars become class weapons.
              </h3>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed mb-4">
                When cities spread outward, whoever controls private transport controls time itself.
                The wealthy preserve energy and convert it into productivity, charm, social life, and ambition.
                The poor burn energy merely to remain functional.
              </p>
              <p className="font-body text-lg md:text-xl text-cream/70 leading-relaxed font-medium italic border-l-2 border-rust/30 pl-6">
                The poor do not just have less. They arrive at every opportunity already diminished.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Food systems impact */}
      <div className="reveal-block max-w-4xl mx-auto mt-24 md:mt-32 grid md:grid-cols-3 gap-6">
        {[
          {
            title: 'Urban Sprawl Eats Farmland',
            text: 'More housing means less farming land. Reduced food production chokes supply near cities.',
          },
          {
            title: 'Supply Chains Worsen',
            text: 'Food travels further, costs rise, waste increases. Distribution networks buckle under horizontal pressure.',
          },
          {
            title: 'Food Inequality Deepens',
            text: 'Prices surge from inefficiency. Poorer populations, already pushed to the periphery, are hit hardest.',
          },
        ].map((item, i) => (
          <div key={i} className="p-6 border border-cream/8 bg-cream/[0.02]">
            <span className="font-mono text-xs text-rust/50 tracking-widest">0{i + 1}</span>
            <h4 className="font-display text-lg font-semibold text-cream/80 mt-2 mb-3">{item.title}</h4>
            <p className="font-body text-sm text-cream/40 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
