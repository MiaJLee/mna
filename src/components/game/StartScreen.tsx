"use client";

import { useState } from "react";
import { useGameState } from "./hooks/useGameState";
import { useGameCopy } from "./GameCopyContext";
import type { CharacterType } from "@/types/game";

export default function StartScreen() {
  const { startGame } = useGameState();
  const copy = useGameCopy();
  const [selected, setSelected] = useState<CharacterType>("bride");

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(26, 26, 46, 0.92)",
        fontFamily: "'Courier New', Courier, monospace",
        zIndex: 10,
      }}
    >
      {/* Pixel hearts decoration */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              color: "#FF69B4",
              fontSize: 20,
              textShadow: "0 0 8px #FF69B4",
            }}
          >
            &#9829;
          </span>
        ))}
      </div>

      {/* 서브: 픽셀 에디션 · 메인: 웨딩 러너 */}
      <div
        style={{
          color: "#FFB6C1",
          fontSize: 11,
          letterSpacing: "0.4em",
          marginBottom: 8,
          textTransform: "uppercase",
        }}
      >
        {copy.subtitleLine}
      </div>
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: 22,
          fontWeight: "bold",
          letterSpacing: "0.15em",
          margin: "0 0 24px 0",
          textShadow: "0 0 12px rgba(255,182,193,0.5)",
        }}
      >
        {copy.titleLine}
      </h1>

      {/* Character select */}
      <div
        style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: 11,
          marginBottom: 12,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {copy.selectCharacter}
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 28 }}>
        <button
          onClick={() => setSelected("bride")}
          style={{
            background: selected === "bride" ? "rgba(255,182,193,0.2)" : "transparent",
            border: `2px solid ${selected === "bride" ? "#FF69B4" : "rgba(255,255,255,0.2)"}`,
            borderRadius: 8,
            padding: "12px 16px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          {/* Pixel bride preview */}
          <svg width="32" height="48" viewBox="0 0 32 48" style={{ imageRendering: "pixelated" }}>
            <rect x="8" y="0" width="16" height="4" fill="#FFFFFF" />
            <rect x="20" y="2" width="8" height="6" fill="#F0E8E0" />
            <rect x="8" y="4" width="16" height="8" fill="#4A3728" />
            <rect x="8" y="12" width="16" height="12" fill="#FFDAB9" />
            <rect x="12" y="16" width="3" height="3" fill="#333" />
            <rect x="19" y="16" width="3" height="3" fill="#333" />
            <rect x="8" y="24" width="16" height="8" fill="#FFFFFF" />
            <rect x="4" y="32" width="24" height="12" fill="#FFB6C1" />
            <rect x="2" y="36" width="28" height="8" fill="#FFB6C1" />
          </svg>
          <span style={{ color: selected === "bride" ? "#FF69B4" : "rgba(255,255,255,0.5)", fontSize: 11 }}>
            {copy.brideName}
          </span>
        </button>

        <button
          onClick={() => setSelected("groom")}
          style={{
            background: selected === "groom" ? "rgba(135,206,250,0.2)" : "transparent",
            border: `2px solid ${selected === "groom" ? "#87CEEB" : "rgba(255,255,255,0.2)"}`,
            borderRadius: 8,
            padding: "12px 16px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          {/* Pixel groom preview */}
          <svg width="32" height="48" viewBox="0 0 32 48" style={{ imageRendering: "pixelated" }}>
            <rect x="8" y="0" width="16" height="4" fill="#2C2C2C" />
            <rect x="6" y="4" width="20" height="4" fill="#1a1a1a" />
            <rect x="8" y="8" width="16" height="4" fill="#3A2A1A" />
            <rect x="8" y="12" width="16" height="12" fill="#FFDAB9" />
            <rect x="12" y="16" width="3" height="3" fill="#333" />
            <rect x="19" y="16" width="3" height="3" fill="#333" />
            <rect x="8" y="24" width="16" height="4" fill="#FFFFFF" />
            <rect x="14" y="24" width="4" height="8" fill="#333" />
            <rect x="6" y="28" width="20" height="12" fill="#2C2C2C" />
            <rect x="8" y="40" width="6" height="6" fill="#1a1a1a" />
            <rect x="18" y="40" width="6" height="6" fill="#1a1a1a" />
          </svg>
          <span style={{ color: selected === "groom" ? "#87CEEB" : "rgba(255,255,255,0.5)", fontSize: 11 }}>
            {copy.groomName}
          </span>
        </button>
      </div>

      {/* Instructions */}
      <div
        style={{
          border: "2px solid rgba(255,182,193,0.3)",
          borderRadius: 4,
          padding: "12px 24px",
          marginBottom: 24,
          maxWidth: 240,
          width: "100%",
          background: "rgba(255,182,193,0.05)",
        }}
      >
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, lineHeight: 1.8, textAlign: "center" }}>
          <div>{copy.instructionJump}</div>
          <div>
            <span style={{ color: "#FF69B4" }}>&#9829;</span> {copy.instructionHearts}
          </div>
        </div>
      </div>

      {/* Start button */}
      <button
        onClick={() => startGame(selected)}
        style={{
          background: "transparent",
          border: "2px solid #FF69B4",
          color: "#FF69B4",
          padding: "12px 36px",
          fontSize: 14,
          fontFamily: "'Courier New', Courier, monospace",
          letterSpacing: "0.3em",
          cursor: "pointer",
          animation: "blink 1.2s step-end infinite",
          textTransform: "uppercase",
        }}
      >
        {copy.tapToStart}
      </button>

      {/* Back link */}
      <a
        href={copy.invitationHref}
        onClick={(e) => e.stopPropagation()}
        style={{
          color: "rgba(255,255,255,0.25)",
          fontSize: 10,
          marginTop: 28,
          textDecoration: "underline",
          letterSpacing: "0.1em",
        }}
      >
        &larr; {copy.backToInvitation}
      </a>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
