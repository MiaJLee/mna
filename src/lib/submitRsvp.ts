export interface RsvpFormData {
  name: string;
  phone: string;
  attendance: "yes" | "no";
  guestCount: number;
  mealPreference: string;
  message: string;
}

export async function submitRsvp(
  data: RsvpFormData,
  scriptUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("attendance", data.attendance === "yes" ? "참석" : "불참");
    formData.append("guestCount", String(data.guestCount));
    formData.append("mealPreference", data.mealPreference);
    formData.append("message", data.message);
    formData.append("timestamp", new Date().toLocaleString("ko-KR"));

    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    return { success: true };
  } catch {
    return { success: false, error: "네트워크 오류가 발생했습니다. 다시 시도해주세요." };
  }
}
