"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { GAME_CONFIG } from "../config/gameConfig";

export function usePlayerControls(isPlaying: boolean) {
  const [lane, setLane] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const jumpStartTime = useRef(0);
  const jumpProgressRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const moveLeft = useCallback(() => {
    setLane((prev) => Math.max(prev - 1, -1));
  }, []);

  const moveRight = useCallback(() => {
    setLane((prev) => Math.min(prev + 1, 1));
  }, []);

  const jump = useCallback(() => {
    setIsJumping((prev) => {
      if (!prev) {
        jumpStartTime.current = performance.now();
        return true;
      }
      return prev;
    });
  }, []);

  // 키보드 입력
  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          moveLeft();
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          moveRight();
          break;
        case "ArrowUp":
        case " ":
        case "w":
        case "W":
          e.preventDefault();
          jump();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, moveLeft, moveRight, jump]);

  // 터치 입력
  useEffect(() => {
    if (!isPlaying) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx < 30 && absDy < 30) {
        jump(); // 탭 → 점프
      } else if (absDx > absDy) {
        if (dx < -30) moveLeft();
        else if (dx > 30) moveRight();
      } else {
        if (dy < -30) jump(); // 위로 스와이프 → 점프
      }

      touchStartRef.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isPlaying, moveLeft, moveRight, jump]);

  // 점프 타이머
  useEffect(() => {
    if (!isJumping) return;

    let raf: number;
    const update = () => {
      const elapsed = (performance.now() - jumpStartTime.current) / 1000;
      const progress = elapsed / GAME_CONFIG.JUMP_DURATION;

      if (progress >= 1) {
        jumpProgressRef.current = 0;
        setIsJumping(false);
      } else {
        jumpProgressRef.current = progress;
        raf = requestAnimationFrame(update);
      }
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isJumping]);

  // 게임 리셋 시 초기화
  useEffect(() => {
    if (!isPlaying) {
      setLane(0);
      setIsJumping(false);
      jumpProgressRef.current = 0;
    }
  }, [isPlaying]);

  return { lane, isJumping, jumpProgressRef };
}
