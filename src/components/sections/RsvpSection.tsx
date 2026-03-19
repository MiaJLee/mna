"use client";

import { useState } from "react";
import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { submitRsvp, type RsvpFormData } from "@/lib/submitRsvp";

export default function RsvpSection({ config }: { config: WeddingConfig }) {
  const [form, setForm] = useState<RsvpFormData>({
    name: "",
    phone: "",
    attendance: "yes",
    guestCount: 1,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setStatus("loading");
    const result = await submitRsvp(form, config.googleScriptUrl);
    setStatus(result.success ? "success" : "error");
  };

  if (status === "success") {
    return (
      <section id="rsvp" className="w-full max-w-[430px] mx-auto px-6 py-12">
        <div className="bg-warm-white rounded-2xl p-8 text-center border border-beige/50">
          <span className="text-3xl mb-4 block">💌</span>
          <p className="font-serif text-lg text-brown-dark mb-2">
            감사합니다
          </p>
          <p className="text-sm text-brown">
            참석 여부가 전달되었습니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-2">
          참석 여부
        </h2>
        <p className="text-xs text-warm-gray text-center mb-8">
          축하의 자리에 함께해 주시겠습니까?
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll delay={100}>
        <form
          onSubmit={handleSubmit}
          className="bg-warm-white rounded-2xl p-6 border border-beige/50 space-y-4"
        >
          <div>
            <label className="text-xs text-brown-dark font-medium mb-1 block">
              이름 *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-cream border border-beige rounded-xl px-4 py-3 text-sm text-brown-dark outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400"
              placeholder="성함을 입력해주세요"
            />
          </div>

          <div>
            <label className="text-xs text-brown-dark font-medium mb-1 block">
              연락처 *
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-cream border border-beige rounded-xl px-4 py-3 text-sm text-brown-dark outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400"
              placeholder="연락처를 입력해주세요"
            />
          </div>

          <div>
            <label className="text-xs text-brown-dark font-medium mb-2 block">
              참석 여부 *
            </label>
            <div className="flex gap-3">
              {(["yes", "no"] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm({ ...form, attendance: val })}
                  className={`flex-1 py-3 rounded-xl text-sm transition-colors ${
                    form.attendance === val
                      ? "bg-sage-400 text-white"
                      : "bg-cream border border-beige text-brown"
                  }`}
                >
                  {val === "yes" ? "참석" : "불참"}
                </button>
              ))}
            </div>
          </div>

          {form.attendance === "yes" && (
            <>
              <div>
                <label className="text-xs text-brown-dark font-medium mb-1 block">
                  참석 인원
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.guestCount}
                  onChange={(e) =>
                    setForm({ ...form, guestCount: parseInt(e.target.value) || 1 })
                  }
                  className="w-full bg-cream border border-beige rounded-xl px-4 py-3 text-sm text-brown-dark outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400"
                />
              </div>

            </>
          )}

          <div>
            <label className="text-xs text-brown-dark font-medium mb-1 block">
              축하 메시지
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={3}
              className="w-full bg-cream border border-beige rounded-xl px-4 py-3 text-sm text-brown-dark outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400 resize-none"
              placeholder="축하 메시지를 남겨주세요 (선택)"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 bg-sage-500 text-white text-sm rounded-xl hover:bg-sage-600 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "전송 중..." : "전송하기"}
          </button>

          {status === "error" && (
            <p className="text-xs text-red-500 text-center">
              전송에 실패했습니다. 다시 시도해주세요.
            </p>
          )}
        </form>
      </AnimateOnScroll>
    </section>
  );
}
