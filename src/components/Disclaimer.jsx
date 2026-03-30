const arguments_ = [
  {
    number: '01',
    title: 'Physics makes it inevitable',
    text: 'Gravity is universal. Any civilisation subject to it will face the problem of moving mass vertically. The lift is the most elementary mechanical response to a constant physical constraint.',
  },
  {
    number: '02',
    title: 'The ingredients are too primitive to miss',
    text: 'A lift is just a rope, a platform, and a counterforce. These are among the earliest mechanical discoveries, predating writing, metallurgy, and agriculture.',
  },
  {
    number: '03',
    title: "It's not one invention, it's a category",
    text: "A bucket on a rope over a well is a lift. A construction hoist is a lift. A dumbwaiter is a lift. To have no lifts, you'd need to eliminate every instance of controlled vertical transport.",
  },
  {
    number: '04',
    title: 'Multiple pressures converge on it',
    text: "Mining, construction, warfare, agriculture: each independently demands vertical transport. You'd have to simultaneously block every one of these evolutionary paths.",
  },
  {
    number: '05',
    title: 'Path-dependence makes avoidance self-defeating',
    text: 'Any civilisation advanced enough to conceive of not having lifts is, by definition, advanced enough to have already invented them.',
  },
  {
    number: '06',
    title: 'History confirms convergence',
    text: 'Egypt, Rome, Greece, China, and medieval Europe all independently developed vertical hoisting mechanisms. The lift is one of the most independently re-invented devices in human history.',
  },
];

export default function Disclaimer() {
  return (
    <section className="relative py-16 md:py-24 px-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24 relative z-10">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-steel mb-4">
          Back to Reality
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight">
          Why This World
          <br />
          <span className="italic text-steel">Could Never Exist</span>
        </h2>
        <p className="font-body text-base md:text-lg text-charcoal/50 mt-6 max-w-xl mx-auto leading-relaxed">
          The dystopia above is a thought experiment, not a plausible timeline.
          Here is why the lift is one of the most inevitable inventions in human history.
        </p>
      </div>

      {/* Arguments grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 relative z-10">
        {arguments_.map((arg, i) => (
          <div
            key={i}
            className="group p-6 md:p-8 border border-charcoal/8 hover:border-charcoal/15 transition-all duration-500"
          >
            <span className="font-mono text-xs text-steel/50 tracking-widest">{arg.number}</span>
            <h3 className="font-display text-xl md:text-2xl font-semibold text-charcoal mt-2 mb-3">
              {arg.title}
            </h3>
            <p className="font-body text-sm md:text-base text-charcoal/50 leading-relaxed">
              {arg.text}
            </p>
          </div>
        ))}
      </div>

      {/* Core thesis */}
      <div className="max-w-3xl mx-auto text-center mt-16 md:mt-24 relative z-10">
        <div className="inline-block px-8 py-6 border border-charcoal/10">
          <p className="font-display text-lg md:text-xl text-charcoal/70 leading-relaxed italic">
            The lift is not a contingent invention that depends on a specific genius or cultural moment.
            It is a near-inevitable mechanical consequence of tool-using beings living under gravity.
          </p>
          <p className="font-body text-sm text-steel mt-4">
            No plausible timeline avoids it.
          </p>
        </div>
      </div>
    </section>
  );
}
