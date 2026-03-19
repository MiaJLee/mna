"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ObstacleType } from "@/types/game";
import { GAME_CONFIG } from "./config/gameConfig";

interface ObstacleProps {
  type: ObstacleType;
  lane: number;
  z: number;
}

// 웨딩 케이크
function CakeObstacle() {
  return (
    <group>
      {/* 1층 */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.6, 0.65, 0.5, 12]} />
        <meshStandardMaterial color="#fff5ee" />
      </mesh>
      {/* 2층 */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.4, 12]} />
        <meshStandardMaterial color="#fff0f5" />
      </mesh>
      {/* 3층 */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.3, 12]} />
        <meshStandardMaterial color="#ffe4e1" />
      </mesh>
      {/* 토퍼 */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

// 의자
function ChairObstacle() {
  return (
    <group>
      {/* 좌석 */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.5]} />
        <meshStandardMaterial color="#deb887" />
      </mesh>
      {/* 다리 4개 */}
      {[
        [-0.25, 0, -0.2],
        [0.25, 0, -0.2],
        [-0.25, 0, 0.2],
        [0.25, 0, 0.2],
      ].map(([x, _, z], i) => (
        <mesh key={i} position={[x, 0.22, z]}>
          <cylinderGeometry args={[0.03, 0.03, 0.44, 6]} />
          <meshStandardMaterial color="#c4a882" />
        </mesh>
      ))}
      {/* 등받이 */}
      <mesh position={[0, 0.85, -0.22]}>
        <boxGeometry args={[0.55, 0.7, 0.04]} />
        <meshStandardMaterial color="#deb887" />
      </mesh>
    </group>
  );
}

// 꽃다발
function BouquetObstacle() {
  return (
    <group>
      {/* 줄기 */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.6, 8]} />
        <meshStandardMaterial color="#7a8b63" />
      </mesh>
      {/* 꽃들 */}
      {[
        [0, 0.85, 0],
        [0.2, 0.75, 0.1],
        [-0.2, 0.75, 0.1],
        [0.1, 0.75, -0.15],
        [-0.1, 0.75, -0.15],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ffb6c1" : "#ff9eb5"}
          />
        </mesh>
      ))}
    </group>
  );
}

// 선물 상자
function GiftObstacle() {
  return (
    <group>
      {/* 박스 */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>
      {/* 리본 (가로) */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.72, 0.12, 0.72]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
      {/* 리본 (세로) */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[0.12, 0.72, 0.72]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
      {/* 리본 매듭 */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#ff4500" />
      </mesh>
    </group>
  );
}

const OBSTACLE_COMPONENTS: Record<ObstacleType, React.FC> = {
  cake: CakeObstacle,
  chair: ChairObstacle,
  bouquet: BouquetObstacle,
  gift: GiftObstacle,
};

export default function Obstacle({ type, lane, z }: ObstacleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const Component = OBSTACLE_COMPONENTS[type];

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.set(
      lane * GAME_CONFIG.LANE_WIDTH,
      -0.5,
      z
    );
  });

  return (
    <group ref={groupRef}>
      <Component />
    </group>
  );
}
