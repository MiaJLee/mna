declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

/** 카카오 SDK 초기화 (중복 호출 안전) */
export function initKakao(apiKey: string): void {
  if (
    typeof window !== "undefined" &&
    window.Kakao &&
    !window.Kakao.isInitialized()
  ) {
    window.Kakao.init(apiKey);
  }
}

/** 카카오톡 공유하기 */
export function shareKakao(config: {
  title: string;
  description: string;
  imageUrl: string;
  webUrl: string;
  buttonLabel?: string;
}): void {
  if (typeof window === "undefined" || !window.Kakao) return;

  // SDK가 초기화되지 않은 경우 env에서 키를 가져와 초기화
  if (!window.Kakao.isInitialized()) {
    const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!key) return;
    window.Kakao.init(key);
  }

  window.Kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title: config.title,
      description: config.description,
      imageUrl: config.imageUrl,
      link: {
        mobileWebUrl: config.webUrl,
        webUrl: config.webUrl,
      },
    },
    buttons: [
      {
        title: config.buttonLabel ?? "모바일 청첩장 보기",
        link: {
          mobileWebUrl: config.webUrl,
          webUrl: config.webUrl,
        },
      },
    ],
    installTalk: true,
  });
}

export {};
