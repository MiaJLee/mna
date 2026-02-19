export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-6">
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-sage-300 opacity-60"
      >
        <path
          d="M60 4C55 4 50 8 45 10C40 12 35 12 30 10C25 8 22 6 18 8C14 10 12 14 10 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M60 4C65 4 70 8 75 10C80 12 85 12 90 10C95 8 98 6 102 8C106 10 108 14 110 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="60" cy="4" r="2" fill="currentColor" opacity="0.5" />
        <path
          d="M56 12L60 20L64 12"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
