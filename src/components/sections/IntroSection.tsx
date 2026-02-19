import Image from "next/image";
import type { WeddingConfig } from "@/types";
import { withBasePath } from "@/config/basePath";

export default function IntroSection({ config }: { config: WeddingConfig }) {
  const dateObj = new Date(config.date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return (
    <section
      id="intro"
      className="relative h-dvh w-full overflow-hidden lg:h-full lg:min-h-screen"
    >
      <Image
        src={withBasePath("/images/hero.jpg")}
        alt="웨딩 사진"
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 33vw, 100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-6 text-white lg:justify-center lg:pb-0">
        <p className="text-sm tracking-[0.3em] mb-4 opacity-80 font-light">
          WEDDING INVITATION
        </p>
        <h1 className="font-serif text-3xl mb-3 tracking-wide">
          {config.groom.name}
          <span className="mx-3 text-lg opacity-70">&</span>
          {config.bride.name}
        </h1>
        <p className="text-sm opacity-80 tracking-wider">
          {year}.{String(month).padStart(2, "0")}.
          {String(day).padStart(2, "0")} {config.time}
        </p>
        <p className="text-xs opacity-60 mt-2">
          {config.venue.name} {config.venue.hall}
        </p>

        {/* 모바일에서만 스크롤 화살표 */}
        <div className="mt-10 animate-bounce opacity-50 lg:hidden">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
