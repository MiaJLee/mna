import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export default function FlowerDeclineSection({
  config,
}: {
  config: WeddingConfig;
}) {
  return (
    <section id="flower-decline" className="w-full max-w-[430px] mx-auto px-6 py-10">
      <AnimateOnScroll>
        <div className="bg-ivory rounded-2xl p-8 text-center border border-beige/30">
          <span className="text-2xl mb-4 block">🌿</span>
          <p className="text-sm text-brown leading-7 whitespace-pre-line">
            {config.flowerDeclineMessage}
          </p>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
