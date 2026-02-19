import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function BasicInfoSection({
  config,
}: {
  config: WeddingConfig;
}) {
  return (
    <section id="basic-info" className="w-full max-w-[430px] mx-auto px-6 py-16">
      <AnimateOnScroll>
        <div className="text-center space-y-8">
          <div className="space-y-3">
            <p className="text-sm text-warm-gray">
              {config.groom.fatherName} · {config.groom.motherName}
              <span className="text-brown-light">
                {" "}
                {config.groom.relation}
              </span>
            </p>
            <p className="font-serif text-2xl text-brown-dark">
              {config.groom.name}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-beige" />
            <span className="text-sage-400 text-lg">&</span>
            <div className="w-12 h-px bg-beige" />
          </div>

          <div className="space-y-3">
            <p className="text-sm text-warm-gray">
              {config.bride.fatherName} · {config.bride.motherName}
              <span className="text-brown-light"> {config.bride.relation}</span>
            </p>
            <p className="font-serif text-2xl text-brown-dark">
              {config.bride.name}
            </p>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
