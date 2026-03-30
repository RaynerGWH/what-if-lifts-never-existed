import { useRef, useState, useEffect, Suspense, lazy } from 'react';

function LoadingSkeleton({ isDark = false }) {
  const bg = isDark ? 'bg-cream/[0.03]' : 'bg-charcoal/[0.03]';
  const shimmer = isDark ? 'bg-cream/[0.06]' : 'bg-charcoal/[0.06]';

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-3xl mx-auto space-y-6 animate-pulse">
        {/* Title skeleton */}
        <div className={`h-4 w-24 ${shimmer} rounded`} />
        <div className={`h-12 w-3/4 ${bg} rounded`} />
        <div className={`h-12 w-1/2 ${bg} rounded`} />

        {/* Divider */}
        <div className={`h-px w-16 ${shimmer} mt-8`} />

        {/* Content skeleton */}
        <div className="space-y-4 mt-12">
          <div className={`h-4 w-full ${bg} rounded`} />
          <div className={`h-4 w-5/6 ${bg} rounded`} />
          <div className={`h-4 w-4/6 ${bg} rounded`} />
        </div>

        <div className="space-y-4 mt-8">
          <div className={`h-4 w-full ${bg} rounded`} />
          <div className={`h-4 w-3/4 ${bg} rounded`} />
        </div>
      </div>
    </div>
  );
}

export default function LazySection({ component: Component, isDark = false, rootMargin = '200px', ...props }) {
  const ref = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {isNear ? (
        <Component {...props} />
      ) : (
        <LoadingSkeleton isDark={isDark} />
      )}
    </div>
  );
}
