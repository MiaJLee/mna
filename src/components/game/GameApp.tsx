"use client";

import { Canvas } from "@react-three/fiber";
import GameScene from "./GameScene";
import GameUI from "./GameUI";
import StartScreen from "./StartScreen";
import GameOverScreen from "./GameOverScreen";
import { GameStateProvider, useGameState } from "./hooks/useGameState";

function GameAppInner() {
  const { state } = useGameState();

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-pink-50 via-rose-50 to-orange-50">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 55, near: 0.1, far: 100 }}
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#fce4ec"]} />
        <GameScene />
      </Canvas>

      {/* HTML UI 오버레이 */}
      {state.phase === "start" && <StartScreen />}
      {state.phase === "playing" && <GameUI />}
      {state.phase === "gameover" && <GameOverScreen />}
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
