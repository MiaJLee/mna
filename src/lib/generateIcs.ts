import { parseWeddingDate } from "@/lib/weddingDate";

function formatIcsDate(dt: ReturnType<typeof parseWeddingDate>) {
  return dt.toFormat("yyyyMMdd'T'HHmmss");
}

/** .ics 파일 다운로드 → iOS/macOS는 캘린더 앱, Android는 Google Calendar로 열림 */
export function generateIcs(
  datetime: string,
  venueName: string,
  address: string
): void {
  const dt = parseWeddingDate(datetime);
  const endDt = dt.plus({ hours: 2 });

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//KR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@wedding-invitation
DTSTAMP:${formatIcsDate(dt)}
DTSTART;TZID=Asia/Seoul:${formatIcsDate(dt)}
DTEND;TZID=Asia/Seoul:${formatIcsDate(endDt)}
SUMMARY:${venueName} 결혼식
DESCRIPTION:결혼식에 초대합니다
LOCATION:${address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

/** Google Calendar URL 생성 → 브라우저에서 Google Calendar 앱/웹으로 바로 열림 */
export function getGoogleCalendarUrl(
  datetime: string,
  venueName: string,
  address: string
): string {
  const dt = parseWeddingDate(datetime);
  const endDt = dt.plus({ hours: 2 });

  const fmt = (d: typeof dt) => d.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${venueName} 결혼식`,
    dates: `${fmt(dt)}/${fmt(endDt)}`,
    details: "결혼식에 초대합니다",
    location: address,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
