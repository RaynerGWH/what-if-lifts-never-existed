import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
      'Over 18 million elevators operate worldwide, making 7 billion trips per day. The elevator is the most-used transportation system on Earth, and yet the most invisible.',
    side: 'left',
  },
];

export default function HistorySection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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
    items.forEach((item, i) => {
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

    // Animate the center line growing
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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 px-6">
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
          {timelineData.map((item, index) => (
            <div
              key={index}
              className="timeline-item relative"
              data-side={item.side}
            >
              {/* Dot on line */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-rust border-2 border-cream z-10" />

              {/* Content card */}
              <div
                className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${
                  item.side === 'right' ? 'md:ml-auto md:pl-10' : 'md:mr-auto md:pr-10 md:text-right'
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
          ))}
        </div>
      </div>
    </section>
  );
}
