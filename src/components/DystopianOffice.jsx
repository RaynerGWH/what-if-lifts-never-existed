import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const floorData = [
  { floor: 'G', label: 'CEO & Board', status: 'elite', desc: 'Marble lobbies. Coffee still hot.' },
  { floor: '1', label: 'Senior Partners', status: 'elite', desc: 'Private suites. Nearest exits.' },
  { floor: '2', label: 'Client Reception', status: 'elite', desc: 'The best light. The best air.' },
  { floor: '3', label: 'Management', status: 'mid', desc: 'Comfortable. Respectable.' },
  { floor: '4', label: 'Senior Staff', status: 'mid', desc: 'Acceptable. Functional.' },
  { floor: '5', label: 'Junior Staff', status: 'low', desc: 'The climb begins to show.' },
  { floor: '6', label: 'Analysts & Clerks', status: 'low', desc: 'Sweat in formalwear.' },
  { floor: '7', label: 'Interns & Temps', status: 'low', desc: 'Arrive already exhausted.' },
  { floor: '8', label: 'Call Centre', status: 'bottom', desc: 'Out of sight. Out of breath.' },
  { floor: '9', label: 'Archives & Storage', status: 'bottom', desc: 'Where ambition goes to die.' },
];

export default function DystopianOffice() {
  const sectionRef = useRef(null);
  const buildingRef = useRef(null);

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

      // Building floors reveal one by one
      const floors = buildingRef.current?.querySelectorAll('.building-floor');
      if (floors) {
        floors.forEach((floor, i) => {
          gsap.fromTo(
            floor,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: i * 0.08,
              ease: 'power3.out',
              scrollTrigger: { trigger: buildingRef.current, start: 'top 75%' },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'elite': return 'border-amber/40 bg-amber/5';
      case 'mid': return 'border-cream/15 bg-cream/[0.02]';
      case 'low': return 'border-rust/20 bg-rust/5';
      case 'bottom': return 'border-red-900/30 bg-red-900/10';
      default: return 'border-cream/10';
    }
  };

  const getTextColor = (status) => {
    switch (status) {
      case 'elite': return 'text-amber';
      case 'mid': return 'text-cream/60';
      case 'low': return 'text-rust/70';
      case 'bottom': return 'text-red-400/60';
      default: return 'text-cream/50';
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 px-6">
      {/* Header */}
      <div className="reveal-block max-w-3xl mx-auto mb-16 md:mb-24">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-rust/50 mb-4">
          The Office Tower
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-cream/90 tracking-tight leading-[1.1]">
          Status by <span className="italic text-rust">Descent,</span>
          <br />
          Not Ascent
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* The building visualization */}
        <div ref={buildingRef} className="space-y-1">
          {floorData.map((item, i) => (
            <div
              key={i}
              className={`building-floor flex items-center gap-4 px-4 py-3 border ${getStatusColor(item.status)} transition-all duration-300`}
            >
              <span className={`font-mono text-sm font-bold w-6 ${getTextColor(item.status)}`}>
                {item.floor}
              </span>
              <div className="flex-1">
                <span className={`font-body text-sm font-medium ${getTextColor(item.status)}`}>
                  {item.label}
                </span>
              </div>
              <span className="font-body text-xs text-cream/30 italic hidden md:block">
                {item.desc}
              </span>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-amber/50 rounded-full" />
              <span className="font-mono text-[10px] text-cream/30">Power</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-rust/50 rounded-full" />
              <span className="font-mono text-[10px] text-cream/30">Labour</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-900/50 rounded-full" />
              <span className="font-mono text-[10px] text-cream/30">Forgotten</span>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-8">
          <div className="reveal-block">
            <p className="font-body text-base md:text-lg text-cream/55 leading-relaxed">
              In our world, the top floor signals prestige. In this world, that inverts entirely.
              The most powerful people occupy the ground floor or just above it. This is not a stylistic choice.
            </p>
          </div>

          <div className="reveal-block">
            <p className="font-display text-xl md:text-2xl text-cream/80 font-semibold italic leading-snug">
              The fewer steps you must take, the more important you are.
            </p>
          </div>

          <div className="reveal-block">
            <p className="font-body text-base md:text-lg text-cream/55 leading-relaxed">
              The chief executive has an office off the lobby. Senior management are on the first
              and second floors. The marble, the air, the best toilets, the nearest exits: all reserved
              for those whose time and bodies matter most.
            </p>
          </div>

          <div className="reveal-block">
            <p className="font-body text-base md:text-lg text-cream/55 leading-relaxed">
              Promotion is not "climbing the corporate ladder." It is the opposite.
            </p>
            <p className="font-display text-2xl md:text-3xl text-amber font-bold mt-4">
              You earn the right to come down.
            </p>
          </div>

          <div className="reveal-block border-l-2 border-rust/20 pl-6">
            <p className="font-body text-base text-cream/45 leading-relaxed">
              New hires arrive in polished shoes, still naive, and are told they are on the ninth floor.
              That assignment is not administrative. It is social branding. Every morning they drag their
              bodies upward while executives glide in at street level with coffee still hot in their hands.
            </p>
            <p className="font-body text-sm text-cream/30 mt-3 italic">
              The building itself teaches them their place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
