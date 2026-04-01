import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DystopianHousing() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 px-6">
      {/* Header */}
      <div className="reveal-block max-w-3xl mx-auto mb-16 md:mb-24">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-rust/50 mb-4">
          Housing & Living
        </p>
        <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-cream/90 tracking-tight leading-[1.1]">
          Ground Access as <span className="italic text-amber">Luxury,</span>
          <br />
          Upper Floors as <span className="italic text-rust">Desperation</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-16 md:space-y-24">
        {/* Wealthy districts */}
        <div className="reveal-block">
          <div className="flex items-start gap-6">
            <div className="hidden md:flex flex-col items-center flex-shrink-0">
              <div className="w-10 h-10 border border-amber/30 flex items-center justify-center">
                <span className="font-mono text-xs text-amber">G</span>
              </div>
              <div className="w-px h-20 bg-amber/20" />
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-cream/85 mb-4">
                The wealthy buy frictionlessness.
              </h3>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed">
                In wealthy districts, homes spread <strong className="text-cream/70 font-semibold">laterally</strong>: townhouses, compounds, low-rise blocks,
                sheltered drop-offs, internal courtyards, servant entrances, car access. The rich purchase
                not only space but the <strong className="text-cream/70 font-semibold">complete absence of physical effort</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Poor districts */}
        <div className="reveal-block">
          <div className="flex items-start gap-6">
            <div className="hidden md:flex flex-col items-center flex-shrink-0">
              <div className="w-10 h-10 border border-rust/30 flex items-center justify-center">
                <span className="font-mono text-xs text-rust">5</span>
              </div>
              <div className="w-px h-20 bg-rust/20" />
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-cream/85 mb-4">
                The fifth-floor flat is not charming. It is punishing.
              </h3>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed mb-4">
                Every bag of groceries is <strong className="text-cream/70 font-semibold">labour</strong>. Every child stroller is a <strong className="text-cream/70 font-semibold">burden</strong>.
                Every old age is a <strong className="text-cream/70 font-semibold">trap</strong>.
              </p>
              <p className="font-body text-base md:text-lg text-cream/50 leading-relaxed">
                The people who most need easy access (the <strong className="text-cream/70 font-semibold">elderly, disabled, sick, pregnant,
                exhausted, overworked</strong>) are the very people <strong className="text-cream/70 font-semibold">least able to afford it</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Key quote */}
        <div className="reveal-block text-center py-12">
          <p className="font-display text-2xl md:text-3xl text-cream/80 font-bold italic leading-snug max-w-2xl mx-auto">
            Estate agents do not advertise penthouses.
            <br />
            <span className="text-amber">They advertise step-free privilege.</span>
          </p>
        </div>

        {/* Comparison: Two Lives */}
        <div className="reveal-block grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="p-8 border border-amber/15 bg-amber/[0.02]">
            <span className="font-mono text-xs text-amber/60 tracking-widest uppercase">
              Ground-floor life
            </span>
            <ul className="mt-4 space-y-3">
              {[
                'Step outside to a covered walkway',
                'Groceries carried a few metres',
                'Children play in the courtyard',
                'Age with dignity and ease',
                'Preserve energy for ambition',
              ].map((item, i) => (
                <li key={i} className="font-body text-sm md:text-base text-cream/50 flex items-start gap-2">
                  <span className="text-amber/50 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 border border-rust/15 bg-rust/[0.02]">
            <span className="font-mono text-xs text-rust/60 tracking-widest uppercase">
              Fifth-floor life
            </span>
            <ul className="mt-4 space-y-3">
              {[
                'Calculate every trip downstairs',
                'Groceries are a physical ordeal',
                'Children learn effort before anything',
                'Age becomes imprisonment',
                'Burn energy just to remain functional',
              ].map((item, i) => (
                <li key={i} className="font-body text-sm md:text-base text-cream/50 flex items-start gap-2">
                  <span className="text-rust/50 mt-0.5">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
