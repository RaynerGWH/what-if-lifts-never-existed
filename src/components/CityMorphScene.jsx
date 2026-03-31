import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';

// ─── Generate building data ───
function generateBuildings(count = 150) {
  const buildings = [];
  const gridSize = 50;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.pow(Math.random(), 0.6) * gridSize;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const distFromCenter = Math.sqrt(x * x + z * z);
    const centerFactor = 1 - Math.min(distFromCenter / gridSize, 1);
    const height = 2 + Math.random() * (4 + centerFactor * 24);
    const width = 0.8 + Math.random() * 1.6;
    const depth = 0.8 + Math.random() * 1.6;

    const flatHeight = Math.min(height, 2 + Math.random() * 2.5);
    const spreadFactor = 1 + centerFactor * 2;
    const flatX = x * spreadFactor + (Math.random() - 0.5) * 6;
    const flatZ = z * spreadFactor + (Math.random() - 0.5) * 6;

    buildings.push({
      x, z, height, width, depth,
      flatX, flatZ, flatHeight,
      flatWidth: width * (1 + Math.random() * 0.5),
      flatDepth: depth * (1 + Math.random() * 0.5),
    });
  }
  return buildings;
}

// ─── Instanced Buildings ───
function Buildings({ progress }) {
  const meshRef = useRef();
  const buildings = useMemo(() => generateBuildings(150), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;
    const t = progress.current;

    for (let i = 0; i < buildings.length; i++) {
      const b = buildings[i];
      const px = THREE.MathUtils.lerp(b.x, b.flatX, t);
      const pz = THREE.MathUtils.lerp(b.z, b.flatZ, t);
      const sx = THREE.MathUtils.lerp(b.width, b.flatWidth, t);
      const sy = THREE.MathUtils.lerp(b.height, b.flatHeight, t);
      const sz = THREE.MathUtils.lerp(b.depth, b.flatDepth, t);

      dummy.position.set(px, sy / 2, pz);
      dummy.scale.set(sx, sy, sz);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, buildings.length]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8899aa" emissive="#334455" emissiveIntensity={0.6} roughness={0.6} metalness={0.2} />
    </instancedMesh>
  );
}

// ─── Camera ───
function Camera({ progress }) {
  const { camera } = useThree();

  useFrame(() => {
    const t = progress.current;
    camera.position.set(
      Math.sin(t * 0.5) * 5,
      THREE.MathUtils.lerp(22, 50, t),
      THREE.MathUtils.lerp(40, 80, t)
    );
    camera.lookAt(0, THREE.MathUtils.lerp(6, 1, t), 0);
  });

  return null;
}

// ─── Main Exported Component ───
export default function CityMorphScene({ lenis }) {
  const sectionRef = useRef(null);
  const progress = useRef(0);
  const [phase, setPhase] = useState('waiting');
  // phases: waiting -> loading -> ready -> playing -> done
  const [canvasError, setCanvasError] = useState(false);
  const hasTriggered = useRef(false);
  const timeoutRef = useRef(null);

  // Scroll lock only during playing (not ready)
  useEffect(() => {
    if (!lenis?.current) return;
    if (phase === 'playing') {
      lenis.current.stop();
    } else if (phase === 'done') {
      lenis.current.start();
    }
  }, [phase, lenis]);

  // Trigger via IntersectionObserver
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          setPhase('loading');

          // Fallback: if canvas never loads, skip after 10 seconds
          timeoutRef.current = setTimeout(() => {
            setPhase('done');
            scrollToDystopianIntro();
          }, 10000);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const scrollToDystopianIntro = useCallback(() => {
    if (lenis?.current) {
      lenis.current.start();
      setTimeout(() => {
        const target = document.getElementById('dystopian-intro');
        if (target && lenis.current) {
          lenis.current.scrollTo(target, {
            duration: 2.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }, 200);
    }
  }, [lenis]);

  const handleCanvasReady = useCallback(() => {
    // Canvas initialized — clear fallback, show the static city with button
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setTimeout(() => {
      setPhase('ready');
    }, 500);
  }, []);

  const handleRemoveLifts = useCallback(() => {
    if (phase !== 'ready') return;
    setPhase('playing');

    const obj = { val: 0 };
    gsap.to(obj, {
      val: 1,
      duration: 6,
      ease: 'power2.inOut',
      delay: 0.3,
      onUpdate: () => {
        progress.current = obj.val;
      },
      onComplete: () => {
        setTimeout(() => {
          setPhase('done');
          scrollToDystopianIntro();
        }, 200);
      },
    });
  }, [phase, scrollToDystopianIntro]);

  // Error fallback
  if (canvasError) {
    return (
      <section ref={sectionRef} className="relative h-screen bg-abyss flex items-center justify-center">
        <p className="font-mono text-xs text-cream/20">[ 3D scene unavailable ]</p>
      </section>
    );
  }

  // Overlay text based on progress
  const getOverlayText = () => {
    if (phase === 'playing') {
      const t = progress.current;
      if (t < 0.25) return 'The vertical city we know';
      if (t < 0.6) return 'Without lifts, it all comes down';
      return 'Five floors. No higher.';
    }
    if (phase === 'done') return 'Continue scrolling';
    return '';
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-abyss"
      style={{ height: '100vh', minHeight: '100vh' }}
    >
      {/* Loading spinner — before canvas is ready */}
      {(phase === 'waiting' || phase === 'loading') && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border border-cream/20 border-t-cream/60 rounded-full animate-spin mx-auto" />
            <p className="font-mono text-xs text-cream/30 mt-4 tracking-widest uppercase">
              Loading cityscape
            </p>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      {phase !== 'waiting' && (
        <div className="absolute inset-0">
          <Canvas
            camera={{ fov: 50, near: 0.1, far: 200, position: [0, 22, 40] }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
            onCreated={handleCanvasReady}
            onError={() => setCanvasError(true)}
            style={{ background: '#0a0a0a' }}
          >
            <fog attach="fog" args={['#0a0a0a', 70, 160]} />

            <ambientLight intensity={1.0} color="#aabbcc" />
            <directionalLight position={[30, 50, 25]} intensity={2.0} color="#dde4ee" />
            <directionalLight position={[-25, 35, -15]} intensity={0.8} color="#ccaa88" />
            <pointLight position={[-15, 10, -15]} intensity={1.2} color="#FF9955" distance={80} decay={2} />
            <pointLight position={[15, 8, 10]} intensity={0.8} color="#FF7733" distance={60} decay={2} />
            <pointLight position={[0, 30, 0]} intensity={0.6} color="#aaccee" distance={100} decay={2} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
              <planeGeometry args={[250, 250]} />
              <meshStandardMaterial color="#1a1a22" roughness={0.9} />
            </mesh>

            <Buildings progress={progress} />
            <Camera progress={progress} />
          </Canvas>
        </div>
      )}

      {/* ── READY STATE: Static city + "Remove All Lifts" button ── */}
      {phase === 'ready' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <p className="font-display text-2xl md:text-4xl text-cream/60 italic mb-8 text-center px-6">
            This is the world we built.
          </p>
          <button
            onClick={handleRemoveLifts}
            className="group relative px-10 py-4 bg-rust/20 border-2 border-rust/50 text-cream/90 font-mono text-sm md:text-base tracking-[0.2em] uppercase
                     hover:bg-rust/30 hover:border-rust/70 transition-all duration-300 cursor-pointer"
          >
            <span className="relative z-10">Remove All Lifts</span>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-rust/10 blur-xl group-hover:bg-rust/20 transition-all duration-300" />
          </button>
        </div>
      )}

      {/* ── PLAYING / DONE: Overlay text ── */}
      {(phase === 'playing' || phase === 'done') && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-16 md:pb-24 pointer-events-none">
          <p
            className={`font-mono text-xs tracking-[0.3em] uppercase transition-opacity duration-700 text-cream/40 ${
              phase === 'done' ? 'animate-pulse' : ''
            }`}
          >
            {getOverlayText()}
          </p>
        </div>
      )}

      {/* Edge fades */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-abyss to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-abyss to-transparent z-10 pointer-events-none" />
    </section>
  );
}