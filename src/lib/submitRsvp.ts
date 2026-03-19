export interface RsvpFormData {
  name: string;
  phone: string;
  attendance: "yes" | "no";
}

export async function submitRsvp(
  data: RsvpFormData,
  scriptUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // application/x-www-form-urlencoded → Google Apps Script doPost(e) e.parameter에서 수신
    const body = new URLSearchParams({
      name: data.name,
      phone: data.phone,
      attendance: data.attendance === "yes" ? "참석" : "불참",
      timestamp: new Date().toLocaleString("ko-KR"),
    });

    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    return { success: true };
  } catch {
    return { success: false, error: "네트워크 오류가 발생했습니다. 다시 시도해주세요." };
  }
}
