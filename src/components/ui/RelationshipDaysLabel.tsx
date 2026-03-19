"use client";

import { calcRelationshipDays } from "@/lib/weddingDate";

export default function RelationshipDaysLabel({
  startDate,
  className = "",
  formatLabel,
}: {
  startDate: string;
  className?: string;
  formatLabel?: (days: number) => string;
}) {
  const days = calcRelationshipDays(startDate);
  const label = formatLabel ? formatLabel(days) : `연애 기간 ${days.toLocaleString()}일`;
  return (
    <span className={className}>
      {label}
    </span>
  );
}
