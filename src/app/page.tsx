import { Suspense } from "react";
import PageRouter from "@/components/PageRouter";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <p className="text-brown font-serif animate-pulse">Loading...</p>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PageRouter />
    </Suspense>
  );
}
