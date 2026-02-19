"use client";

import { useMemo } from "react";
import type { WeddingConfig } from "@/types";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { generateIcs } from "@/lib/generateIcs";

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

export default function CalendarSection({
  config,
}: {
  config: WeddingConfig;
}) {
  const weddingDate = useMemo(() => new Date(config.date), [config.date]);
  const year = weddingDate.getFullYear();
  const month = weddingDate.getMonth();
  const weddingDay = weddingDate.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const dDay = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const wedding = new Date(config.date);
    wedding.setHours(0, 0, 0, 0);
    const diff = Math.ceil(
      (wedding.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  }, [config.date]);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [firstDayOfWeek, daysInMonth]);

  const handleAddToCalendar = () => {
    generateIcs(config.date, config.time, config.venue.name, config.venue.address);
  };

  return (
    <section id="calendar" className="w-full max-w-[430px] mx-auto px-6 py-12">
      <AnimateOnScroll>
        <h2 className="font-serif text-xl text-brown-dark text-center mb-8">
          {year}년 {month + 1}월
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll delay={100}>
        <div className="bg-warm-white rounded-2xl p-6 border border-beige/50">
          <div className="grid grid-cols-7 gap-1 mb-3">
            {DAY_NAMES.map((name, i) => (
              <div
                key={name}
                className={`text-center text-xs font-medium py-1 ${
                  i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-warm-gray"
                }`}
              >
                {name}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const isWeddingDay = day === weddingDay;
              const dayOfWeek = idx % 7;
              return (
                <div
                  key={idx}
                  className={`text-center py-2 text-sm rounded-full ${
                    isWeddingDay
                      ? "bg-sage-400 text-white font-bold"
                      : day
                        ? dayOfWeek === 0
                          ? "text-red-400"
                          : dayOfWeek === 6
                            ? "text-blue-400"
                            : "text-brown"
                        : ""
                  }`}
                >
                  {day || ""}
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-brown mb-1">{config.timeDetail}</p>
            <p className="text-lg font-serif text-sage-600 mt-2">
              {dDay > 0
                ? `D-${dDay}`
                : dDay === 0
                  ? "D-Day"
                  : `D+${Math.abs(dDay)}`}
            </p>
          </div>

          <button
            onClick={handleAddToCalendar}
            className="mt-5 w-full py-3 bg-sage-100 text-sage-700 text-sm rounded-xl hover:bg-sage-200 transition-colors"
          >
            📅 캘린더에 추가하기
          </button>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
