"use client";

import dynamic from "next/dynamic";
import StartScreen from "./StartScreen";
import GameOverScreen from "./GameOverScreen";
import GameUI from "./GameUI";
import { GameStateProvider, useGameState } from "./hooks/useGameState";

const Game2DCanvas = dynamic(() => import("./Game2DCanvas"), { ssr: false });

function GameAppInner() {
  const { state } = useGameState();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a2e",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* CRT scanline overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 100,
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 3px)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Game container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 430,
          aspectRatio: `${400} / ${600}`,
          maxHeight: "100vh",
          border: "3px solid rgba(255,182,193,0.2)",
          boxShadow:
            "0 0 20px rgba(255,105,180,0.15), inset 0 0 20px rgba(0,0,0,0.2)",
          overflow: "hidden",
          background: "#FFF5F0",
        }}
      >
        {/* Canvas */}
        {state.phase === "playing" && <Game2DCanvas />}

        {/* Overlays */}
        {state.phase === "start" && <StartScreen />}
        {state.phase === "playing" && <GameUI />}
        {state.phase === "gameover" && <GameOverScreen />}
      </div>
    </div>
  );
}

export default function GameApp() {
  return (
    <GameStateProvider>
      <GameAppInner />
    </GameStateProvider>
  );
}
