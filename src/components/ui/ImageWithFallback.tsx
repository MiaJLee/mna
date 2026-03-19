"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { withBasePath } from "@/config/basePath";

const FALLBACK_IMAGE = "/images/hero.jpg";

export default function ImageWithFallback(props: ImageProps) {
  const [src, setSrc] = useState(props.src);

  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc(withBasePath(FALLBACK_IMAGE))}
    />
  );
}
