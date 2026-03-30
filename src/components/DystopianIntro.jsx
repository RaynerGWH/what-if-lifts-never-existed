import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DystopianIntro() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: quoteRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        descRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: descRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6 min-h-screen flex flex-col items-center justify-center">
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #1a0e0e 0%, transparent 70%)',
        }}
      />

      <div ref={quoteRef} className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-rust/60 mb-8">
          The Dystopia Begins
        </p>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream/95 tracking-tight leading-[1.1]">
          A world where every metre above the ground becomes a tax paid in{' '}
          <span className="italic text-rust">sweat, time, pain,</span>
          <br />
          and <span className="italic text-rust">exclusion.</span>
        </h2>
      </div>

      <div ref={descRef} className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        <p className="font-body text-lg md:text-xl text-cream/50 leading-relaxed">
          This is not simply a world with fewer tall buildings.
        </p>
        <p className="font-body text-lg md:text-xl text-cream/70 leading-relaxed font-medium">
          It is a world with an entirely different moral geography, where the ground floor becomes
          the seat of privilege, height becomes punishment, and distance becomes a class burden.
        </p>
        <p className="font-body text-lg md:text-xl text-cream/40 leading-relaxed italic">
          Architecture does not just shape space. It shapes who matters.
        </p>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-cream/10 to-transparent" />
    </section>
  );
}
