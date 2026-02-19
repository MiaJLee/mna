"use client";

import { useState, type ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  badge,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-beige rounded-xl overflow-hidden bg-warm-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-brown-dark">{title}</span>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-sage-100 text-sage-600">
              {badge}
            </span>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-warm-gray transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 pb-4 text-sm text-brown leading-relaxed border-t border-beige/50 pt-3">
          {children}
        </div>
      </div>
    </div>
  );
}
