import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { weddingConfig } from "@/config/wedding";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(weddingConfig.siteUrl || "https://example.github.io/mna"),
  title: `${weddingConfig.groom.name} ♥ ${weddingConfig.bride.name} 결혼합니다`,
  description: `${weddingConfig.timeDetail} | ${weddingConfig.venue.name} ${weddingConfig.venue.hall}`,
  openGraph: {
    title: `${weddingConfig.groom.name} ♥ ${weddingConfig.bride.name} 결혼합니다`,
    description: `${weddingConfig.timeDetail} | ${weddingConfig.venue.name}`,
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
