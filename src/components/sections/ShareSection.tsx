"use client";

import { useEffect, useState, useCallback } from "react";
import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Toast from "@/components/ui/Toast";
import { initKakao, shareKakao } from "@/lib/kakao";
import { parseWeddingDate, formatFull } from "@/lib/weddingDate";

export default function ShareSection({ config }: { config: WeddingConfig }) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (config.kakaoJsKey && config.kakaoJsKey !== "PLACEHOLDER_KAKAO_JS_KEY") {
      initKakao(config.kakaoJsKey);
    }
  }, [config.kakaoJsKey]);

  const handleKakaoShare = () => {
    shareKakao({
      title: `${config.groom.name} ♥ ${config.bride.name} ${config.labels.shareMarrying}`,
      description: formatFull(parseWeddingDate(config.datetime), config.labels.locale) + " | " + config.venue.name,
      imageUrl: config.siteUrl + config.ogImage,
      webUrl: config.siteUrl,
    });
  };

  const handleCopyUrl = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(config.siteUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = config.siteUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setShowToast(true);
  }, [config.siteUrl]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.groom.name} ♥ ${config.bride.name} ${config.labels.shareInvite}`,
          text: formatFull(parseWeddingDate(config.datetime), config.labels.locale) + " | " + config.venue.name,
          url: config.siteUrl,
        });
      } catch {
        // User cancelled sharing
      }
    }
  };

  return (
    <section id="share" className="w-full max-w-[430px] mx-auto px-6 py-12 pb-20">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-8">
          {config.labels.shareTitle}
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleKakaoShare}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl shadow-sm hover:shadow-md transition-shadow">
              💬
            </div>
            <span className="text-xs text-brown">{config.labels.shareKakao}</span>
          </button>

          <button
            onClick={handleCopyUrl}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center text-2xl shadow-sm hover:shadow-md transition-shadow">
              🔗
            </div>
            <span className="text-xs text-brown">{config.labels.shareUrl}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 bg-ivory rounded-2xl flex items-center justify-center text-2xl shadow-sm hover:shadow-md transition-shadow border border-beige/50">
              📤
            </div>
            <span className="text-xs text-brown">{config.labels.shareNative}</span>
          </button>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-warm-gray">
            {config.coupleNameShort}
          </p>
        </div>
      </AnimateOnScroll>

      <Toast
        message={config.labels.shareCopied}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}
