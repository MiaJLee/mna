import { parseWeddingDate } from "@/lib/weddingDate";

export function generateIcs(
  datetime: string,
  venueName: string,
  address: string
): void {
  const dt = parseWeddingDate(datetime);
  const endDt = dt.plus({ hours: 2 });

  const formatDate = (d: typeof dt) =>
    d.toFormat("yyyyMMdd'T'HHmmss");

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//KR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@wedding-invitation
DTSTAMP:${formatDate(dt)}
DTSTART;TZID=Asia/Seoul:${formatDate(dt)}
DTEND;TZID=Asia/Seoul:${formatDate(endDt)}
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
