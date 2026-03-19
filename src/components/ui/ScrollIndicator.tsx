"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";

interface ScrollIndicatorProps {
  scrollContainerId?: string;
  labels?: import("@/types").Labels["nav"];
  hiddenSections?: string[];
}

export default function ScrollIndicator({
  scrollContainerId,
  labels,
  hiddenSections = [],
}: ScrollIndicatorProps) {
  const sections = useMemo(() => {
    const nav = labels ?? { greeting: "인사말", weddingInfo: "예식안내", aboutUs: "소개", timeline: "타임라인", calendar: "캘린더", gallery: "갤러리", transport: "오시는길", account: "축의금", rsvp: "참석여부", share: "공유" };
    const all = [
      { id: "greeting", label: nav.greeting },
      { id: "wedding-info", label: nav.weddingInfo },
      { id: "about-us", label: nav.aboutUs },
      { id: "timeline", label: nav.timeline },
      { id: "calendar", label: nav.calendar },
      { id: "gallery", label: nav.gallery },
      { id: "transport", label: nav.transport },
      { id: "account", label: nav.account },
      { id: "rsvp", label: nav.rsvp },
      { id: "share", label: nav.share },
    ];
    return all.filter((s) => !hiddenSections.includes(s.id));
  }, [labels, hiddenSections]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const getScrollSource = useCallback(() => {
    if (scrollContainerId) {
      return document.getElementById(scrollContainerId);
    }
    return null;
  }, [scrollContainerId]);

  // 컨테이너 내부 또는 document 전체에서 섹션 요소를 찾는 헬퍼
  // 듀얼 레이아웃(모바일+PC)에서 동일 id가 두 번 렌더되므로,
  // PC에서는 container 내부에서만 검색해야 올바른 요소를 찾음
  const findSectionElement = useCallback(
    (id: string): HTMLElement | null => {
      const container = getScrollSource();
      if (container) {
        return container.querySelector<HTMLElement>(`#${id}`);
      }
      return document.getElementById(id);
    },
    [getScrollSource]
  );

  const handleScroll = useCallback(() => {
    const container = getScrollSource();

    if (container) {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    } else {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }

    // 현재 활성 섹션 감지 (컨테이너 범위 내에서 검색)
    const sectionElements = sections.map((s) =>
      findSectionElement(s.id)
    ).filter(Boolean) as HTMLElement[];

    let currentIdx = 0;
    for (let i = sectionElements.length - 1; i >= 0; i--) {
      const rect = sectionElements[i].getBoundingClientRect();
      if (rect.top <= 100) {
        currentIdx = i;
        break;
      }
    }
    setActiveIndex(currentIdx);

    // 인사말 섹션에 도달하면 인디케이터 표시
    const greetingEl = findSectionElement("greeting");
    if (greetingEl) {
      const rect = greetingEl.getBoundingClientRect();
      setVisible(rect.top <= 0);
    }
  }, [getScrollSource, findSectionElement, sections]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const container = getScrollSource();
    container?.addEventListener("scroll", handleScroll, { passive: true });

    // Defer initial sync so setState runs in a separate tick (avoids cascading renders)
    const id = setTimeout(handleScroll, 0);

    return () => {
      clearTimeout(id);
      window.removeEventListener("scroll", handleScroll);
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, getScrollSource]);

  const handleClick = (id: string) => {
    const el = findSectionElement(id);
    if (!el) return;

    const container = getScrollSource();
    if (container) {
      // PC: 컨테이너 내부 스크롤 (scrollIntoView는 window를 스크롤하므로 수동 계산)
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset = elRect.top - containerRect.top + container.scrollTop - 40;
      container.scrollTo({ top: offset, behavior: "smooth" });
    } else {
      // 모바일: 일반 scrollIntoView
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={barRef} className={`sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-beige/20 transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* 프로그래스 바 */}
      <div className="h-[3px] bg-beige/20">
        <div
          className="h-full bg-sage-400 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 섹션 네비게이션 */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 overflow-x-auto scrollbar-hide">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={`shrink-0 px-2.5 py-1 rounded-full text-xs transition-all duration-300 whitespace-nowrap ${
              idx === activeIndex
                ? "bg-sage-400 text-white font-medium shadow-sm"
                : "text-warm-gray hover:text-brown hover:bg-sage-50"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}
