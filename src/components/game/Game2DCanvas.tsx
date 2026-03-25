"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { useGameState } from "./hooks/useGameState";
import { GAME_CONFIG } from "./config/gameConfig";
import type { ObstacleData, CollectibleData } from "@/types/game";

const P = GAME_CONFIG.PIXEL_SIZE;

// ── Colors ──────────────────────────────────────
const COLORS = {
  sky1: "#FFF5F0",
  sky2: "#FFE4E1",
  grassTop: "#8B9A6B",
  grassBody: "#7A8B5C",
  dirt: "#6B5B4B",
  cloud: "#FFFFFF",
  cloudShadow: "#FFE8E8",
  flowerPink: "#FFB6C1",
  flowerYellow: "#FFD700",
  playerDress: "#FFB6C1",
  playerDressShade: "#F092A0",
  playerSkin: "#FFDAB9",
  playerHair: "#4A3728",
  playerVeil: "#FFFFFF",
  playerVeilShade: "#F0E8E0",
  playerEye: "#333333",
  playerLip: "#FF69B4",
  heart: "#FF69B4",
  heartShade: "#FF1493",
  cakePink: "#FFB6C1",
  cakeWhite: "#FFFFFF",
  cakeCherry: "#FF4060",
  giftGold: "#FFD700",
  giftOrange: "#FF8C00",
  giftRibbon: "#FF4500",
  chairBrown: "#8B6914",
  chairDark: "#A0522D",
  chairSeat: "#C4A35A",
};

// ── Particle type ───────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

// ── Draw helpers ────────────────────────────────
function drawPixelRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}

// ── Draw background ─────────────────────────────
function drawBackground(
  ctx: CanvasRenderingContext2D,
  scrollOffset: number,
  canvasW: number,
  canvasH: number
) {
  // Sky gradient (banded for pixel feel)
  const groundY = GAME_CONFIG.GROUND_Y;
  const bandH = 20;
  for (let y = 0; y < groundY; y += bandH) {
    const t = y / groundY;
    const r = Math.round(255 - t * 10);
    const g = Math.round(245 - t * 20);
    const b = Math.round(240 - t * 15);
    drawPixelRect(ctx, 0, y, canvasW, bandH, `rgb(${r},${g},${b})`);
  }

  // Clouds (parallax - slow)
  const cloudSpeed = scrollOffset * 0.2;
  const cloudPositions = [
    { x: 60, y: 40, w: 48 },
    { x: 200, y: 70, w: 36 },
    { x: 340, y: 30, w: 44 },
    { x: 500, y: 60, w: 40 },
    { x: 650, y: 45, w: 52 },
  ];
  for (const cloud of cloudPositions) {
    const cx = ((cloud.x - cloudSpeed) % (canvasW + 100) + canvasW + 100) % (canvasW + 100) - 50;
    drawCloud(ctx, cx, cloud.y, cloud.w);
  }

  // Distant hills (parallax - medium)
  const hillOffset = scrollOffset * 0.4;
  for (let i = 0; i < canvasW + 200; i += 120) {
    const hx = ((i - hillOffset) % (canvasW + 200) + canvasW + 200) % (canvasW + 200) - 100;
    drawPixelRect(ctx, hx, groundY - 24, 80, 24, "#D4DCC4");
    drawPixelRect(ctx, hx + 8, groundY - 36, 64, 12, "#DDE5CD");
    drawPixelRect(ctx, hx + 20, groundY - 44, 40, 8, "#E6EDD8");
  }

  // Ground
  drawPixelRect(ctx, 0, groundY, canvasW, 4, COLORS.grassTop);
  drawPixelRect(ctx, 0, groundY + 4, canvasW, 8, COLORS.grassBody);
  drawPixelRect(ctx, 0, groundY + 12, canvasW, canvasH - groundY - 12, COLORS.dirt);

  // Grass tufts
  const grassOffset = scrollOffset * 1.0;
  for (let i = 0; i < canvasW + 40; i += 24) {
    const gx = ((i - grassOffset) % (canvasW + 40) + canvasW + 40) % (canvasW + 40) - 20;
    drawPixelRect(ctx, gx, groundY - 4, P, P, COLORS.grassTop);
    drawPixelRect(ctx, gx + 8, groundY - 8, P, 2 * P, COLORS.grassTop);
    drawPixelRect(ctx, gx + 16, groundY - 4, P, P, COLORS.grassBody);
  }

  // Small flowers
  const flowerOffset = scrollOffset * 0.8;
  const flowerPositions = [30, 90, 170, 250, 310, 380, 450, 530];
  for (let i = 0; i < flowerPositions.length; i++) {
    const fx =
      ((flowerPositions[i] - flowerOffset) % (canvasW + 60) + canvasW + 60) %
        (canvasW + 60) - 30;
    const fc = i % 2 === 0 ? COLORS.flowerPink : COLORS.flowerYellow;
    drawPixelRect(ctx, fx, groundY - 4, P, P, "#6B8B4B");
    drawPixelRect(ctx, fx - 2, groundY - 8, P, P, fc);
    drawPixelRect(ctx, fx + 2, groundY - 8, P, P, fc);
    drawPixelRect(ctx, fx, groundY - 10, P, P, fc);
    drawPixelRect(ctx, fx, groundY - 6, P, P, fc);
    drawPixelRect(ctx, fx, groundY - 8, 2, 2, "#FFE066");
  }
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
  const h = w * 0.4;
  const s = P * 2;
  // Shadow
  drawPixelRect(ctx, x + 2, y + 2, w, h, COLORS.cloudShadow);
  // Main
  drawPixelRect(ctx, x + s, y, w - s * 2, h, COLORS.cloud);
  drawPixelRect(ctx, x, y + s, w, h - s * 2, COLORS.cloud);
  // Top bumps
  drawPixelRect(ctx, x + w * 0.2, y - s, w * 0.3, s, COLORS.cloud);
  drawPixelRect(ctx, x + w * 0.5, y - s * 0.5, w * 0.25, s * 0.5, COLORS.cloud);
}

// ── Draw player ─────────────────────────────────
function drawPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number,
  isJumping: boolean,
  character: "bride" | "groom" = "bride"
) {
  if (character === "groom") {
    drawGroom(ctx, x, y, frame, isJumping);
    return;
  }
  const pw = GAME_CONFIG.PLAYER_WIDTH;
  const ph = GAME_CONFIG.PLAYER_HEIGHT;
  const bx = x;
  const by = y;

  // Veil (top)
  drawPixelRect(ctx, bx + 8, by - 4, 16, 4, COLORS.playerVeil);
  drawPixelRect(ctx, bx + 20, by - 2, 8, 8, COLORS.playerVeilShade);
  drawPixelRect(ctx, bx + 24, by + 4, 6, 6, COLORS.playerVeil);

  // Hair
  drawPixelRect(ctx, bx + 8, by, 16, 8, COLORS.playerHair);
  drawPixelRect(ctx, bx + 4, by + 4, 4, 8, COLORS.playerHair);

  // Head (skin)
  drawPixelRect(ctx, bx + 8, by + 8, 16, 12, COLORS.playerSkin);

  // Eyes
  drawPixelRect(ctx, bx + 12, by + 12, 3, 3, COLORS.playerEye);
  drawPixelRect(ctx, bx + 19, by + 12, 3, 3, COLORS.playerEye);
  // Eye shine
  drawPixelRect(ctx, bx + 13, by + 12, 1, 1, "#FFFFFF");
  drawPixelRect(ctx, bx + 20, by + 12, 1, 1, "#FFFFFF");

  // Blush
  drawPixelRect(ctx, bx + 10, by + 16, 3, 2, "#FFB0B0");
  drawPixelRect(ctx, bx + 20, by + 16, 3, 2, "#FFB0B0");

  // Mouth
  drawPixelRect(ctx, bx + 15, by + 17, 3, 1, COLORS.playerLip);

  // Body (white top)
  drawPixelRect(ctx, bx + 8, by + 20, 16, 8, "#FFFFFF");
  drawPixelRect(ctx, bx + 6, by + 22, 4, 6, "#FFFFFF"); // left arm area

  // Dress (pink bottom) - wider
  drawPixelRect(ctx, bx + 4, by + 28, 24, 12, COLORS.playerDress);
  drawPixelRect(ctx, bx + 2, by + 32, 28, 8, COLORS.playerDress);
  // Dress shade
  drawPixelRect(ctx, bx + 4, by + 36, 4, 4, COLORS.playerDressShade);
  drawPixelRect(ctx, bx + 24, by + 36, 4, 4, COLORS.playerDressShade);

  // Arms
  const armSwing = isJumping ? -4 : Math.sin(frame * 0.3) * 3;
  drawPixelRect(ctx, bx + 2, by + 22 + armSwing, 4, 8, COLORS.playerSkin);
  drawPixelRect(ctx, bx + pw - 2, by + 22 - armSwing, 4, 8, COLORS.playerSkin);

  // Legs / feet
  if (isJumping) {
    // Tucked legs
    drawPixelRect(ctx, bx + 8, by + 40, 6, 6, COLORS.playerSkin);
    drawPixelRect(ctx, bx + 18, by + 40, 6, 6, COLORS.playerSkin);
    // Shoes
    drawPixelRect(ctx, bx + 8, by + 44, 6, 4, "#FFFFFF");
    drawPixelRect(ctx, bx + 18, by + 44, 6, 4, "#FFFFFF");
  } else {
    // Running animation - alternate legs
    const legPhase = Math.floor(frame * 0.2) % 2;
    const leftLegX = legPhase === 0 ? -2 : 2;
    const rightLegX = legPhase === 0 ? 2 : -2;
    drawPixelRect(ctx, bx + 10 + leftLegX, by + 40, 5, 6, COLORS.playerSkin);
    drawPixelRect(ctx, bx + 18 + rightLegX, by + 40, 5, 6, COLORS.playerSkin);
    // Shoes
    drawPixelRect(ctx, bx + 9 + leftLegX, by + 44, 7, 4, "#FFFFFF");
    drawPixelRect(ctx, bx + 17 + rightLegX, by + 44, 7, 4, "#FFFFFF");
  }
}

// ── Draw groom ──────────────────────────────────
function drawGroom(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number,
  isJumping: boolean
) {
  const pw = GAME_CONFIG.PLAYER_WIDTH;
  const bx = x;
  const by = y;

  // Hat
  drawPixelRect(ctx, bx + 8, by - 4, 16, 4, "#2C2C2C");
  drawPixelRect(ctx, bx + 4, by, 24, 4, "#1a1a1a");

  // Hair
  drawPixelRect(ctx, bx + 8, by + 4, 16, 6, "#3A2A1A");

  // Head (skin)
  drawPixelRect(ctx, bx + 8, by + 8, 16, 12, COLORS.playerSkin);

  // Eyes
  drawPixelRect(ctx, bx + 12, by + 12, 3, 3, COLORS.playerEye);
  drawPixelRect(ctx, bx + 19, by + 12, 3, 3, COLORS.playerEye);
  drawPixelRect(ctx, bx + 13, by + 12, 1, 1, "#FFFFFF");
  drawPixelRect(ctx, bx + 20, by + 12, 1, 1, "#FFFFFF");

  // Mouth
  drawPixelRect(ctx, bx + 15, by + 17, 3, 1, "#CC8888");

  // Shirt (white) + tie
  drawPixelRect(ctx, bx + 8, by + 20, 16, 4, "#FFFFFF");
  drawPixelRect(ctx, bx + 14, by + 20, 4, 8, "#333333");

  // Suit jacket
  drawPixelRect(ctx, bx + 6, by + 24, 20, 12, "#2C2C2C");
  drawPixelRect(ctx, bx + 12, by + 24, 8, 12, "#1a1a1a");

  // Arms
  const armSwing = isJumping ? -4 : Math.sin(frame * 0.3) * 3;
  drawPixelRect(ctx, bx + 2, by + 24 + armSwing, 4, 10, "#2C2C2C");
  drawPixelRect(ctx, bx + 2, by + 32 + armSwing, 4, 3, COLORS.playerSkin);
  drawPixelRect(ctx, bx + pw - 2, by + 24 - armSwing, 4, 10, "#2C2C2C");
  drawPixelRect(ctx, bx + pw - 2, by + 32 - armSwing, 4, 3, COLORS.playerSkin);

  // Pants
  drawPixelRect(ctx, bx + 8, by + 36, 16, 6, "#1a1a1a");

  // Legs / shoes
  if (isJumping) {
    drawPixelRect(ctx, bx + 8, by + 42, 6, 4, "#1a1a1a");
    drawPixelRect(ctx, bx + 18, by + 42, 6, 4, "#1a1a1a");
    drawPixelRect(ctx, bx + 8, by + 44, 6, 4, "#333333");
    drawPixelRect(ctx, bx + 18, by + 44, 6, 4, "#333333");
  } else {
    const legPhase = Math.floor(frame * 0.2) % 2;
    const leftLegX = legPhase === 0 ? -2 : 2;
    const rightLegX = legPhase === 0 ? 2 : -2;
    drawPixelRect(ctx, bx + 10 + leftLegX, by + 42, 5, 4, "#1a1a1a");
    drawPixelRect(ctx, bx + 18 + rightLegX, by + 42, 5, 4, "#1a1a1a");
    drawPixelRect(ctx, bx + 9 + leftLegX, by + 44, 7, 4, "#333333");
    drawPixelRect(ctx, bx + 17 + rightLegX, by + 44, 7, 4, "#333333");
  }
}

// ── Draw obstacle ───────────────────────────────
function drawObstacle(ctx: CanvasRenderingContext2D, obs: ObstacleData) {
  const { x, y, type } = obs;

  switch (type) {
    case "cake": {
      // 3-tier cake
      // Bottom tier
      drawPixelRect(ctx, x, y + 24, 36, 12, COLORS.cakeWhite);
      drawPixelRect(ctx, x + 2, y + 24, 32, 2, COLORS.cakePink);
      // Middle tier
      drawPixelRect(ctx, x + 6, y + 12, 24, 12, COLORS.cakeWhite);
      drawPixelRect(ctx, x + 8, y + 12, 20, 2, COLORS.cakePink);
      // Top tier
      drawPixelRect(ctx, x + 12, y + 4, 12, 8, COLORS.cakeWhite);
      drawPixelRect(ctx, x + 14, y + 4, 8, 2, COLORS.cakePink);
      // Cherry on top
      drawPixelRect(ctx, x + 16, y, 4, 4, COLORS.cakeCherry);
      drawPixelRect(ctx, x + 17, y, 2, 1, "#FF8090");
      break;
    }
    case "gift": {
      // Gift box
      drawPixelRect(ctx, x + 2, y + 8, 28, 24, COLORS.giftGold);
      // Ribbon vertical
      drawPixelRect(ctx, x + 14, y + 8, 4, 24, COLORS.giftRibbon);
      // Ribbon horizontal
      drawPixelRect(ctx, x + 2, y + 18, 28, 4, COLORS.giftRibbon);
      // Lid
      drawPixelRect(ctx, x, y + 4, 32, 6, COLORS.giftOrange);
      // Bow
      drawPixelRect(ctx, x + 10, y, 4, 6, COLORS.giftRibbon);
      drawPixelRect(ctx, x + 18, y, 4, 6, COLORS.giftRibbon);
      drawPixelRect(ctx, x + 14, y + 2, 4, 4, COLORS.giftRibbon);
      break;
    }
    case "chair": {
      // Chair back
      drawPixelRect(ctx, x + 4, y, 4, 24, COLORS.chairBrown);
      drawPixelRect(ctx, x + 24, y, 4, 24, COLORS.chairBrown);
      drawPixelRect(ctx, x + 4, y, 24, 4, COLORS.chairDark);
      drawPixelRect(ctx, x + 4, y + 8, 24, 4, COLORS.chairDark);
      // Seat
      drawPixelRect(ctx, x + 2, y + 20, 28, 6, COLORS.chairSeat);
      drawPixelRect(ctx, x + 2, y + 20, 28, 2, COLORS.chairDark);
      // Legs
      drawPixelRect(ctx, x + 4, y + 26, 4, 10, COLORS.chairBrown);
      drawPixelRect(ctx, x + 24, y + 26, 4, 10, COLORS.chairBrown);
      break;
    }
  }
}

// ── Draw collectible (heart) ────────────────────
function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number
) {
  // Bobbing animation
  const bobY = y + Math.sin(frame * 0.08) * 4;
  const s = 3; // pixel size for heart

  // Heart shape using pixel grid
  //  . X X . . X X .
  //  X X X X X X X X
  //  X X X X X X X X
  //  . X X X X X X .
  //  . . X X X X . .
  //  . . . X X . . .
  const heartPixels = [
    [0, 1, 1, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
  ];

  for (let row = 0; row < heartPixels.length; row++) {
    for (let col = 0; col < heartPixels[row].length; col++) {
      if (heartPixels[row][col]) {
        const color =
          row < 2 && col < 4 ? COLORS.heart : COLORS.heartShade;
        drawPixelRect(ctx, x + col * s, bobY + row * s, s, s, color);
      }
    }
  }

  // Shine
  drawPixelRect(ctx, x + 1 * s, bobY + 1 * s, s - 1, s - 1, "#FF9ECE");
}

// ── Draw particles ──────────────────────────────
function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  for (const p of particles) {
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha;
    drawPixelRect(ctx, p.x, p.y, p.size, p.size, p.color);
  }
  ctx.globalAlpha = 1;
}

// ── AABB collision ──────────────────────────────
function checkCollision(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number
): boolean {
  // Shrink hitboxes slightly for fairness
  const shrink = 6;
  return (
    ax + shrink < bx + bw - shrink &&
    ax + aw - shrink > bx + shrink &&
    ay + shrink < by + bh - shrink &&
    ay + ah - shrink > by + shrink
  );
}

// ── Spawn helpers ───────────────────────────────
let idCounter = 0;
function spawnObstacle(speed: number): ObstacleData {
  const types: Array<"cake" | "gift" | "chair"> = ["cake", "gift", "chair"];
  const type = types[Math.floor(Math.random() * types.length)];
  const sizes: Record<string, { w: number; h: number }> = {
    cake: { w: 36, h: 36 },
    gift: { w: 32, h: 32 },
    chair: { w: 32, h: 36 },
  };
  const s = sizes[type];
  return {
    id: `obs-${idCounter++}`,
    type,
    x: GAME_CONFIG.CANVAS_WIDTH + 20,
    y: GAME_CONFIG.GROUND_Y - s.h,
    width: s.w,
    height: s.h,
    passed: false,
  };
}

function spawnHeart(): CollectibleData {
  const heightVariation = Math.random() * 60 + 60; // 60-120 above ground
  return {
    id: `heart-${idCounter++}`,
    x: GAME_CONFIG.CANVAS_WIDTH + 20,
    y: GAME_CONFIG.GROUND_Y - heightVariation,
    width: 24,
    height: 18,
    collected: false,
  };
}

// ── Helper: 패러글라이드 + 하늘 레이저 ───────────
type HelperPhase = {
  character: "bride" | "groom";
  mode: "enter" | "orbit" | "exit";
  enterProgress: number;
  glideX: number;
  glideY: number;
  laserMs: number;
};

type HelperLaserBeam = {
  x: number;
  age: number;
  zapped: boolean;
};

function pushObstacleDestroyParticles(
  particles: Particle[],
  obs: ObstacleData,
  pxSize: number
) {
  const cx = obs.x + obs.width / 2;
  const cy = obs.y + obs.height / 2;
  const n = 32;
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2 + Math.random() * 0.4;
    const sp = 4 + Math.random() * 9;
    particles.push({
      x: cx + (Math.random() - 0.5) * obs.width * 0.5,
      y: cy + (Math.random() - 0.5) * obs.height * 0.5,
      vx: Math.cos(ang) * sp + (Math.random() - 0.5) * 3,
      vy: Math.sin(ang) * sp - 2 + (Math.random() - 0.5) * 4,
      life: 35 + Math.random() * 28,
      maxLife: 65,
      color:
        i % 5 === 0
          ? "#FF4500"
          : i % 5 === 1
            ? "#FFD700"
            : i % 5 === 2
              ? COLORS.cakePink
              : i % 5 === 3
                ? "#FFFFFF"
                : "#7FDBFF",
      size: Math.random() < 0.35 ? pxSize * 2 : pxSize,
    });
  }
  for (let i = 0; i < 10; i++) {
    particles.push({
      x: cx,
      y: cy,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 5,
      life: 20 + Math.random() * 15,
      maxLife: 35,
      color: i % 2 === 0 ? "#FFFACD" : "#FF69B4",
      size: pxSize,
    });
  }
}

function zapObstaclesInLaserColumn(
  obstacles: ObstacleData[],
  laserX: number,
  halfWidth: number,
  groundY: number,
  particles: Particle[],
  pxSize: number
): ObstacleData[] {
  const beamL = laserX - halfWidth;
  const beamR = laserX + halfWidth;
  const kept: ObstacleData[] = [];
  for (const obs of obstacles) {
    const obsL = obs.x;
    const obsR = obs.x + obs.width;
    const hitX = obsR > beamL && obsL < beamR;
    const groundObs =
      obs.y + obs.height >= groundY - 12 && obs.y <= groundY + 10;
    if (hitX && groundObs) {
      pushObstacleDestroyParticles(particles, obs, pxSize);
    } else {
      kept.push(obs);
    }
  }
  return kept;
}

function drawSkyLaser(
  ctx: CanvasRenderingContext2D,
  beamX: number,
  originX: number,
  originY: number,
  groundY: number,
  frame: number,
  beamAge: number
) {
  const pulse = 0.45 + 0.35 * Math.sin(frame * 0.9 + beamAge * 40);
  const topY = Math.min(originY + 24, groundY - 40);
  const midX = beamX;
  const w = 10 + Math.sin(frame * 0.25) * 2;

  ctx.save();
  ctx.globalAlpha = Math.min(0.95, 0.25 + pulse * 0.55);

  // 대각 보조선(슈터 → 타겟 상단)
  ctx.strokeStyle = "rgba(120, 255, 255, 0.35)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(originX, originY + 8);
  ctx.lineTo(midX, topY);
  ctx.stroke();

  // 수직 메인 빔
  const grad = ctx.createLinearGradient(midX, topY, midX, groundY);
  grad.addColorStop(0, "rgba(180, 255, 255, 0.95)");
  grad.addColorStop(0.45, "rgba(0, 220, 255, 0.75)");
  grad.addColorStop(1, "rgba(255, 105, 180, 0.25)");
  ctx.fillStyle = grad;
  ctx.fillRect(midX - w / 2, topY, w, groundY - topY);

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.fillRect(midX - 2, topY, 4, groundY - topY);

  // 지면 임팩트 플래시 (폭발 느낌)
  const flash = Math.max(0, 0.85 - beamAge * 2.2);
  if (flash > 0) {
    ctx.globalAlpha = flash;
    ctx.fillStyle = "#FF4500";
    ctx.fillRect(midX - 28, groundY - 14, 56, 18);
    ctx.globalAlpha = flash * 0.7;
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(midX - 18, groundY - 10, 36, 12);
  }
  ctx.restore();
}

function drawParagliderHelper(
  ctx: CanvasRenderingContext2D,
  gx: number,
  gy: number,
  frame: number,
  character: "bride" | "groom"
) {
  const rx = Math.round(gx);
  const ry = Math.round(gy);
  const canopyTop = ry - 58;

  // 캐노피
  drawPixelRect(ctx, rx - 56, canopyTop + 16, 112, 8, "rgba(255, 255, 255, 0.92)");
  drawPixelRect(ctx, rx - 52, canopyTop + 8, 104, 8, "rgba(255, 182, 193, 0.95)");
  drawPixelRect(ctx, rx - 40, canopyTop, 80, 8, "rgba(255, 228, 240, 0.9)");
  drawPixelRect(ctx, rx - 24, canopyTop - 8, 48, 8, "rgba(255, 182, 193, 0.85)");

  // 서스펜션
  drawPixelRect(ctx, rx - 30, canopyTop + 24, 2, 22, "rgba(60, 60, 70, 0.75)");
  drawPixelRect(ctx, rx + 28, canopyTop + 24, 2, 22, "rgba(60, 60, 70, 0.75)");

  drawPlayer(ctx, rx - 16, ry, frame, false, character);
}

// ── Main component ──────────────────────────────
export default function Game2DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, tick, addScore, collectHeart, gameOver } = useGameState();
  const stateSnapRef = useRef(state);
  useLayoutEffect(() => {
    stateSnapRef.current = state;
  }, [state]);

  // Game state refs (to avoid re-renders during game loop)
  const playerRef = useRef({
    x: 60,
    y: GAME_CONFIG.GROUND_Y - GAME_CONFIG.PLAYER_HEIGHT,
    vy: 0,
    isJumping: false,
    isOnGround: true,
  });
  const obstaclesRef = useRef<ObstacleData[]>([]);
  const heartsRef = useRef<CollectibleData[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const heartSpawnTimerRef = useRef(0);
  const speedRef = useRef<number>(GAME_CONFIG.INITIAL_SPEED);
  const scoreRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animFrameRef = useRef(0);
  const gameActiveRef = useRef(false);
  const helperTriggeredRef = useRef(false);
  const helperPhaseRef = useRef<HelperPhase | null>(null);
  const activeLasersRef = useRef<HelperLaserBeam[]>([]);

  const jump = useCallback(() => {
    const player = playerRef.current;
    if (player.isOnGround) {
      player.vy = GAME_CONFIG.JUMP_FORCE;
      player.isJumping = true;
      player.isOnGround = false;
    }
  }, []);

  // Input handling
  useEffect(() => {
    if (state.phase !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        jump();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      jump();
    };

    window.addEventListener("keydown", handleKeyDown);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
      canvas.addEventListener("mousedown", () => jump());
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (canvas) {
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("mousedown", () => jump());
      }
    };
  }, [state.phase, jump]);

  // Game loop
  useEffect(() => {
    if (state.phase !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset game state
    playerRef.current = {
      x: 60,
      y: GAME_CONFIG.GROUND_Y - GAME_CONFIG.PLAYER_HEIGHT,
      vy: 0,
      isJumping: false,
      isOnGround: true,
    };
    obstaclesRef.current = [];
    heartsRef.current = [];
    particlesRef.current = [];
    frameRef.current = 0;
    scrollOffsetRef.current = 0;
    spawnTimerRef.current = 0;
    heartSpawnTimerRef.current = 0;
    speedRef.current = GAME_CONFIG.INITIAL_SPEED;
    scoreRef.current = 0;
    lastTimeRef.current = 0;
    gameActiveRef.current = true;
    helperTriggeredRef.current = false;
    helperPhaseRef.current = null;
    activeLasersRef.current = [];

    const { CANVAS_WIDTH: W, CANVAS_HEIGHT: H, GROUND_Y, GRAVITY, PLAYER_WIDTH: PW, PLAYER_HEIGHT: PH } = GAME_CONFIG;

    function gameLoop(timestamp: number) {
      if (!gameActiveRef.current) return;

      if (lastTimeRef.current === 0) lastTimeRef.current = timestamp;
      const rawDelta = (timestamp - lastTimeRef.current) / 1000;
      const delta = Math.min(rawDelta, 0.05); // cap delta
      lastTimeRef.current = timestamp;

      const player = playerRef.current;
      const speed = speedRef.current;

      // ── Update ────────────────────────────
      frameRef.current++;
      scrollOffsetRef.current += speed;

      // Speed increase
      speedRef.current = Math.min(
        speed + GAME_CONFIG.SPEED_INCREMENT * delta * 60,
        GAME_CONFIG.MAX_SPEED
      );

      // HUD 점수: 이번 프레임 tick 직후와 거의 같도록 거리 증가분(speed·delta)을 가산
      const snap = stateSnapRef.current;
      const displayTotal = Math.floor(
        snap.score + snap.distance + snap.speed * delta
      );
      if (
        !helperTriggeredRef.current &&
        displayTotal >= GAME_CONFIG.HELPER_SCORE_THRESHOLD
      ) {
        helperTriggeredRef.current = true;
        helperPhaseRef.current = {
          character: state.character === "bride" ? "groom" : "bride",
          mode: "enter",
          enterProgress: 0,
          glideX: W * 0.56,
          glideY: -70,
          laserMs: 0,
        };
      }

      // Player physics
      player.vy += GRAVITY;
      player.y += player.vy;
      if (player.y >= GROUND_Y - PH) {
        player.y = GROUND_Y - PH;
        player.vy = 0;
        player.isJumping = false;
        player.isOnGround = true;
      }

      // Spawn obstacles
      spawnTimerRef.current += delta * 1000;
      const spawnInterval = Math.max(
        GAME_CONFIG.OBSTACLE_SPAWN_INTERVAL - speedRef.current * 80,
        GAME_CONFIG.MIN_SPAWN_INTERVAL
      );
      if (spawnTimerRef.current >= spawnInterval) {
        spawnTimerRef.current = 0;
        obstaclesRef.current.push(spawnObstacle(speed));
      }

      // Spawn hearts
      heartSpawnTimerRef.current += delta * 1000;
      if (heartSpawnTimerRef.current >= spawnInterval * 1.5) {
        heartSpawnTimerRef.current = 0;
        if (Math.random() < 0.5) {
          heartsRef.current.push(spawnHeart());
        }
      }

      // Move obstacles
      for (const obs of obstaclesRef.current) {
        obs.x -= speed;
      }
      obstaclesRef.current = obstaclesRef.current.filter((o) => o.x > -60);

      // 패러글라이드 헬퍼 + 레이저(장애물 이동 반영 후)
      const helper = helperPhaseRef.current;
      if (helper) {
        if (
          displayTotal >= GAME_CONFIG.HELPER_SCORE_END &&
          helper.mode !== "exit"
        ) {
          helper.mode = "exit";
        }

        if (helper.mode === "enter") {
          helper.enterProgress = Math.min(1, helper.enterProgress + delta * 0.75);
          const t = helper.enterProgress;
          const ease = 1 - (1 - t) * (1 - t);
          helper.glideY = -70 + (104 - -70) * ease;
          helper.glideX = W * 0.55 + Math.sin(frameRef.current * 0.05) * 36 * ease;
          if (helper.enterProgress >= 1) helper.mode = "orbit";
        } else if (helper.mode === "orbit") {
          helper.glideX = W * 0.52 + Math.sin(frameRef.current * 0.042) * 52;
          helper.glideY = 100 + Math.sin(frameRef.current * 0.065) * 12;
          helper.laserMs += delta * 1000;
          if (helper.laserMs >= GAME_CONFIG.HELPER_LASER_INTERVAL_MS) {
            helper.laserMs = 0;
            const onScreen = obstaclesRef.current.filter(
              (o) => o.x > 20 && o.x < W - 24
            );
            let laserX: number;
            if (onScreen.length > 0) {
              const pick = onScreen[Math.floor(Math.random() * onScreen.length)];
              laserX = pick.x + pick.width / 2;
            } else {
              laserX = 70 + Math.random() * (W - 140);
            }
            activeLasersRef.current.push({ x: laserX, age: 0, zapped: false });
          }
        } else if (helper.mode === "exit") {
          helper.glideY -= 110 * delta;
          helper.glideX += 55 * delta;
          if (helper.glideY < -140) {
            helperPhaseRef.current = null;
            activeLasersRef.current = [];
          }
        }
      }

      for (const L of activeLasersRef.current) {
        L.age += delta;
        if (!L.zapped && L.age >= 0.055) {
          L.zapped = true;
          obstaclesRef.current = zapObstaclesInLaserColumn(
            obstaclesRef.current,
            L.x,
            44,
            GROUND_Y,
            particlesRef.current,
            P
          );
        }
      }
      activeLasersRef.current = activeLasersRef.current.filter((L) => L.age < 0.38);

      // Move hearts
      for (const h of heartsRef.current) {
        h.x -= speed;
      }
      heartsRef.current = heartsRef.current.filter((h) => h.x > -40 && !h.collected);

      // Update particles
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.life -= delta * 60;
      }
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      // Collision: obstacles
      for (const obs of obstaclesRef.current) {
        if (
          !obs.passed &&
          checkCollision(player.x, player.y, PW, PH, obs.x, obs.y, obs.width, obs.height)
        ) {
          gameActiveRef.current = false;
          gameOver();
          return;
        }
        // Score for passing
        if (!obs.passed && obs.x + obs.width < player.x) {
          obs.passed = true;
          scoreRef.current += 10;
          addScore(10);
        }
      }

      // Collision: hearts
      for (const h of heartsRef.current) {
        if (
          !h.collected &&
          checkCollision(player.x, player.y, PW, PH, h.x, h.y, h.width, h.height)
        ) {
          h.collected = true;
          collectHeart();
          // Spawn particles
          for (let i = 0; i < 8; i++) {
            particlesRef.current.push({
              x: h.x + h.width / 2,
              y: h.y + h.height / 2,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6 - 2,
              life: 20 + Math.random() * 15,
              maxLife: 35,
              color:
                i % 3 === 0
                  ? COLORS.heart
                  : i % 3 === 1
                  ? COLORS.heartShade
                  : "#FFD1E8",
              size: P,
            });
          }
        }
      }

      // Tick game state for distance
      tick(delta);

      // ── Draw ──────────────────────────────
      ctx!.imageSmoothingEnabled = false;
      ctx!.clearRect(0, 0, W, H);

      // Background
      drawBackground(ctx!, scrollOffsetRef.current, W, H);

      // Obstacles
      for (const obs of obstaclesRef.current) {
        drawObstacle(ctx!, obs);
      }

      // Hearts
      for (const h of heartsRef.current) {
        if (!h.collected) {
          drawHeart(ctx!, h.x, h.y, frameRef.current);
        }
      }

      // 하늘 레이저 (장애물 위)
      const drawHelper = helperPhaseRef.current;
      for (const L of activeLasersRef.current) {
        const ox = drawHelper ? drawHelper.glideX : W * 0.5;
        const oy = drawHelper ? drawHelper.glideY : 90;
        drawSkyLaser(
          ctx!,
          L.x,
          ox,
          oy,
          GROUND_Y,
          frameRef.current,
          L.age
        );
      }

      // Particles
      drawParticles(ctx!, particlesRef.current);

      // 패러글라이드 헬퍼
      if (drawHelper) {
        drawParagliderHelper(
          ctx!,
          drawHelper.glideX,
          drawHelper.glideY,
          frameRef.current,
          drawHelper.character
        );
      }

      // Player
      drawPlayer(ctx!, player.x, player.y, frameRef.current, player.isJumping, state.character);

      animFrameRef.current = requestAnimationFrame(gameLoop);
    }

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      gameActiveRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [state.phase, state.character, tick, addScore, collectHeart, gameOver]);

  return (
    <canvas
      ref={canvasRef}
      width={GAME_CONFIG.CANVAS_WIDTH}
      height={GAME_CONFIG.CANVAS_HEIGHT}
      style={{
        width: "100%",
        maxWidth: GAME_CONFIG.CANVAS_WIDTH,
        height: "auto",
        imageRendering: "pixelated",
        display: "block",
      }}
    />
  );
}
