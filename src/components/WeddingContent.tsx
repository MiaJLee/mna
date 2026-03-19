"use client";

import { weddingConfig } from "@/config/wedding";
import IntroSection from "@/components/sections/IntroSection";
import GreetingSection from "@/components/sections/GreetingSection";
import WeddingInfoSection from "@/components/sections/WeddingInfoSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import CalendarSection from "@/components/sections/CalendarSection";
import GallerySection from "@/components/sections/GallerySection";
import TransportSection from "@/components/sections/TransportSection";
import AccountSection from "@/components/sections/AccountSection";
import FlowerDeclineSection from "@/components/sections/FlowerDeclineSection";
import RsvpSection from "@/components/sections/RsvpSection";
import ShareSection from "@/components/sections/ShareSection";
import SectionDivider from "@/components/ui/SectionDivider";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

function ContentSections() {
  return (
    <>
      <GreetingSection config={weddingConfig} />
      <SectionDivider />
      <WeddingInfoSection config={weddingConfig} />
      <SectionDivider />
      <AboutUsSection config={weddingConfig} />
      <SectionDivider />
      <TimelineSection config={weddingConfig} />
      <SectionDivider />
      <CalendarSection config={weddingConfig} />
      <SectionDivider />
      <GallerySection config={weddingConfig} />
      <SectionDivider />
      <TransportSection config={weddingConfig} />
      <SectionDivider />
      <AccountSection config={weddingConfig} />
      <FlowerDeclineSection config={weddingConfig} />
      <SectionDivider />
      <RsvpSection config={weddingConfig} />
      <SectionDivider />
      <ShareSection config={weddingConfig} />
    </>
  );
}

export default function WeddingContent() {
  return (
    <>
      {/* ── 모바일 레이아웃 (lg 미만): 단일 컬럼 ── */}
      <main className="lg:hidden max-w-[430px] mx-auto bg-cream min-h-screen">
        <IntroSection config={weddingConfig} />
        <ScrollIndicator />
        <ContentSections />
      </main>

      {/* ── PC 레이아웃 (lg 이상): 좌 고정 + 우 스크롤, 전체 너비 ── */}
      <div className="hidden lg:flex min-h-screen w-full">
        {/* 좌측: 인트로 이미지 1/3 */}
        <div className="w-1/3 sticky top-0 h-screen">
          <IntroSection config={weddingConfig} />
        </div>

        {/* 우측: 정보 영역 스크롤 2/3 */}
        <div
          id="scroll-content"
          className="w-2/3 bg-cream overflow-y-auto h-screen"
        >
          <ScrollIndicator scrollContainerId="scroll-content" />
          <div className="max-w-[520px] mx-auto">
            <ContentSections />
          </div>
        </div>
      </div>
    </>
  );
}
