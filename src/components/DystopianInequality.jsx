import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const topics = [
  {
    tag: 'Disability & Ageing',
    title: 'The body becomes a passport.',
    subtitle: 'And the poor carry the worst one.',
    paragraphs: [
      'Without lifts, accessibility is no longer an add-on policy issue. It becomes a primary determinant of who can fully participate in society.',
      'A disabled person may be legally equal and practically excluded. An elderly person may be "free" and effectively imprisoned above the third floor. Pregnant women, injured workers, parents with infants: all penalised by the architecture of ordinary life.',
      'Because the wealthy can buy access to the ground, private cars, domestic help, and low-friction buildings, bodily vulnerability becomes class-sorted. The poor endure the city with their flesh.',
    ],
  },
  {
    tag: 'Hospitals',
    title: 'Survival probabilities vary by floor number.',
    subtitle: '',
    paragraphs: [
      'Hospitals without lifts are nightmares. Critical care, private wards, and high-value services stay near the ground. Overflow patients and public wards get placed higher.',
      'Even emergency medicine changes. Paramedics prefer buildings with good ground access. A heart attack on the seventh floor of a cheap housing block is not just a medical event. It is a logistical disadvantage.',
    ],
  },
  {
    tag: 'Schools & Children',
    title: 'Children learn hierarchy through stairs before they can name it.',
    subtitle: '',
    paragraphs: [
      'Elite schools would be low-rise campuses with courtyards, lawns, and covered walkways. Working-class schools would stack students into upper levels, forcing children to climb several floors daily carrying books and lunch in tropical heat.',
      'Class is not just inherited through wealth, but through daily lessons in effort, restraint, and bodily weariness.',
    ],
  },
  {
    tag: 'Politics',
    title: 'Control the ground, control society.',
    subtitle: '',
    paragraphs: [
      'Governments would quickly learn that controlling mobility is controlling class. Zoning laws, parking access, floor allocation: all become political tools.',
      'A corrupt state does not need to formally oppress people if it can simply ensure that some populations live farther away, higher up, and with worse access.',
      'That is how dystopias work. Oppression survives by sounding reasonable.',
    ],
  },
  {
    tag: 'Culture & Language',
    title: '"Moving up" becomes an insult.',
    subtitle: '',
    paragraphs: [
      'In our world, "moving up" means success. In this world, that phrase carries bitterness. The true privilege is "coming down." Seniority is described in proximity to the street.',
    ],
    quotes: [
      { text: '"They\'ve put him on the twelfth"', meaning: 'he is insignificant' },
      { text: '"She\'s still climbing"', meaning: 'she is junior and expendable' },
      { text: '"Ground people"', meaning: 'the elite class' },
      { text: '"Upper workers"', meaning: 'the tired administrative masses' },
    ],
  },
];

export default function DystopianInequality() {
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
          The Ripple Effects
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-cream/90 tracking-tight leading-[1.1]">
          Inequality Becomes
          <br />
          <span className="italic text-rust">Architecture</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="reveal-block mb-20 md:mb-28 last:mb-0"
          >
            {/* Topic tag */}
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-rust/40 block mb-3">
              {topic.tag}
            </span>

            {/* Title */}
            <h3 className="font-display text-2xl md:text-4xl font-bold text-cream/85 leading-tight mb-2">
              {topic.title}
            </h3>

            {topic.subtitle && (
              <p className="font-display text-xl md:text-2xl text-rust/70 italic mb-6">
                {topic.subtitle}
              </p>
            )}

            {/* Paragraphs */}
            <div className="space-y-4 mt-6">
              {topic.paragraphs.map((p, i) => (
                <p key={i} className="font-body text-base md:text-lg text-cream/50 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Quotes (for language section) */}
            {topic.quotes && (
              <div className="mt-8 space-y-3 pl-6 border-l border-cream/10">
                {topic.quotes.map((q, i) => (
                  <div key={i} className="flex items-baseline gap-3">
                    <span className="font-display text-lg text-cream/70 italic">{q.text}</span>
                    <span className="font-body text-sm text-cream/30">{q.meaning}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            {index < topics.length - 1 && (
              <div className="mt-16 md:mt-20">
                <div className="section-divider" style={{ opacity: 0.1 }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
