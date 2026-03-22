"use client";

import { useState, useEffect } from "react";
import type { WeddingConfig } from "@/types";
import { withBasePath } from "@/config/basePath";
import IntroSection from "@/components/sections/IntroSection";
import GreetingSection from "@/components/sections/GreetingSection";
import WeddingInfoSection from "@/components/sections/WeddingInfoSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import CalendarSection from "@/components/sections/CalendarSection";
import GallerySection from "@/components/sections/GallerySection";
import TransportSection from "@/components/sections/TransportSection";
import AccountSection from "@/components/sections/AccountSection";
import FlowerDeclineSection from "@/components/sections/FlowerDeclineSection";
import RsvpSection from "@/components/sections/RsvpSection";
import ShareSection from "@/components/sections/ShareSection";
import SectionDivider from "@/components/ui/SectionDivider";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

function ContentSections({ config }: { config: WeddingConfig }) {
  return (
    <>
      <GreetingSection config={config} />
      <SectionDivider />
      <WeddingInfoSection config={config} />
      <SectionDivider />
      <AboutUsSection config={config} />
      <SectionDivider />
      <CalendarSection config={config} />
      <SectionDivider />
      <GallerySection config={config} />
      <SectionDivider />
      <TransportSection config={config} />
      {config.showAccount !== false && (
        <>
          <SectionDivider />
          <AccountSection config={config} />
        </>
      )}
      {config.showFlowerDecline !== false && <FlowerDeclineSection config={config} />}
      <SectionDivider />
      <RsvpSection config={config} />
      <SectionDivider />
      <ShareSection config={config} />
    </>
  );
}

function preloadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

export default function WeddingContent({ config }: { config: WeddingConfig }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 메인 이미지 + 폰트만 대기 (모바일 메모리 절약)
    const mainImage = preloadImage(withBasePath("/images/gallery/web/gallery_01.webp"));
    const fonts = typeof document !== "undefined" ? document.fonts.ready : Promise.resolve();
    Promise.all([mainImage, fonts]).then(() => setReady(true));
  }, [config]);

  const hiddenSections = [
    ...(config.showAccount === false ? ["account"] : []),
  ];

  if (!ready) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-brown font-serif animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* ── 모바일 레이아웃 (lg 미만): 단일 컬럼 ── */}
      <main className="lg:hidden max-w-[430px] mx-auto bg-cream min-h-screen">
        <IntroSection config={config} />
        <ScrollIndicator labels={config.labels.nav} hiddenSections={hiddenSections} />
        <ContentSections config={config} />
      </main>

      {/* ── PC 레이아웃 (lg 이상): 좌 고정 + 우 스크롤, 전체 너비 ── */}
      <div className="hidden lg:flex min-h-screen w-full">
        {/* 좌측: 인트로 이미지 1/3 */}
        <div className="w-1/3 min-w-0 sticky top-0 h-screen overflow-x-visible">
          <IntroSection config={config} />
        </div>

        {/* 우측: 정보 영역 스크롤 2/3 */}
        <div
          id="scroll-content"
          className="w-2/3 bg-cream overflow-y-auto h-screen"
        >
          <ScrollIndicator scrollContainerId="scroll-content" labels={config.labels.nav} hiddenSections={hiddenSections} />
          <div className="max-w-[520px] mx-auto">
            <ContentSections config={config} />
          </div>
        </div>
      </div>
    </>
  );
}
