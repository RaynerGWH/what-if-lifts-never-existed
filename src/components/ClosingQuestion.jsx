export default function ClosingQuestion() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal tracking-tight leading-[1.1]">
          What other invisible technologies
          <br />
          are quietly holding our world
          <br />
          <span className="italic gradient-text">together?</span>
        </p>
      </div>

      <div className="relative z-10 mt-12 text-center">
        <div className="section-divider mx-auto mb-8" />
        <p className="font-body text-sm md:text-base text-charcoal/60 max-w-md mx-auto leading-relaxed">
          The lift did not just move people upward. It prevented society from turning <strong className="text-charcoal/80 font-semibold">height,
          distance, and bodily effort</strong> into permanent instruments of class rule.
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-10 font-mono text-[10px] text-charcoal/100 tracking-widest uppercase">
        The World Without Lifts
      </div>
    </section>
  );
}
