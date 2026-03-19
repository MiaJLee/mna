"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GAME_CONFIG } from "./config/gameConfig";

interface CollectibleProps {
  lane: number;
  z: number;
}

export default function Collectible({ lane, z }: CollectibleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rotRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.position.set(
      lane * GAME_CONFIG.LANE_WIDTH,
      0.8 + Math.sin(Date.now() * 0.003) * 0.2,
      z
    );

    rotRef.current += delta * 3;
    groupRef.current.rotation.y = rotRef.current;
  });

  return (
    <group ref={groupRef}>
      {/* 하트 (두 구 + 원뿔로 근사) */}
      <mesh position={[-0.1, 0.1, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial
          color="#ff69b4"
          emissive="#ff1493"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[0.1, 0.1, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial
          color="#ff69b4"
          emissive="#ff1493"
          emissiveIntensity={0.4}
        />
      </mesh>
      <mesh position={[0, -0.08, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.22, 0.22, 0.15]} />
        <meshStandardMaterial
          color="#ff69b4"
          emissive="#ff1493"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}
