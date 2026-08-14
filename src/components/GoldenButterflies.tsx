import React, { useEffect, useState } from 'react';

interface Butterfly {
  id: number;
  x: number; // percentage of viewport width
  y: number; // percentage of viewport height
  vx: number; // velocity x
  vy: number; // velocity y
  scale: number;
  rotation: number;
  flapSpeed: number;
  opacity: number;
  wobbleFreq: number;
  wobbleAmp: number;
  life: number;
  maxLife: number;
}

interface GoldenButterfliesProps {
  active: boolean;
  count?: number;
}

export const GoldenButterflies: React.FC<GoldenButterfliesProps> = ({ active, count = 28 }) => {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    if (!active) {
      setButterflies([]);
      return;
    }

    // Generate butterflies spreading outwards in ALL directions (360 degrees) across the entire screen
    const newButterflies: Butterfly[] = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2); // 360 degree radial spread
      const speed = 12 + Math.random() * 22; // speed factor
      const maxLife = 4 + Math.random() * 3.5; // seconds

      return {
        id: Date.now() + i + Math.random(),
        x: 50 + (Math.random() * 20 - 10), // start near screen center
        y: 50 + (Math.random() * 20 - 10),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        scale: 0.5 + Math.random() * 0.7,
        rotation: (angle * 180) / Math.PI + 90,
        flapSpeed: 0.18 + Math.random() * 0.15,
        opacity: 0,
        wobbleFreq: 2 + Math.random() * 3,
        wobbleAmp: 8 + Math.random() * 12,
        life: 0,
        maxLife,
      };
    });

    setButterflies(newButterflies);

    let animFrame: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      setButterflies((prev) =>
        prev
          .map((b) => {
            const newLife = b.life + delta;
            if (newLife >= b.maxLife) return null;

            // Smooth fade in at start, fade out near end
            let opacity = 1;
            if (newLife < 0.5) {
              opacity = newLife / 0.5;
            } else if (newLife > b.maxLife - 1) {
              opacity = (b.maxLife - newLife) / 1;
            }

            // Organic sinusoidal curvature trajectory
            const wobble = Math.sin(newLife * b.wobbleFreq) * b.wobbleAmp * delta;
            const curVx = b.vx + Math.cos(newLife * 2) * 2;
            const curVy = b.vy + Math.sin(newLife * 2) * 2;

            const nextX = b.x + (curVx + wobble) * delta;
            const nextY = b.y + (curVy - wobble) * delta;

            // Calculate rotation angle matching velocity direction
            const moveAngle = Math.atan2(curVy, curVx) * (180 / Math.PI) + 90;

            return {
              ...b,
              x: nextX,
              y: nextY,
              rotation: moveAngle,
              life: newLife,
              opacity: Math.max(0, Math.min(1, opacity)),
            };
          })
          .filter((b): b is Butterfly => b !== null)
      );

      animFrame = requestAnimationFrame(loop);
    };

    animFrame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animFrame);
  }, [active, count]);

  if (!active || butterflies.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Multi-stage Gold Metal Gradient */}
          <linearGradient id="gildedGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="30%" stopColor="#F3D068" />
            <stop offset="65%" stopColor="#D4AF37" />
            <stop offset="90%" stopColor="#997018" />
            <stop offset="100%" stopColor="#FFEAA5" />
          </linearGradient>

          <linearGradient id="translucentWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8D6" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B3861B" stopOpacity="0.75" />
          </linearGradient>

          <radialGradient id="wingGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFEAA5" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>

          <filter id="goldShimmer" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>

      {butterflies.map((b) => (
        <div
          key={b.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            opacity: b.opacity,
            transform: `translate(-50%, -50%) rotate(${b.rotation}deg) scale(${b.scale})`,
          }}
        >
          {/* Realistic Wing Flapping Container */}
          <div
            className="relative w-12 h-12 flex items-center justify-center filter drop-shadow-[0_0_10px_rgba(212,175,55,0.85)]"
          >
            <div className="relative w-full h-full">
              {/* Detailed SVG Butterfly */}
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Ambient Wing Glow Halo */}
                <circle cx="60" cy="60" r="45" fill="url(#wingGlow)" />

                {/* Left Forewing with Lace Filigree */}
                <g className="animate-butterfly-flap origin-center">
                  {/* Outer Wing Shape */}
                  <path
                    d="M 60 55 C 40 15, 5 25, 12 60 C 18 78, 45 82, 58 62 Z"
                    fill="url(#translucentWingGrad)"
                    stroke="url(#gildedGoldGrad)"
                    strokeWidth="1.5"
                    filter="url(#goldShimmer)"
                  />
                  {/* Detailed Lace Veins */}
                  <path d="M 58 60 Q 35 38 20 32" stroke="#FFF8D6" strokeWidth="0.8" fill="none" opacity="0.8" />
                  <path d="M 58 60 Q 30 50 16 55" stroke="#FFF8D6" strokeWidth="0.8" fill="none" opacity="0.8" />
                  <path d="M 58 60 Q 38 68 28 72" stroke="#FFF8D6" strokeWidth="0.8" fill="none" opacity="0.8" />
                  {/* Gold Edging Pearls */}
                  <circle cx="15" cy="35" r="1.5" fill="#FFF8D6" />
                  <circle cx="10" cy="48" r="1.5" fill="#FFF8D6" />
                  <circle cx="14" cy="62" r="1.5" fill="#FFF8D6" />

                  {/* Left Hindwing with Elegant Swallowtail Extension */}
                  <path
                    d="M 58 62 C 38 68, 22 82, 32 102 C 38 112, 45 118, 48 108 C 50 102, 54 80, 58 66 Z"
                    fill="url(#translucentWingGrad)"
                    stroke="url(#gildedGoldGrad)"
                    strokeWidth="1.2"
                  />
                  <path d="M 58 66 Q 38 85 36 100" stroke="#FFF8D6" strokeWidth="0.7" fill="none" opacity="0.7" />
                  <circle cx="36" cy="102" r="1.2" fill="#FFF8D6" />
                </g>

                {/* Right Forewing with Lace Filigree */}
                <g className="animate-butterfly-flap origin-center">
                  {/* Outer Wing Shape */}
                  <path
                    d="M 60 55 C 80 15, 115 25, 108 60 C 102 78, 75 82, 62 62 Z"
                    fill="url(#translucentWingGrad)"
                    stroke="url(#gildedGoldGrad)"
                    strokeWidth="1.5"
                    filter="url(#goldShimmer)"
                  />
                  {/* Detailed Lace Veins */}
                  <path d="M 62 60 Q 85 38 100 32" stroke="#FFF8D6" strokeWidth="0.8" fill="none" opacity="0.8" />
                  <path d="M 62 60 Q 90 50 104 55" stroke="#FFF8D6" strokeWidth="0.8" fill="none" opacity="0.8" />
                  <path d="M 62 60 Q 82 68 92 72" stroke="#FFF8D6" strokeWidth="0.8" fill="none" opacity="0.8" />
                  {/* Gold Edging Pearls */}
                  <circle cx="105" cy="35" r="1.5" fill="#FFF8D6" />
                  <circle cx="110" cy="48" r="1.5" fill="#FFF8D6" />
                  <circle cx="106" cy="62" r="1.5" fill="#FFF8D6" />

                  {/* Right Hindwing with Elegant Swallowtail Extension */}
                  <path
                    d="M 62 62 C 82 68, 98 82, 88 102 C 82 112, 75 118, 72 108 C 70 102, 66 80, 62 66 Z"
                    fill="url(#translucentWingGrad)"
                    stroke="url(#gildedGoldGrad)"
                    strokeWidth="1.2"
                  />
                  <path d="M 62 66 Q 82 85 84 100" stroke="#FFF8D6" strokeWidth="0.7" fill="none" opacity="0.7" />
                  <circle cx="84" cy="102" r="1.2" fill="#FFF8D6" />
                </g>

                {/* Elegant Slender Body & Curled Antennae */}
                <ellipse cx="60" cy="62" rx="2.5" ry="18" fill="#3D2906" stroke="url(#gildedGoldGrad)" strokeWidth="1" />
                <circle cx="60" cy="42" r="3" fill="#D4AF37" />

                {/* Curved Filigree Antennae */}
                <path d="M 60 41 Q 50 28 42 22 C 40 20, 38 23, 41 25" fill="none" stroke="#FFEAA5" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M 60 41 Q 70 28 78 22 C 80 20, 82 23, 79 25" fill="none" stroke="#FFEAA5" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

