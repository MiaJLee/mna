"use client";

import { useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import Player from "./Player";
import Ground from "./Ground";
import Obstacle from "./Obstacle";
import Collectible from "./Collectible";
import { useGameState } from "./hooks/useGameState";
import { usePlayerControls } from "./hooks/usePlayerControls";
import { useObstacleSpawner } from "./hooks/useObstacleSpawner";
import { GAME_CONFIG } from "./config/gameConfig";

export default function GameScene() {
  const { state, tick, addScore, gameOver } = useGameState();
  const isPlaying = state.phase === "playing";
  const { lane, isJumping, jumpProgressRef } = usePlayerControls(isPlaying);
  const { obstaclesRef, collectiblesRef, update: updateSpawner, reset } = useObstacleSpawner();

  const onCollision = useCallback(() => {
    gameOver();
  }, [gameOver]);

  const onCollect = useCallback(() => {
    addScore(GAME_CONFIG.HEART_SCORE);
  }, [addScore]);

  useFrame((_, delta) => {
    if (state.phase !== "playing") return;

    // 프레임 제한 (큰 delta 방지)
    const clampedDelta = Math.min(delta, 0.05);

    tick(clampedDelta);

    // 플레이어 Y 위치 계산
    const playerY = isJumping
      ? Math.sin((jumpProgressRef.current ?? 0) * Math.PI) * GAME_CONFIG.JUMP_HEIGHT
      : 0;

    updateSpawner(
      clampedDelta,
      state.speed,
      state.distance,
      lane,
      playerY,
      onCollision,
      onCollect
    );
  });

  // 게임 리셋 시 장애물 초기화
  if (state.phase === "start") {
    reset();
  }

  return (
    <>
      {/* 조명 */}
      <ambientLight intensity={0.65} color="#fff5e6" />
      <directionalLight
        position={[5, 12, 8]}
        intensity={1.1}
        color="#ffe4c4"
        castShadow={false}
      />
      <directionalLight position={[-3, 8, -5]} intensity={0.3} color="#e8c4f0" />

      {/* 안개 */}
      <fog attach="fog" args={["#fce4ec", 15, 70]} />

      {/* 바닥 */}
      <Ground speed={state.speed} isPlaying={isPlaying} />

      {/* 플레이어 */}
      <Player lane={lane} isJumping={isJumping} jumpProgressRef={jumpProgressRef} />

      {/* 장애물 */}
      {obstaclesRef.current.map((obs) => (
        <Obstacle key={obs.id} type={obs.type} lane={obs.lane} z={obs.z} />
      ))}

      {/* 수집품 */}
      {collectiblesRef.current
        .filter((c) => !c.collected)
        .map((col) => (
          <Collectible key={col.id} lane={col.lane} z={col.z} />
        ))}

      {/* 배경 장식 - 꽃 아치 (양쪽) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <group key={`arch-${i}`}>
          <mesh position={[-5, 1.5, -i * 12 - 5]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial color="#d4a8c8" transparent opacity={0.6} />
          </mesh>
          <mesh position={[5, 1.5, -i * 12 - 5]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial color="#b8d4a8" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </>
  );
}
