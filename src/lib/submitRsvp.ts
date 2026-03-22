export interface RsvpFormData {
  name: string;
  phone: string;
  attendance: "yes" | "no";
}

export async function submitRsvp(
  data: RsvpFormData,
  formUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const body = new URLSearchParams({
      "entry.551156135": data.name,
      "entry.468161600": data.phone,
      "entry.1802314438": data.attendance === "yes" ? "참석" : "불참",
    });

    await fetch(formUrl, {
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
