"use client";

import { calcRelationshipDays } from "@/lib/weddingDate";

export default function RelationshipDaysLabel({
  startDate,
  className = "",
}: {
  startDate: string;
  className?: string;
}) {
  const days = calcRelationshipDays(startDate);
  return (
    <span className={className}>
      연애 기간 {days.toLocaleString()}일
    </span>
  );
}
