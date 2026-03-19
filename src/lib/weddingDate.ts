import { DateTime } from "luxon";

const ZONE = "Asia/Seoul";
const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"] as const;

/** config.datetime (ISO string) → luxon DateTime */
export function parseWeddingDate(datetime: string): DateTime {
  return DateTime.fromISO(datetime, { zone: ZONE });
}

/** "2026.10.31" */
export function formatDotDate(dt: DateTime): string {
  return dt.toFormat("yyyy.MM.dd");
}

/** "오전 11시" */
export function formatKoreanTime(dt: DateTime): string {
  const hour = dt.hour;
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour <= 12 ? hour : hour - 12;
  return `${period} ${displayHour}시`;
}

/** "2026년 10월 31일 토요일 오전 11시" */
export function formatKoreanFull(dt: DateTime): string {
  const dayName = DAY_NAMES[dt.weekday % 7]; // luxon: 1=Mon...7=Sun → %7 maps Sun(7) to 0
  return `${dt.year}년 ${dt.month}월 ${dt.day}일 ${dayName}요일 ${formatKoreanTime(dt)}`;
}

/** D-day 계산 */
export function calcDDay(dt: DateTime): number {
  const today = DateTime.now().setZone(ZONE).startOf("day");
  const wedding = dt.startOf("day");
  return Math.ceil(wedding.diff(today, "days").days);
}
