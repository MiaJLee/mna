import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import SectionDivider from "@/components/ui/SectionDivider";

export default function GreetingSection({
  config,
}: {
  config: WeddingConfig;
}) {
  return (
    <section id="greeting" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <SectionDivider />
      <AnimateOnScroll>
        <div className="text-center py-8">
          <h2 className="font-serif text-xl text-brown-dark mb-8">
            초대합니다
          </h2>
          <p className="text-sm text-brown leading-7 whitespace-pre-line">
            {config.greeting}
          </p>
          <div className="mt-8 text-sm text-warm-gray">
            <p>
              {config.groom.fatherName} · {config.groom.motherName}
              <span className="text-brown-light">
                {" "}
                {config.groom.relation}
              </span>{" "}
              <span className="font-medium text-brown-dark">
                {config.groom.name}
              </span>
            </p>
            <p className="mt-1">
              {config.bride.fatherName} · {config.bride.motherName}
              <span className="text-brown-light">
                {" "}
                {config.bride.relation}
              </span>{" "}
              <span className="font-medium text-brown-dark">
                {config.bride.name}
              </span>
            </p>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
