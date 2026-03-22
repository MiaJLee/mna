"use client";

import { useState } from "react";

const PARTICLE_COUNT = 25;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 5,
    driftX: (Math.random() - 0.5) * 60,
    driftY: -(Math.random() * 40 + 20),
    opacity: Math.random() * 0.5 + 0.2,
  }));
}

export default function Sparkles() {
  const [particles] = useState(generateParticles);

  return (
    <>
      <style>{`
        @keyframes sparkle-float {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          15% {
            opacity: var(--sparkle-opacity);
            transform: translate(
              calc(var(--drift-x) * 0.15),
              calc(var(--drift-y) * 0.15)
            ) scale(1);
          }
          50% {
            opacity: var(--sparkle-opacity);
          }
          100% {
            transform: translate(
              calc(var(--drift-x) * 1px),
              calc(var(--drift-y) * 1px)
            ) scale(0);
            opacity: 0;
          }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              "--drift-x": p.driftX,
              "--drift-y": p.driftY,
              "--sparkle-opacity": p.opacity,
              animation: `sparkle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
              boxShadow: `0 0 ${p.size * 2}px ${p.size}px rgba(255, 255, 255, ${p.opacity * 0.5})`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
