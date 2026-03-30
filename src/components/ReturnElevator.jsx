import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function ReturnElevator({ lenis }) {
  const sectionRef = useRef(null);
  const [phase, setPhase] = useState('waiting');
  // phases: waiting -> corridor -> approaching -> inside -> riding -> arriving -> doors-opening -> complete
  const [floor, setFloor] = useState(42);
  const corridorRef = useRef(null);
  const doorsRef = useRef(null);
  const interiorRef = useRef(null);
  const hasTriggered = useRef(false);
  const rideIntervalRef = useRef(null);

  // ── Scroll lock ──
  useEffect(() => {
    if (!lenis?.current) return;
    if (phase !== 'waiting' && phase !== 'complete') {
      lenis.current.stop();
    } else if (phase === 'complete') {
      lenis.current.start();
    }
  }, [phase, lenis]);

  // ── Trigger via IntersectionObserver ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          setPhase('corridor');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Corridor fade-in ──
  useEffect(() => {
    if (phase === 'corridor' && corridorRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        corridorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      )
        .fromTo(
          corridorRef.current.querySelector('.corridor-text'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
        .call(() => setPhase('approaching'), null, '+=1.2');
    }
  }, [phase]);

  // ── Cleanup ──
  useEffect(() => {
    return () => {
      if (rideIntervalRef.current) clearInterval(rideIntervalRef.current);
    };
  }, []);

  const handleApproach = () => {
    if (phase !== 'approaching' || !corridorRef.current) return;

    const doorFrame = corridorRef.current.querySelector('.distant-doors');
    const tl = gsap.timeline();

    tl.to(doorFrame, {
      scale: 14,
      duration: 1.5,
      ease: 'power3.in',
    })
      .to(corridorRef.current, { opacity: 0, duration: 0.3 }, '-=0.3')
      .call(() => setPhase('inside'));
  };

  const handleCloseDoors = () => {
    if (phase !== 'inside' || !doorsRef.current) return;

    const leftDoor = doorsRef.current.querySelector('.door-left');
    const rightDoor = doorsRef.current.querySelector('.door-right');

    gsap.to(leftDoor, { x: '0%', duration: 1.2, ease: 'power2.inOut' });
    gsap.to(rightDoor, {
      x: '0%',
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        setPhase('riding');
        startDescent();
      },
    });
  };

  const startDescent = () => {
    let currentFloor = 42;
    rideIntervalRef.current = setInterval(() => {
      currentFloor--;
      setFloor(currentFloor);

      if (currentFloor <= 1) {
        clearInterval(rideIntervalRef.current);
        rideIntervalRef.current = null;
        setTimeout(() => {
          setPhase('arriving');
          setTimeout(() => handleArrival(), 800);
        }, 400);
      }
    }, 90);
  };

  const handleArrival = () => {
    setPhase('doors-opening');

    if (!doorsRef.current) return;
    const leftDoor = doorsRef.current.querySelector('.door-left');
    const rightDoor = doorsRef.current.querySelector('.door-right');

    // Open doors
    gsap.to(leftDoor, { x: '-95%', duration: 1.5, ease: 'power2.inOut' });
    gsap.to(rightDoor, { x: '95%', duration: 1.5, ease: 'power2.inOut' });

    // Light floods in
    if (interiorRef.current) {
      gsap.to(interiorRef.current, {
        backgroundColor: '#F5F0EB',
        duration: 2,
        ease: 'power2.inOut',
      });
    }

    // Fade out and complete
    setTimeout(() => {
      if (interiorRef.current) {
        gsap.to(interiorRef.current, {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => setPhase('complete'),
        });
      } else {
        setPhase('complete');
      }
    }, 2200);
  };

  const isComplete = phase === 'complete';

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        height: isComplete ? '0px' : '100vh',
        minHeight: isComplete ? '0px' : '100vh',
        transition: isComplete ? 'height 0.6s ease, min-height 0.6s ease' : 'none',
        backgroundColor: '#000',
      }}
    >
      {phase !== 'waiting' && !isComplete && (
        <div className="fixed inset-0 z-50 bg-black">

          {/* ── CORRIDOR ── */}
          {(phase === 'corridor' || phase === 'approaching') && (
            <div ref={corridorRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
              {/* Dark corridor */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #080808 100%)',
                }}
              />

              {/* Distant elevator doors */}
              <div className="distant-doors relative w-16 h-24 md:w-20 md:h-32 border border-cream/20 bg-cream/5 flex overflow-hidden">
                <div className="w-1/2 h-full border-r border-cream/10 bg-gradient-to-r from-cream/[0.03] to-cream/[0.06]" />
                <div className="w-1/2 h-full bg-gradient-to-l from-cream/[0.03] to-cream/[0.06]" />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-1 bg-amber/40 blur-sm" />
              </div>

              <p className="corridor-text font-display text-2xl md:text-4xl text-cream/60 mt-12 text-center italic relative z-10">
                But there is a way back.
              </p>

              {phase === 'approaching' && (
                <button
                  onClick={handleApproach}
                  className="mt-8 px-8 py-3 border border-cream/20 text-cream/50 font-mono text-sm tracking-[0.15em] uppercase
                           hover:bg-cream/5 hover:border-cream/40 hover:text-cream/70 transition-all duration-300 cursor-pointer relative z-10"
                >
                  Approach the lift
                </button>
              )}
            </div>
          )}

          {/* ── ELEVATOR INTERIOR ── */}
          {(phase === 'inside' || phase === 'riding' || phase === 'arriving' || phase === 'doors-opening') && (
            <div
              ref={interiorRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background:
                  phase === 'doors-opening'
                    ? '#F5F0EB'
                    : 'linear-gradient(180deg, #2A2520 0%, #1E1B18 50%, #151310 100%)',
              }}
            >
              {/* Ceiling light */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[80px] transition-colors duration-1000"
                style={{
                  backgroundColor: phase === 'doors-opening' ? '#F5F0EB' : '#FFF8E7',
                  opacity: phase === 'doors-opening' ? 0.8 : 0.4,
                }}
              />

              {/* Wall panels */}
              <div className="absolute inset-x-0 top-0 bottom-0 flex">
                <div className="w-4 md:w-8 bg-gradient-to-r from-[#1a1815] to-[#25221e] h-full" />
                <div className="flex-1" />
                <div className="w-4 md:w-8 bg-gradient-to-l from-[#1a1815] to-[#25221e] h-full" />
              </div>

              {/* Handrail */}
              <div className="absolute left-4 md:left-8 right-4 md:right-8 top-[60%] h-[2px] bg-[#8B7355]/30" />

              {/* Floor display */}
              <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-black/80 border border-[#8B7355]/30 px-6 md:px-10 py-3 md:py-4">
                  <div className="font-mono text-4xl md:text-6xl font-bold text-center tabular-nums text-amber">
                    {floor === 1 ? 'G' : floor}
                  </div>
                  <div className="flex justify-center mt-1">
                    <svg width="16" height="10" viewBox="0 0 16 10" className="text-amber/60">
                      <path d="M8 10L0 0H16L8 10Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Doors */}
              <div ref={doorsRef} className="absolute inset-0 flex z-30">
                <div
                  className="door-left w-1/2 h-full elevator-door relative transition-transform duration-1000 ease-in-out"
                  style={{
                    transform:
                      phase === 'inside' || phase === 'doors-opening'
                        ? 'translateX(-95%)'
                        : 'translateX(0%)',
                  }}
                >
                  <div className="elevator-door-line" style={{ right: '15%' }} />
                  <div className="elevator-door-line" style={{ right: '30%' }} />
                  <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-l from-black/40 to-transparent" />
                </div>
                <div
                  className="door-right w-1/2 h-full elevator-door relative transition-transform duration-1000 ease-in-out"
                  style={{
                    transform:
                      phase === 'inside' || phase === 'doors-opening'
                        ? 'translateX(95%)'
                        : 'translateX(0%)',
                  }}
                >
                  <div className="elevator-door-line" style={{ left: '15%' }} />
                  <div className="elevator-door-line" style={{ left: '30%' }} />
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-r from-black/40 to-transparent" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-black/60 z-10" />
              </div>

              {/* Action / Message area */}
              <div className="relative z-40 text-center">
                {phase === 'inside' && (
                  <>
                    <p className="font-body text-cream/40 text-sm mb-6">You step back inside.</p>
                    <button
                      onClick={handleCloseDoors}
                      className="px-8 py-3 bg-[#8B7355]/20 border border-[#8B7355]/40 text-[#D4C5A9] font-mono text-sm tracking-[0.15em] uppercase
                               hover:bg-[#8B7355]/30 hover:border-[#8B7355]/60 transition-all duration-300 cursor-pointer"
                    >
                      Close Doors
                    </button>
                  </>
                )}

                {phase === 'riding' && (
                  <p className="font-body text-cream/30 text-sm animate-pulse">Descending...</p>
                )}

                {phase === 'arriving' && (
                  <div>
                    <p className="font-mono text-amber/60 text-lg">— G —</p>
                    <p className="font-display text-2xl md:text-4xl text-cream/80 font-semibold mt-4 italic">
                      Ground floor. Welcome back.
                    </p>
                  </div>
                )}

                {phase === 'doors-opening' && (
                  <p className="font-display text-3xl md:text-5xl text-charcoal/80 font-bold">
                    Back to reality.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
