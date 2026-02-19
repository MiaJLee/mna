"use client";

import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Accordion from "@/components/ui/Accordion";

const badgeLabels: Record<string, string> = {
  groom: "신랑",
  bride: "신부",
  both: "함께",
};

export default function InterviewSection({
  config,
}: {
  config: WeddingConfig;
}) {
  return (
    <section id="interview" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-8">
          우리의 이야기
        </h2>
      </AnimateOnScroll>

      <div className="space-y-3">
        {config.interview.map((qa, idx) => (
          <AnimateOnScroll key={idx} delay={idx * 80}>
            <Accordion
              title={qa.question}
              badge={badgeLabels[qa.answeredBy]}
            >
              {qa.answer}
            </Accordion>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
