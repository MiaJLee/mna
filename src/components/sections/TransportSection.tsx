import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const icons: Record<string, string> = {
  subway: "🚇",
  bus: "🚌",
  car: "🚗",
  shuttle: "🅿️",
};

export default function TransportSection({
  config,
}: {
  config: WeddingConfig;
}) {
  return (
    <section id="transport" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-8">
          오시는 길
        </h2>
      </AnimateOnScroll>

      <div className="space-y-3">
        {config.transport.map((item, idx) => (
          <AnimateOnScroll key={idx} delay={idx * 100}>
            <div className="bg-warm-white rounded-xl p-5 border border-beige/50">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">
                  {icons[item.type] || "📍"}
                </span>
                <div>
                  <h3 className="text-sm font-medium text-brown-dark mb-2">
                    {item.title}
                  </h3>
                  <ul className="space-y-1">
                    {item.details.map((detail, i) => (
                      <li
                        key={i}
                        className="text-xs text-brown leading-relaxed"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
