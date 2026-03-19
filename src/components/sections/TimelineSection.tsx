import ImageWithFallback from "@/components/ui/ImageWithFallback";
import RelationshipDaysLabel from "@/components/ui/RelationshipDaysLabel";
import type { WeddingConfig } from "@/types";
import { withBasePath } from "@/config/basePath";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function TimelineSection({
  config,
}: {
  config: WeddingConfig;
}) {
  return (
    <section id="timeline" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-2">
          OUR TIMELINE
        </h2>
        <p className="text-xs text-warm-gray text-center mb-10">
          서로에게 참 소중하고 감사한 존재
        </p>
      </AnimateOnScroll>

      <div className="relative">
        {/* 세로 중앙선 */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-beige" />

        {config.timeline.map((event, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <AnimateOnScroll key={idx} delay={idx * 150}>
              <div className="relative mb-12 last:mb-0">
                {/* 중앙 도트 */}
                <div className="absolute left-1/2 -translate-x-1/2 top-6 w-2.5 h-2.5 rounded-full bg-sage-400 z-10" />

                <div className={`flex items-start gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                  {/* 이미지 */}
                  <div className="w-[45%] shrink-0">
                    {event.image && (
                      <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                        <ImageWithFallback
                          src={withBasePath(event.image)}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="180px"
                        />
                      </div>
                    )}
                  </div>

                  {/* 텍스트 */}
                  <div className={`w-[45%] shrink-0 pt-4 ${isLeft ? "text-left" : "text-right"}`}>
                    <span className="inline-block px-3 py-1 bg-sage-100 text-sage-700 text-[10px] rounded-full mb-2">
                      {event.useRelationshipDays && config.relationshipStartDate ? (
                        <RelationshipDaysLabel
                          startDate={config.relationshipStartDate}
                          className="inline-block"
                        />
                      ) : (
                        event.date
                      )}
                    </span>
                    <p className="text-sm font-medium text-brown-dark mb-1">
                      {event.title}
                    </p>
                    <p className="text-xs text-warm-gray leading-relaxed whitespace-pre-line">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>
    </section>
  );
}
