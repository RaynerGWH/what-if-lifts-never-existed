import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const TOTAL_FLOORS = 42;

export default function ElevatorExperience({ lenis }) {
  const sectionRef = useRef(null);
  const [phase, setPhase] = useState('waiting');
  // phases: waiting -> ready -> doors-open -> riding -> glitching -> dissolving -> complete
  const [floor, setFloor] = useState(1);
  const doorsRef = useRef(null);
  const interiorRef = useRef(null);
  const messageRef = useRef(null);
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

  // ── Trigger via IntersectionObserver (more reliable than ScrollTrigger with Lenis) ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          setPhase('ready');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── "Are you ready?" fade in ──
  useEffect(() => {
    if (phase === 'ready' && messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, [phase]);

  // ── Cleanup on unmount ──
  useEffect(() => {
    return () => {
      if (rideIntervalRef.current) clearInterval(rideIntervalRef.current);
    };
  }, []);

  const handleEnterElevator = () => {
    setPhase('doors-open');
  };

  const handleCloseDoors = () => {
    if (phase !== 'doors-open' || !doorsRef.current) return;

    const leftDoor = doorsRef.current.querySelector('.door-left');
    const rightDoor = doorsRef.current.querySelector('.door-right');

    gsap.to(leftDoor, { x: '0%', duration: 1.2, ease: 'power2.inOut' });
    gsap.to(rightDoor, {
      x: '0%',
      duration: 1.2,
      ease: 'power2.inOut',
      onComplete: () => {
        setPhase('riding');
        startRide();
      },
    });
  };

  const startRide = () => {
    let currentFloor = 1;
    rideIntervalRef.current = setInterval(() => {
      currentFloor++;
      setFloor(currentFloor);

      if (currentFloor >= TOTAL_FLOORS - 10) {
        setPhase('glitching');
      }

      if (currentFloor >= TOTAL_FLOORS) {
        clearInterval(rideIntervalRef.current);
        rideIntervalRef.current = null;
        setTimeout(() => {
          setPhase('dissolving');
          startDissolve();
        }, 500);
      }
    }, 120);
  };

  const startDissolve = () => {
    if (!interiorRef.current || !sectionRef.current) return;

    // Hold "Now imagine this never existed" for 3 seconds before fading
    setTimeout(() => {
      if (!interiorRef.current) {
        setPhase('complete');
        autoScrollToNext();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setPhase('complete');
          autoScrollToNext();
        },
      });

      tl.to(interiorRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.in',
      });
    }, 2000);
  };

  const autoScrollToNext = () => {
    if (lenis?.current) {
      lenis.current.start();
    }
  };

  const getAmbientColor = () => {
    if (phase === 'glitching') return '#FF2020';
    if (phase === 'dissolving') return '#FF0000';
    return '#FFF8E7';
  };

  // Once complete, collapse to 0 height
  const isComplete = phase === 'complete';

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
      style={{
        height: isComplete ? '0px' : '100vh',
        minHeight: isComplete ? '0px' : '100vh',
        transition: isComplete ? 'height 0.6s ease, min-height 0.6s ease' : 'none',
      }}
    >
      {phase !== 'waiting' && !isComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">

          {/* ── PHASE: Are you ready? ── */}
          {phase === 'ready' && (
            <div ref={messageRef} className="text-center">
              <p className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white/90 tracking-tight">
                Are you ready?
              </p>
              <button
                onClick={handleEnterElevator}
                className="mt-12 px-10 py-4 border border-white/30 text-white/70 font-mono text-sm tracking-[0.2em] uppercase
                         hover:bg-white/10 hover:border-white/60 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Enter the elevator
              </button>
            </div>
          )}

          {/* ── PHASE: Elevator Interior ── */}
          {(phase === 'doors-open' || phase === 'riding' || phase === 'glitching' || phase === 'dissolving') && (
            <div ref={interiorRef} className="fixed inset-0 flex items-center justify-center">
              {/* Interior background */}
              <div
                className="absolute inset-0 transition-colors duration-300"
                style={{
                  background:
                    phase === 'glitching' || phase === 'dissolving'
                      ? 'linear-gradient(180deg, #1a0000 0%, #0a0000 100%)'
                      : 'linear-gradient(180deg, #2A2520 0%, #1E1B18 50%, #151310 100%)',
                }}
              />

              {/* Ceiling light */}
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[80px] transition-colors duration-300 ${
                  phase === 'glitching' ? 'flicker' : ''
                }`}
                style={{ backgroundColor: getAmbientColor(), opacity: 0.4 }}
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
                  <div
                    className={`font-mono text-4xl md:text-6xl font-bold text-center tabular-nums ${
                      phase === 'glitching' ? 'text-red-500 glitch' : 'text-amber'
                    }`}
                  >
                    {phase === 'dissolving' ? '??' : floor}
                  </div>
                  <div className="flex justify-center mt-1">
                    <svg
                      width="16"
                      height="10"
                      viewBox="0 0 16 10"
                      className={phase === 'glitching' ? 'text-red-500' : 'text-amber/60'}
                    >
                      <path d="M8 0L16 10H0L8 0Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Doors */}
              <div ref={doorsRef} className="absolute inset-0 flex z-30">
                <div
                  className="door-left w-1/2 h-full elevator-door relative transition-transform duration-1000 ease-in-out"
                  style={{
                    transform: phase === 'doors-open' ? 'translateX(-95%)' : 'translateX(0%)',
                  }}
                >
                  <div className="elevator-door-line" style={{ right: '15%' }} />
                  <div className="elevator-door-line" style={{ right: '30%' }} />
                  <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-l from-black/40 to-transparent" />
                </div>

                <div
                  className="door-right w-1/2 h-full elevator-door relative transition-transform duration-1000 ease-in-out"
                  style={{
                    transform: phase === 'doors-open' ? 'translateX(95%)' : 'translateX(0%)',
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
                {phase === 'doors-open' && (
                  <>
                    <p className="font-body text-white/50 text-sm mb-6">You step inside.</p>
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
                  <p className="font-body text-white/30 text-sm animate-pulse">Ascending...</p>
                )}

                {phase === 'glitching' && (
                  <p className="font-display text-2xl md:text-4xl text-red-500/80 glitch font-bold">
                    SOMETHING IS WRONG
                  </p>
                )}

                {phase === 'dissolving' && (
                  <p className="font-display text-3xl md:text-5xl lg:text-6xl text-white/90 font-bold tracking-tight">
                    Now imagine this
                    <br />
                    <span className="italic text-red-400">never existed.</span>
                  </p>
                )}
              </div>

              {/* Distortion overlays */}
              {(phase === 'glitching' || phase === 'dissolving') && (
                <div className="absolute inset-0 z-40 pointer-events-none scanlines" />
              )}
              {phase === 'glitching' && (
                <div
                  className="absolute inset-0 z-30 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, transparent 40%, rgba(255,0,0,0.15) 100%)',
                  }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}