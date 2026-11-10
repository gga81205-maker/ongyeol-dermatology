export type Treatment = { id: string; name: string; desc: string };

export const TREATMENTS: Treatment[] = [
  { id: "lifting", name: "리프팅 · 탄력", desc: "처진 윤곽과 탄력 저하를 피부 깊이에 맞춰 다룹니다." },
  { id: "pigment", name: "색소 · 톤", desc: "기미, 잡티, 홍조 등 고르지 않은 피부 톤을 정돈합니다." },
  { id: "acne", name: "여드름 · 흉터", desc: "염증 관리부터 흉터 개선까지 단계적으로 회복합니다." },
  { id: "texture", name: "스킨부스터", desc: "수분과 밀도를 채워 매끈한 피부 결을 만듭니다." },
  { id: "medical", name: "일반 피부 진료", desc: "아토피, 습진, 두드러기 등 피부 질환을 진료합니다." },
];

/** 오늘부터 예약 가능한 기간(일) */
export const BOOKING_WINDOW_DAYS = 60;

const OPEN_MIN = 10 * 60;
const CLOSE_WEEKDAY_MIN = 19 * 60;
const CLOSE_WEEKEND_MIN = 15 * 60;
const SLOT_MIN = 30;
const KST_OFFSET_MS = 9 * 3600000;

export type Today = { y: number; m: number; d: number; min: number };

/** 한국 시간 기준 오늘 (m은 0부터 시작) */
export function getToday(): Today {
  const d = new Date(Date.now() + KST_OFFSET_MS);
  return {
    y: d.getUTCFullYear(),
    m: d.getUTCMonth(),
    d: d.getUTCDate(),
    min: d.getUTCHours() * 60 + d.getUTCMinutes(),
  };
}

/** "YYYY-MM-DD" 형식 키 (m은 0부터 시작) */
export function dateKey(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function dayOfWeek(key: string): number {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function formatDate(key: string): string {
  const [, m, d] = key.split("-").map(Number);
  return `${m}월 ${d}일 (${"일월화수목금토"[dayOfWeek(key)]})`;
}

/** 해당 날짜에 예약 가능한 시간대. 오늘은 현재 시각 +30분 이후만. */
export function slotsFor(key: string, today: Today): string[] {
  const wd = dayOfWeek(key);
  const close = wd === 0 || wd === 6 ? CLOSE_WEEKEND_MIN : CLOSE_WEEKDAY_MIN;
  const isToday = key === dateKey(today.y, today.m, today.d);
  const out: string[] = [];
  for (let m = OPEN_MIN; m <= close - SLOT_MIN; m += SLOT_MIN) {
    if (isToday && m <= today.min + SLOT_MIN) continue;
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}

export function formatPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

export const PHONE_RE = /^01[016789]-?\d{3,4}-?\d{4}$/;
