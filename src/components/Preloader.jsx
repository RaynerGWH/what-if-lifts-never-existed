import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Animate counter from 0 to 100
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => setCounter(Math.floor(obj.val)),
      onComplete: () => {
        // Fade out preloader
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => onComplete(),
        });
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center"
    >
      <div className="relative">
        <h1 className="font-display text-5xl md:text-7xl text-charcoal font-semibold tracking-tight">
          The World
        </h1>
        <h1 className="font-display text-5xl md:text-7xl text-charcoal font-semibold tracking-tight mt-1">
          Without <span className="italic text-rust">Lifts</span>
        </h1>
      </div>

      <div className="mt-12 flex items-center gap-4">
        <div className="w-48 h-[2px] bg-charcoal/10 overflow-hidden">
          <div
            className="h-full bg-charcoal transition-all duration-100 ease-out"
            style={{ width: `${counter}%` }}
          />
        </div>
        <span className="font-mono text-sm text-charcoal/50 w-8">
          {counter}
        </span>
      </div>
    </div>
  );
}
