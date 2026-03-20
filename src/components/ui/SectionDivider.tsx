export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-6">
      <svg
        width="140"
        height="36"
        viewBox="0 0 200 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-sage-300 opacity-60"
      >
        {/* 왼쪽 곡선 */}
        <path
          d="M0 38 C30 38, 55 38, 78 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* 하트 */}
        <path
          d="M78 24 C74 16, 74 6, 84 4 C90 3, 96 6, 100 14 C104 6, 110 3, 116 4 C126 6, 126 16, 122 24 C118 32, 108 38, 100 44 C92 38, 82 32, 78 24Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* 오른쪽 곡선 */}
        <path
          d="M122 24 C145 38, 170 38, 200 38"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
