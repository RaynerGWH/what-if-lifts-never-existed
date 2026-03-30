import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import LazySection from './components/LazySection';
import HistorySection from './components/HistorySection';
import ImpactSection from './components/ImpactSection';
import ElevatorExperience from './components/ElevatorExperience';
const CityMorphScene = lazy(() => import('./components/CityMorphScene'));
import DystopianIntro from './components/DystopianIntro';
import DystopianCity from './components/DystopianCity';
import DystopianOffice from './components/DystopianOffice';
import DystopianHousing from './components/DystopianHousing';
import DystopianInequality from './components/DystopianInequality';
import ThreeLaws from './components/ThreeLaws';
import ReturnElevator from './components/ReturnElevator';
import Disclaimer from './components/Disclaimer';
import ClosingQuestion from './components/ClosingQuestion';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!isLoaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [isLoaded]);

  const handlePreloaderComplete = () => {
    setIsLoaded(true);
  };

  return (
    <div className="grain-overlay">
      {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}

      {isLoaded && (
        <>
          {/* ══════════════════════════════════════════
              LIGHT SECTIONS — The Real World
              ══════════════════════════════════════════ */}
          <div className="section-light">
            <HeroSection />
            <LazySection component={HistorySection} rootMargin="300px" />
            <LazySection component={ImpactSection} rootMargin="300px" />
          </div>

          {/* ══════════════════════════════════════════
              THE ELEVATOR — Enter the Dystopia
              ══════════════════════════════════════════ */}
          <ElevatorExperience lenis={lenisRef} />

          {/* ══════════════════════════════════════════
              DARK SECTIONS — The Dystopian World
              ══════════════════════════════════════════ */}
          <div className="section-dark">
            <Suspense fallback={
              <div className="h-screen flex items-center justify-center bg-abyss">
                <div className="text-center">
                  <div className="w-8 h-8 border border-cream/20 border-t-cream/60 rounded-full animate-spin mx-auto" />
                  <p className="font-mono text-xs text-cream/30 mt-4 tracking-widest uppercase">Loading cityscape</p>
                </div>
              </div>
            }>
              <CityMorphScene lenis={lenisRef} />
            </Suspense>
            <div id="dystopian-intro">
              <LazySection component={DystopianIntro} isDark rootMargin="200px" />
            </div>
            <LazySection component={DystopianCity} isDark rootMargin="200px" />
            <LazySection component={DystopianOffice} isDark rootMargin="200px" />
            <LazySection component={DystopianHousing} isDark rootMargin="200px" />
            <LazySection component={DystopianInequality} isDark rootMargin="200px" />
            <LazySection component={ThreeLaws} isDark rootMargin="200px" />
          </div>

          {/* ══════════════════════════════════════════
              THE RETURN — Exit the Dystopia
              ══════════════════════════════════════════ */}
          <ReturnElevator lenis={lenisRef} />

          {/* ══════════════════════════════════════════
              LIGHT AGAIN — Back to Reality
              ══════════════════════════════════════════ */}
          <div id="back-to-reality" className="section-light">
            <Disclaimer />
            <ClosingQuestion />
          </div>
        </>
      )}
    </div>
  );
}
