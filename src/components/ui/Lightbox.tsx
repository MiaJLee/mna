"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { GalleryImage } from "@/types";
import { withBasePath } from "@/config/basePath";

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
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
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

      <div className="relative w-full h-full flex items-center justify-center px-12">
        <ImageWithFallback
          src={withBasePath(images[index].src)}
          alt={images[index].alt}
          fill
          className="object-contain"
          sizes="100vw"
          priority
        />
      </div>

      <button
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
