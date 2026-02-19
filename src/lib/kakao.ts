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

export function initKakao(apiKey: string): void {
  if (
    typeof window !== "undefined" &&
    window.Kakao &&
    !window.Kakao.isInitialized()
  ) {
    window.Kakao.init(apiKey);
  }
}

export function shareKakao(config: {
  title: string;
  description: string;
  imageUrl: string;
  webUrl: string;
}): void {
  if (typeof window === "undefined" || !window.Kakao) return;

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
        title: "청첩장 보기",
        link: {
          mobileWebUrl: config.webUrl,
          webUrl: config.webUrl,
        },
      },
    ],
  });
}

export {};
