"use client";

import { useGameState } from "./hooks/useGameState";

export default function GameOverScreen() {
  const { state, restart } = useGameState();
  const isNewHighScore = state.score >= state.highScore && state.score > 0;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="text-center px-6 max-w-[320px] w-full">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <p className="text-pink-300 text-lg mb-1">Game Over</p>

          {isNewHighScore && (
            <p className="text-yellow-300 text-xs animate-bounce mb-3">
              NEW HIGH SCORE!
            </p>
          )}

          <div className="space-y-4 my-6">
            <div>
              <p className="text-white/50 text-[10px] tracking-wider">
                FINAL SCORE
              </p>
              <p className="text-white font-mono text-3xl font-bold">
                {state.score.toLocaleString()}
              </p>
            </div>

            <div className="flex justify-center gap-6">
              <div>
                <p className="text-white/50 text-[10px] tracking-wider">
                  DISTANCE
                </p>
                <p className="text-white font-mono text-sm">
                  {Math.floor(state.distance)}m
                </p>
              </div>
              <div>
                <p className="text-white/50 text-[10px] tracking-wider">
                  BEST
                </p>
                <p className="text-white font-mono text-sm">
                  {state.highScore.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={restart}
              className="w-full bg-pink-400/80 hover:bg-pink-500 text-white py-3 rounded-full text-sm transition-colors shadow-lg"
            >
              Play Again
            </button>

            <a
              href="?"
              className="block w-full bg-white/10 hover:bg-white/20 text-white/80 py-3 rounded-full text-sm transition-colors"
            >
              Back to Invitation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
