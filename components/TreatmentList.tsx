"use client";

import { TREATMENTS } from "@/lib/booking";
import { useBooking } from "./BookingContext";

export default function TreatmentList() {
  const { setTreatment, setDoneId } = useBooking();

  return (
    <ul className="grid-box">
      {TREATMENTS.map((t) => (
        <li key={t.id}>
          <a
            href="#booking"
            className="treatment"
            onClick={() => {
              setTreatment(t.id);
              setDoneId("");
            }}
          >
            <span className="treatment__name">{t.name}</span>
            <span className="treatment__desc">{t.desc}</span>
            <span className="treatment__cta" aria-hidden="true">
              예약 →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
