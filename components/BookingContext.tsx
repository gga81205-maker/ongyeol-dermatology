"use client";

import { createContext, useContext, useState } from "react";

type BookingContextValue = {
  treatment: string;
  setTreatment: (id: string) => void;
  /** 접수 완료 시 예약번호, 미완료면 빈 문자열 */
  doneId: string;
  setDoneId: (id: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

/** 진료 목록(02)과 예약 폼(04)이 선택한 진료 항목을 공유하기 위한 컨텍스트 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [treatment, setTreatment] = useState("");
  const [doneId, setDoneId] = useState("");
  return (
    <BookingContext.Provider value={{ treatment, setTreatment, doneId, setDoneId }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
