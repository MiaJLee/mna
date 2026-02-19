"use client";

import { useState, useCallback } from "react";
import Toast from "./Toast";

interface CopyButtonProps {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label = "복사" }: CopyButtonProps) {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setShowToast(true);
  }, [text]);

  return (
    <>
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 text-xs bg-sage-100 text-sage-700 rounded-lg hover:bg-sage-200 transition-colors"
      >
        {label}
      </button>
      <Toast
        message="복사 완료!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
