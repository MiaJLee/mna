"use client";

import { useRef, useCallback } from "react";
import type { ObstacleData, CollectibleData, ObstacleType } from "@/types/game";
import { GAME_CONFIG } from "../config/gameConfig";

const OBSTACLE_TYPES: ObstacleType[] = ["cake", "bouquet", "chair", "gift"];

let nextId = 0;
function genId() {
  return `obj_${nextId++}`;
}

export function useObstacleSpawner() {
  const obstaclesRef = useRef<ObstacleData[]>([]);
  const collectiblesRef = useRef<CollectibleData[]>([]);
  const spawnTimerRef = useRef(0);

  const reset = useCallback(() => {
    obstaclesRef.current = [];
    collectiblesRef.current = [];
    spawnTimerRef.current = 0;
  }, []);

  const update = useCallback(
    (
      delta: number,
      speed: number,
      distance: number,
      playerLane: number,
      playerY: number,
      onCollision: () => void,
      onCollect: () => void
    ) => {
      // 오브젝트 이동 (플레이어 방향으로)
      for (const obs of obstaclesRef.current) {
        obs.z += speed * delta;
      }
      for (const col of collectiblesRef.current) {
        col.z += speed * delta;
      }

      // 스폰 간격 (거리에 따라 감소)
      const spawnInterval = Math.max(
        GAME_CONFIG.OBSTACLE_SPAWN_INTERVAL - distance * 0.003,
        GAME_CONFIG.MIN_SPAWN_INTERVAL
      );

      spawnTimerRef.current += delta;
      if (spawnTimerRef.current >= spawnInterval) {
        spawnTimerRef.current = 0;

        const lane =
          GAME_CONFIG.LANES[Math.floor(Math.random() * GAME_CONFIG.LANES.length)];
        const type =
          OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];

        obstaclesRef.current.push({
          id: genId(),
          type,
          lane,
          z: GAME_CONFIG.SPAWN_Z,
        });

        // 수집품 (다른 레인에)
        if (Math.random() < GAME_CONFIG.COLLECTIBLE_SPAWN_CHANCE) {
          const availableLanes = GAME_CONFIG.LANES.filter((l) => l !== lane);
          const colLane =
            availableLanes[Math.floor(Math.random() * availableLanes.length)];
          collectiblesRef.current.push({
            id: genId(),
            lane: colLane,
            z: GAME_CONFIG.SPAWN_Z,
            collected: false,
          });
        }
      }

      // 충돌 감지 - 장애물
      for (const obs of obstaclesRef.current) {
        const obsX = obs.lane * GAME_CONFIG.LANE_WIDTH;
        const playerX = playerLane * GAME_CONFIG.LANE_WIDTH;

        if (
          Math.abs(obs.z - GAME_CONFIG.PLAYER_Z) <
            GAME_CONFIG.COLLISION_THRESHOLD_Z &&
          Math.abs(obsX - playerX) < GAME_CONFIG.COLLISION_THRESHOLD_X &&
          playerY < 1.2
        ) {
          onCollision();
          return;
        }
      }

      // 충돌 감지 - 수집품
      for (const col of collectiblesRef.current) {
        if (col.collected) continue;
        const colX = col.lane * GAME_CONFIG.LANE_WIDTH;
        const playerX = playerLane * GAME_CONFIG.LANE_WIDTH;

        if (
          Math.abs(col.z - GAME_CONFIG.PLAYER_Z) <
            GAME_CONFIG.COLLISION_THRESHOLD_Z &&
          Math.abs(colX - playerX) < GAME_CONFIG.COLLISION_THRESHOLD_X
        ) {
          col.collected = true;
          onCollect();
        }
      }

      // 지나간 오브젝트 정리
      obstaclesRef.current = obstaclesRef.current.filter(
        (o) => o.z < GAME_CONFIG.DESPAWN_Z
      );
      collectiblesRef.current = collectiblesRef.current.filter(
        (c) => c.z < GAME_CONFIG.DESPAWN_Z && !c.collected
      );
    },
    []
  );

  return { obstaclesRef, collectiblesRef, update, reset };
}
