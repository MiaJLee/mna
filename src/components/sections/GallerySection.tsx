"use client";

import { useState, useMemo, useCallback } from "react";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Lightbox from "@/components/ui/Lightbox";
import { withBasePath } from "@/config/basePath";

/** /images/gallery/photo.jpg → /images/gallery/thumbs/photo.webp */
function toThumbSrc(src: string): string {
  const lastSlash = src.lastIndexOf("/");
  return (src.slice(0, lastSlash) + "/thumbs" + src.slice(lastSlash)).replace(/\.(jpg|jpeg|png)$/i, ".webp");
}

export default function GallerySection({
  config,
}: {
  config: WeddingConfig;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const images = useMemo(() => config.gallery.slice(0, 12), [config.gallery]);

  const handleSelect = useCallback((idx: number) => {
    setSelectedIndex(idx);
  }, []);

  return (
    <section id="gallery" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-8">
          {config.labels.galleryTitle}
        </h2>
      </AnimateOnScroll>

      <div className="grid grid-cols-3 gap-2" onContextMenu={(e) => e.preventDefault()}>
        {images.map((img, idx) => (
          <AnimateOnScroll key={idx} delay={idx * 50}>
            <div
              className="relative aspect-square w-full overflow-hidden rounded-lg cursor-pointer"
              onClick={() => handleSelect(idx)}
            >
              <ImageWithFallback
                src={withBasePath(toThumbSrc(img.src))}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="143px"
              />
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}
