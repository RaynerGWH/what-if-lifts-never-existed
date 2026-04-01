import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      titleRef.current.children,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.15 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );

    // Floating scroll indicator
    gsap.to(scrollRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Decorative vertical line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-charcoal/20" />

      <div ref={titleRef} className="text-center relative z-10">
        <div className="overflow-hidden">
          <p className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-steel mb-6">
            A Counterfactual Exploration
          </p>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-[0.9] tracking-tight">
            The World
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-[0.9] tracking-tight">
            Without
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold italic leading-[0.9] tracking-tight gradient-text">
            Lifts
          </h1>
        </div>
      </div>

      <p
        ref={subtitleRef}
        className="font-body text-base md:text-lg text-charcoal/60 mt-6 max-w-md text-center leading-relaxed"
      >
        How a single invention shaped the <strong className="text-charcoal/80 font-semibold">cities</strong> we live in, the <strong className="text-charcoal/80 font-semibold">hierarchies</strong> we accept, and the <strong className="text-charcoal/80 font-semibold">world</strong> we take for granted.
      </p>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-charcoal/30">
          Scroll to explore
        </span>
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-charcoal/30">
          <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
