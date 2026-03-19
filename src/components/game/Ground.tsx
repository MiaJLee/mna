"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GAME_CONFIG } from "./config/gameConfig";

interface GroundProps {
  speed: number;
  isPlaying: boolean;
}

export default function Ground({ speed, isPlaying }: GroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offsetRef = useRef(0);

  // 체커보드 텍스처 생성
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;

    // 베이지 배경
    ctx.fillStyle = "#f5e6d3";
    ctx.fillRect(0, 0, 128, 128);

    // 부드러운 라인 패턴
    ctx.strokeStyle = "#e8dfd3";
    ctx.lineWidth = 1;

    // 가로선
    for (let y = 0; y < 128; y += 16) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(128, y);
      ctx.stroke();
    }

    // 중앙 레인 표시
    ctx.strokeStyle = "#d1c4b0";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(32, 0);
    ctx.lineTo(32, 128);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(96, 0);
    ctx.lineTo(96, 128);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 20);
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!isPlaying || !meshRef.current) return;

    offsetRef.current += speed * delta * 0.08;
    texture.offset.set(0, offsetRef.current);
  });

  // 사이드 데코 (꽃 줄)
  const laneWidth = GAME_CONFIG.LANE_WIDTH;

  return (
    <group>
      {/* 메인 바닥 */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, -30]}
      >
        <planeGeometry args={[laneWidth * 3.5, 100]} />
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      {/* 왼쪽 가장자리 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-laneWidth * 2, -0.48, -30]}
      >
        <planeGeometry args={[1, 100]} />
        <meshStandardMaterial color="#95a37d" opacity={0.6} transparent />
      </mesh>

      {/* 오른쪽 가장자리 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[laneWidth * 2, -0.48, -30]}
      >
        <planeGeometry args={[1, 100]} />
        <meshStandardMaterial color="#95a37d" opacity={0.6} transparent />
      </mesh>
    </group>
  );
}
