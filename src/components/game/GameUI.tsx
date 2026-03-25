"use client";

import { useGameState } from "./hooks/useGameState";
import { useGameCopy } from "./GameCopyContext";

export default function GameUI() {
  const { state } = useGameState();
  const copy = useGameCopy();

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        pointerEvents: "none",
        fontFamily: "'Courier New', Courier, monospace",
        padding: "8px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* Score */}
      <div
        style={{
          background: "rgba(0,0,0,0.4)",
          padding: "6px 10px",
          borderRadius: 2,
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 8,
            letterSpacing: "0.2em",
          }}
        >
          {copy.hudScore}
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {Math.floor(state.score + state.distance).toLocaleString()}
        </div>
      </div>

      {/* Hearts */}
      <div
        style={{
          background: "rgba(0,0,0,0.4)",
          padding: "6px 10px",
          borderRadius: 2,
          textAlign: "right",
        }}
      >
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 8,
            letterSpacing: "0.2em",
          }}
        >
          {copy.hudHearts}
        </div>
        <div
          style={{
            color: "#FF69B4",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          &#9829; {state.hearts}
        </div>
      </div>
    </div>
  );
}
