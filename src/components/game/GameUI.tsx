"use client";

import { useGameState } from "./hooks/useGameState";

export default function GameUI() {
  const { state } = useGameState();

  return (
    <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
      <div className="flex justify-between items-start px-4 py-3 md:px-6 md:py-4">
        {/* 점수 */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2">
          <p className="text-white/60 text-[9px] tracking-wider">SCORE</p>
          <p className="text-white font-mono text-lg font-bold">
            {Math.floor(state.score + state.distance).toLocaleString()}
          </p>
        </div>

        {/* 거리 */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2 text-right">
          <p className="text-white/60 text-[9px] tracking-wider">DISTANCE</p>
          <p className="text-white font-mono text-lg font-bold">
            {Math.floor(state.distance)}m
          </p>
        </div>
      </div>

      {/* 하트 수집 표시 */}
      {state.score > 0 && (
        <div className="flex justify-center">
          <div className="bg-pink-500/30 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-pink-200 text-xs">
              ♥ {Math.floor(state.score / 100)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
