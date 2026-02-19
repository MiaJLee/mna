"use client";

import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import CopyButton from "@/components/ui/CopyButton";
import KakaoMapClient from "@/components/KakaoMapClient";

export default function WeddingInfoSection({
  config,
}: {
  config: WeddingConfig;
}) {
  return (
    <section id="wedding-info" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-8">
          예식 안내
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll delay={100}>
        <div className="text-center mb-8">
          <p className="text-lg font-serif text-brown-dark mb-1">
            {config.venue.name}
          </p>
          <p className="text-sm text-warm-gray">{config.venue.hall}</p>
          <p className="text-sm text-brown mt-3">{config.timeDetail}</p>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={200}>
        <div className="rounded-xl overflow-hidden border border-beige mb-4">
          <KakaoMapClient
            lat={config.venue.lat}
            lng={config.venue.lng}
            venueName={config.venue.name}
          />
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={300}>
        <div className="bg-warm-white rounded-xl p-4 border border-beige/50 mb-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-brown flex-1">{config.venue.address}</p>
            <CopyButton text={config.venue.address} label="주소 복사" />
          </div>
          {config.venue.tel && (
            <p className="text-xs text-warm-gray mt-2">
              Tel. {config.venue.tel}
            </p>
          )}
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={400}>
        <div className="grid grid-cols-3 gap-2">
          {config.navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3 px-2 bg-warm-white border border-beige/50 rounded-xl text-xs text-brown-dark hover:bg-sage-50 transition-colors"
            >
              <span className="mr-1">📍</span>
              {link.name}
            </a>
          ))}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
