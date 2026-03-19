"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import { createElement } from "react";
import type { GamePhase } from "@/types/game";
import { GAME_CONFIG } from "../config/gameConfig";

interface GameState {
  phase: GamePhase;
  score: number;
  distance: number;
  speed: number;
  highScore: number;
}

type GameAction =
  | { type: "START" }
  | { type: "ADD_SCORE"; points: number }
  | { type: "TICK"; delta: number }
  | { type: "GAME_OVER" }
  | { type: "RESTART" };

function getHighScore(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem("mna-game-highscore") || "0", 10);
}

function saveHighScore(score: number) {
  if (typeof window === "undefined") return;
  const current = getHighScore();
  if (score > current) {
    localStorage.setItem("mna-game-highscore", String(score));
  }
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START":
      return {
        ...state,
        phase: "playing",
        score: 0,
        distance: 0,
        speed: GAME_CONFIG.INITIAL_SPEED,
      };
    case "ADD_SCORE":
      return { ...state, score: state.score + action.points };
    case "TICK": {
      const newDistance = state.distance + state.speed * action.delta;
      const newSpeed = Math.min(
        state.speed + GAME_CONFIG.SPEED_INCREMENT * action.delta,
        GAME_CONFIG.MAX_SPEED
      );
      return {
        ...state,
        distance: newDistance,
        speed: newSpeed,
      };
    }
    case "GAME_OVER": {
      const finalScore = state.score + Math.floor(state.distance);
      saveHighScore(finalScore);
      return {
        ...state,
        phase: "gameover",
        score: finalScore,
        highScore: Math.max(state.highScore, finalScore),
      };
    }
    case "RESTART":
      return {
        ...state,
        phase: "playing",
        score: 0,
        distance: 0,
        speed: GAME_CONFIG.INITIAL_SPEED,
      };
    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  startGame: () => void;
  addScore: (points: number) => void;
  tick: (delta: number) => void;
  gameOver: () => void;
  restart: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, {
    phase: "start" as GamePhase,
    score: 0,
    distance: 0,
    speed: GAME_CONFIG.INITIAL_SPEED,
    highScore: getHighScore(),
  });

  const startGame = useCallback(() => dispatch({ type: "START" }), []);
  const addScore = useCallback(
    (points: number) => dispatch({ type: "ADD_SCORE", points }),
    []
  );
  const tick = useCallback(
    (delta: number) => dispatch({ type: "TICK", delta }),
    []
  );
  const gameOver = useCallback(() => dispatch({ type: "GAME_OVER" }), []);
  const restart = useCallback(() => dispatch({ type: "RESTART" }), []);

  return createElement(
    GameContext.Provider,
    { value: { state, startGame, addScore, tick, gameOver, restart } },
    children
  );
}

export function useGameState() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGameState must be used within GameStateProvider");
  return ctx;
}
