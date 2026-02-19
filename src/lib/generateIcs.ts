export function generateIcs(
  date: string,
  time: string,
  venueName: string,
  address: string
): void {
  const weddingDate = new Date(date);
  const hourMatch = time.match(/(\d+)/);
  let hour = hourMatch ? parseInt(hourMatch[1]) : 14;
  if (time.includes("오후") && hour < 12) hour += 12;

  weddingDate.setHours(hour, 0, 0, 0);

  const endDate = new Date(weddingDate);
  endDate.setHours(hour + 2);

  const formatDate = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  };

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//KR
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${Date.now()}@wedding-invitation
DTSTAMP:${formatDate(new Date())}
DTSTART;TZID=Asia/Seoul:${formatDate(weddingDate)}
DTEND;TZID=Asia/Seoul:${formatDate(endDate)}
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
