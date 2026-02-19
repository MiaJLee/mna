"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: new (lat: number, lng: number) => unknown;
        Map: new (
          container: HTMLElement,
          options: { center: unknown; level: number }
        ) => unknown;
        Marker: new (options: { position: unknown }) => {
          setMap: (map: unknown) => void;
        };
        InfoWindow: new (options: {
          content: string;
        }) => { open: (map: unknown, marker: unknown) => void };
      };
    };
  }
}

interface KakaoMapClientProps {
  lat: number;
  lng: number;
  venueName: string;
}

export default function KakaoMapClient({
  lat,
  lng,
  venueName,
}: KakaoMapClientProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao?.maps) return;

    window.kakao.maps.load(() => {
      if (!mapRef.current) return;
      const position = new window.kakao.maps.LatLng(lat, lng);
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: position,
        level: 3,
      });

      const marker = new window.kakao.maps.Marker({ position });
      marker.setMap(map);

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div style="padding:5px 10px;font-size:12px;white-space:nowrap;">${venueName}</div>`,
      });
      infoWindow.open(map, marker);
    });
  }, [lat, lng, venueName]);

  return (
    <div ref={mapRef} className="w-full h-64 bg-sage-50">
      <div className="w-full h-full flex items-center justify-center text-warm-gray text-sm">
        지도를 불러오는 중...
      </div>
    </div>
  );
}
