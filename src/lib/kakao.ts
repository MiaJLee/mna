declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          scope: string;
          success: (response: { access_token: string }) => void;
          fail: (error: unknown) => void;
        }) => void;
        getAccessToken: () => string | null;
      };
      API: {
        request: (options: {
          url: string;
          data?: Record<string, unknown>;
          success?: (response: unknown) => void;
          fail?: (error: unknown) => void;
        }) => void;
      };
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

/** 카카오 로그인 후 톡캘린더에 일정 생성 */
export function addToKakaoCalendar(config: {
  title: string;
  description: string;
  startAt: string; // ISO 8601 UTC (e.g. "2026-10-31T02:00:00Z")
  endAt: string;
  location: string;
}): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.Kakao || !window.Kakao.isInitialized()) {
      resolve(false);
      return;
    }

    const createEvent = () => {
      window.Kakao.API.request({
        url: "/v2/api/calendar/create/event",
        data: {
          event: JSON.stringify({
            title: config.title,
            time: {
              start_at: config.startAt,
              end_at: config.endAt,
              time_zone: "Asia/Seoul",
              all_day: false,
            },
            description: config.description,
            location: { name: config.location },
            reminders: [30],
          }),
        },
        success: () => resolve(true),
        fail: () => resolve(false),
      });
    };

    // 이미 토큰이 있으면 바로 호출
    if (window.Kakao.Auth.getAccessToken()) {
      createEvent();
      return;
    }

    // 카카오 로그인 → 캘린더 동의 → 일정 생성
    window.Kakao.Auth.login({
      scope: "talk_calendar",
      success: () => createEvent(),
      fail: () => resolve(false),
    });
  });
}

export {};
