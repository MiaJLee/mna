"use client";

import { useState } from "react";
import Image from "next/image";
import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Lightbox from "@/components/ui/Lightbox";
import { withBasePath } from "@/config/basePath";

export default function GallerySection({
  config,
}: {
  config: WeddingConfig;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-8">
          우리의 순간
        </h2>
      </AnimateOnScroll>

      <div className="grid grid-cols-2 gap-2">
        {config.gallery.map((img, idx) => (
          <AnimateOnScroll key={idx} delay={idx * 50}>
            <button
              onClick={() => setSelectedIndex(idx)}
              className="relative aspect-square w-full overflow-hidden rounded-lg"
            >
              <Image
                src={withBasePath(img.src)}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="50vw"
              />
            </button>
          </AnimateOnScroll>
        ))}
      </div>

      {selectedIndex !== null && (
        <Lightbox
          images={config.gallery}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}
