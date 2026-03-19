import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { weddingConfig } from "@/config/wedding";
import { parseWeddingDate, formatFull } from "@/lib/weddingDate";
import "./globals.css";

const weddingDateStr = formatFull(parseWeddingDate(weddingConfig.datetime), "ko");

export const metadata: Metadata = {
  metadataBase: new URL(weddingConfig.siteUrl || "https://example.github.io/mna"),
  title: `${weddingConfig.groom.name} ♥ ${weddingConfig.bride.name} 결혼합니다`,
  description: `${weddingDateStr} | ${weddingConfig.venue.name} ${weddingConfig.venue.hall}`,
  openGraph: {
    title: `${weddingConfig.groom.name} ♥ ${weddingConfig.bride.name} 결혼합니다`,
    description: `${weddingDateStr} | ${weddingConfig.venue.name}`,
    images: [weddingConfig.ogImage],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Meow+Script&family=Monsieur+La+Doulaise&display=swap" rel="stylesheet" />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${weddingConfig.kakaoJsKey}&autoload=false`}
          strategy="beforeInteractive"
        />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-cream">
        {children}
      </body>
    </html>
  );
}
