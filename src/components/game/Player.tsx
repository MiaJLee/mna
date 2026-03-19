"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GAME_CONFIG } from "./config/gameConfig";

interface PlayerProps {
  lane: number;
  isJumping: boolean;
  jumpProgressRef: React.RefObject<number>;
}

export default function Player({ lane, isJumping, jumpProgressRef }: PlayerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bobRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // 레인 이동 (부드러운 보간)
    const targetX = lane * GAME_CONFIG.LANE_WIDTH;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      12 * delta
    );

    // 점프
    if (isJumping && jumpProgressRef.current !== undefined) {
      const jp = jumpProgressRef.current;
      groupRef.current.position.y =
        Math.sin(jp * Math.PI) * GAME_CONFIG.JUMP_HEIGHT;
    } else {
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        0,
        15 * delta
      );
    }

    // 달리기 바운스
    bobRef.current += delta * 12;
    const bob = Math.sin(bobRef.current) * 0.08;
    groupRef.current.position.y += bob;
  });

  return (
    <group ref={groupRef} position={[0, 0, GAME_CONFIG.PLAYER_Z]}>
      {/* 몸통 */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.3, 0.7, 8, 16]} />
        <meshStandardMaterial color="#f8b4b8" />
      </mesh>

      {/* 머리 */}
      <mesh position={[0, 1.65, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#fce4ec" />
      </mesh>

      {/* 눈 (왼쪽) */}
      <mesh position={[-0.1, 1.72, 0.22]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>

      {/* 눈 (오른쪽) */}
      <mesh position={[0.1, 1.72, 0.22]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>

      {/* 베일/리본 */}
      <mesh position={[0, 1.92, -0.05]} rotation={[0.3, 0, 0]}>
        <planeGeometry args={[0.5, 0.6]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 부케 (오른손) */}
      <group position={[0.35, 0.6, 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.06, 0.2, 8]} />
          <meshStandardMaterial color="#7a8b63" />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#ff9eb5" />
        </mesh>
      </group>
    </group>
  );
}
