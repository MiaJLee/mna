import { DateTime } from "luxon";
import type { Locale } from "@/types";

const ZONE = "Asia/Seoul";
const DAY_NAMES_KO = ["일", "월", "화", "수", "목", "금", "토"] as const;
const DAY_NAMES_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

/** config.datetime (ISO string) → luxon DateTime */
export function parseWeddingDate(datetime: string): DateTime {
  return DateTime.fromISO(datetime, { zone: ZONE });
}

/** "2026.10.31" */
export function formatDotDate(dt: DateTime): string {
  return dt.toFormat("yyyy.MM.dd");
}

/** "오전 11시" / "11:00 AM" */
export function formatTime(dt: DateTime, locale: Locale = "ko"): string {
  if (locale === "en") {
    const hour = dt.hour;
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${String(dt.minute).padStart(2, "0")} ${period}`;
  }
  const hour = dt.hour;
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour <= 12 ? hour : hour - 12;
  return `${period} ${displayHour}시`;
}

/** "2026년 10월 31일 토요일 오전 11시" / "Saturday, October 31, 2026 at 11:00 AM" */
export function formatFull(dt: DateTime, locale: Locale = "ko"): string {
  if (locale === "en") {
    const dayName = DAY_NAMES_EN[dt.weekday % 7];
    const monthName = dt.toFormat("MMMM");
    return `${dayName}, ${monthName} ${dt.day}, ${dt.year} at ${formatTime(dt, "en")}`;
  }
  const dayName = DAY_NAMES_KO[dt.weekday % 7];
  return `${dt.year}년 ${dt.month}월 ${dt.day}일 ${dayName}요일 ${formatTime(dt, "ko")}`;
}

/** 요일 없이 짧은 형태 "2026년 10월 31일 오전 11시" / "October 31, 2026 at 11:00 AM" */
export function formatShort(dt: DateTime, locale: Locale = "ko"): string {
  if (locale === "en") {
    const monthName = dt.toFormat("MMMM");
    return `${monthName} ${dt.day}, ${dt.year} at ${formatTime(dt, "en")}`;
  }
  return `${dt.year}년 ${dt.month}월 ${dt.day}일 ${formatTime(dt, "ko")}`;
}

/** 캘린더 헤더 "2026년 10월" / "October 2026" */
export function formatCalendarHeader(dt: DateTime, locale: Locale = "ko"): string {
  if (locale === "en") {
    return dt.toFormat("MMMM yyyy");
  }
  return `${dt.year}년 ${dt.month}월`;
}

/** D-day 계산 */
export function calcDDay(dt: DateTime): number {
  const today = DateTime.now().setZone(ZONE).startOf("day");
  const wedding = dt.startOf("day");
  return Math.ceil(wedding.diff(today, "days").days);
}

/** 연애 시작일(해당일 = 1일) 기준 오늘까지 경과 일수 */
export function calcRelationshipDays(startDate: string): number {
  const start = DateTime.fromISO(startDate, { zone: ZONE }).startOf("day");
  const today = DateTime.now().setZone(ZONE).startOf("day");
  const diff = today.diff(start, "days").days;
  return Math.max(1, Math.floor(diff) + 1);
}
