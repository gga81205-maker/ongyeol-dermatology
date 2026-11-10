"use client";

import { useState } from "react";
import { BOOKING_WINDOW_DAYS, dateKey, formatDate, slotsFor, type Today } from "@/lib/booking";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

type CalendarProps = {
  today: Today;
  value: string;
  onChange: (key: string) => void;
};

export default function Calendar({ today, value, onChange }: CalendarProps) {
  const [view, setView] = useState({ y: today.y, m: today.m });

  const todayKey = dateKey(today.y, today.m, today.d);
  const max = new Date(Date.UTC(today.y, today.m, today.d + BOOKING_WINDOW_DAYS));
  const maxKey = dateKey(max.getUTCFullYear(), max.getUTCMonth(), max.getUTCDate());

  // 월 단위 인덱스로 이동 가능 범위를 계산
  const viewIdx = view.y * 12 + view.m;
  const minIdx = today.y * 12 + today.m;
  const maxIdx = max.getUTCFullYear() * 12 + max.getUTCMonth();
  const shift = (n: number) => {
    const k = viewIdx + n;
    if (k < minIdx || k > maxIdx) return;
    setView({ y: Math.floor(k / 12), m: k % 12 });
  };

  const firstDow = new Date(Date.UTC(view.y, view.m, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();

  return (
    <div className="calendar">
      <div className="calendar__head">
        <button
          type="button"
          className="calendar__nav"
          aria-label="이전 달"
          disabled={viewIdx <= minIdx}
          onClick={() => shift(-1)}
        >
          ‹
        </button>
        <p className="calendar__month" aria-live="polite">
          {view.y}년 {view.m + 1}월
        </p>
        <button
          type="button"
          className="calendar__nav"
          aria-label="다음 달"
          disabled={viewIdx >= maxIdx}
          onClick={() => shift(1)}
        >
          ›
        </button>
      </div>
      <div className="calendar__grid">
        {WEEKDAYS.map((w) => (
          <span key={w} className="calendar__weekday" aria-hidden="true">
            {w}
          </span>
        ))}
        {Array.from({ length: firstDow }, (_, i) => (
          <span key={`blank-${i}`} aria-hidden="true" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const key = dateKey(view.y, view.m, i + 1);
          const open = key >= todayKey && key <= maxKey && slotsFor(key, today).length > 0;
          return (
            <button
              key={key}
              type="button"
              className="calendar__day"
              aria-label={formatDate(key)}
              aria-pressed={key === value}
              data-today={key === todayKey || undefined}
              disabled={!open}
              onClick={() => onChange(key)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
