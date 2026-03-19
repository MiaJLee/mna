"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { GalleryImage } from "@/types";
import { withBasePath } from "@/config/basePath";

const SWIPE_THRESHOLD = 60;
const DRAG_DAMP = 0.4;

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(currentIndex);
  const [dragOffset, setDragOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const pointerStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const isPointerDown = useRef(false);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
    setDragOffset(0);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    setDragOffset(0);
  }, [images.length]);

  useEffect(() => {
    setIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const el = trackRef.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setContainerWidth(el.getBoundingClientRect().width);
    });
    ro.observe(el);
    setContainerWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrev, onClose]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      pointerStartX.current = e.clientX;
      dragStartOffset.current = dragOffset;
      isPointerDown.current = true;
      setIsDragging(true);
    },
    [dragOffset]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isPointerDown.current || containerWidth <= 0) return;
      const delta = e.clientX - pointerStartX.current;
      let next = dragStartOffset.current + delta;
      const atStart = index === 0;
      const atEnd = index === images.length - 1;
      if (atStart && next > 0) next = next * DRAG_DAMP;
      if (atEnd && next < 0) next = next * DRAG_DAMP;
      setDragOffset(next);
    },
    [index, images.length, containerWidth]
  );

  const handlePointerUp = useCallback(() => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsDragging(false);
    if (containerWidth <= 0) return;
    const threshold = Math.min(SWIPE_THRESHOLD, containerWidth * 0.2);
    if (dragOffset < -threshold) {
      setIndex((prev) => (prev + 1) % images.length);
      setDragOffset(0);
    } else if (dragOffset > threshold) {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
      setDragOffset(0);
    } else {
      setDragOffset(0);
    }
  }, [dragOffset, containerWidth, images.length]);

  const baseTranslate = containerWidth > 0 ? -index * containerWidth : 0;
  const translateX = baseTranslate + dragOffset;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white"
        aria-label="닫기"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-2 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
        aria-label="이전"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div
        className="relative w-full h-full overflow-hidden px-12 touch-none"
        style={{ maxWidth: "100vw" }}
      >
        <div
          ref={trackRef}
          className="absolute inset-0 flex items-center"
          style={{
            width: containerWidth * images.length || "100%",
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? "none" : "transform 0.25s ease-out",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: containerWidth, height: "100%" }}
            >
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={withBasePath(img.src)}
                  alt={img.alt}
                  fill
                  className="object-contain select-none pointer-events-none"
                  sizes="100vw"
                  priority={i === index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={goNext}
        className="absolute right-2 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white"
        aria-label="다음"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
