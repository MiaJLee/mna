"use client";

import { useState } from "react";

/** 밀도 유지 + 층별 밝기 비율 고정 (~30% 어두움 / ~42% 중간 / ~28% 밝음) */
const PARTICLE_COUNT = 40;

/** 가로 3 × 세로 2 그리드에서 하단 중앙 칸(이름·일시 등 텍스트 구역) 제외 */
const GRID_COLS = 3;
const GRID_ROWS = 2;
const LEFT_BOUND = 100 / GRID_COLS;
const RIGHT_BOUND = (200 / GRID_COLS);
const BOTTOM_ROW_TOP = 100 / GRID_ROWS;

function isInBottomCenterCell(leftPct: number, topPct: number): boolean {
  return (
    topPct >= BOTTOM_ROW_TOP &&
    leftPct >= LEFT_BOUND &&
    leftPct < RIGHT_BOUND
  );
}

function samplePositionOutsideExclusion(): { left: string; top: string } {
  for (let attempt = 0; attempt < 100; attempt++) {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    if (!isInBottomCenterCell(left, top)) {
      return { left: `${left}%`, top: `${top}%` };
    }
  }
  // 상단 반(또는 좌·우 하단 열)으로 안전하게
  const top = Math.random() * BOTTOM_ROW_TOP;
  return { left: `${Math.random() * 100}%`, top: `${top}%` };
}

type BrightnessTier = "dim" | "mid" | "bright";

function pickTier(): BrightnessTier {
  const roll = Math.random();
  if (roll < 0.3) return "dim";
  if (roll < 0.72) return "mid";
  return "bright";
}

/** 티어마다 다른 min~max → 펄스해도 밝은 입자는 항상 상대적으로 밝게 유지 */
function opacityRangeForTier(tier: BrightnessTier): { min: number; max: number } {
  if (tier === "dim") {
    const min = Math.random() * 0.1 + 0.06;
    const spread = Math.random() * 0.14 + 0.1;
    return { min, max: Math.min(0.34, min + spread) };
  }
  if (tier === "mid") {
    const min = Math.random() * 0.1 + 0.28;
    const spread = Math.random() * 0.16 + 0.12;
    return { min, max: Math.min(0.66, min + spread) };
  }
  const min = Math.random() * 0.12 + 0.5;
  const spread = Math.random() * 0.22 + 0.18;
  return { min, max: Math.min(1, min + spread) };
}

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const tier = pickTier();
    const { min: opacityMin, max: opacityMax } = opacityRangeForTier(tier);
    const dim = tier === "dim";
    const opacityMid = (opacityMin + opacityMax) / 2;
    const { left, top } = samplePositionOutsideExclusion();
    return {
      id: i,
      left,
      top,
      size: (Math.random() * 1.1 + 0.55) * (dim ? 0.85 : 1),
      duration: Math.random() * 2.5 + 4,
      delay: Math.random() * 4,
      driftX: (Math.random() - 0.5) * 50,
      driftY: -(Math.random() * 32 + 14),
      opacityMin,
      opacityMax,
      opacityMid,
    };
  });
}

export default function Sparkles() {
  const [particles] = useState(generateParticles);

  return (
    <>
      <style>{`
        /* 티어별 opacity 구간 → 전체가 동시에 어두워지지 않음, 밝은 입자 비율 유지 */
        @keyframes sparkle-float {
          0%,
          100% {
            transform: translate(0, 0) scale(0.92);
            opacity: var(--opacity-min);
          }
          50% {
            transform: translate(
              calc(var(--drift-x) * 0.45px),
              calc(var(--drift-y) * 0.45px)
            )
              scale(1);
            opacity: var(--opacity-max);
          }
        }
      `}</style>
      {/* 어두운 그라데이션 위에서 빛이 더 살아나도록 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white will-change-transform"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              "--opacity-min": p.opacityMin,
              "--opacity-max": p.opacityMax,
              "--drift-x": p.driftX,
              "--drift-y": p.driftY,
              animation: `sparkle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
              boxShadow: `0 0 ${p.size * 3}px ${p.size * 1.25}px rgba(255, 255, 255, ${Math.min(0.85, p.opacityMid * 0.9 + 0.18)})`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
