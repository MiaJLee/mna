"use client";

import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import WeddingContent from "@/components/WeddingContent";

const GameApp = dynamic(() => import("@/components/game/GameApp"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-cream flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-3 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
      <p className="text-brown font-serif animate-pulse">Loading Game...</p>
    </div>
  ),
});

export default function PageRouter() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  if (type === "game") {
    return <GameApp />;
  }

  return <WeddingContent />;
}
