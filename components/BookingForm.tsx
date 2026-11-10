"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  PHONE_RE,
  TREATMENTS,
  formatDate,
  formatPhone,
  getToday,
  slotsFor,
  type Today,
} from "@/lib/booking";
import { useBooking } from "./BookingContext";
import Calendar from "./Calendar";

export default function BookingForm() {
  const { treatment, setTreatment, doneId, setDoneId } = useBooking();

  // 날짜는 접속 시점(브라우저) 기준으로 계산해야 하므로 마운트 후에 설정
  const [today, setToday] = useState<Today | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [memo, setMemo] = useState("");
  const [agree, setAgree] = useState(false);
  const [tried, setTried] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setToday(getToday());
  }, []);

  useEffect(() => {
    if (doneId) doneRef.current?.focus();
  }, [doneId]);

  const tx = TREATMENTS.find((t) => t.id === treatment);
  const errs = {
    treatment: !tx,
    when: !date || !time,
    name: name.trim().length < 2,
    phone: !PHONE_RE.test(phone),
    agree: !agree,
  };
  const valid = !Object.values(errs).some(Boolean);
  const show = (key: keyof typeof errs) => tried && errs[key];

  const summary =
    tx || date
      ? `${tx ? tx.name : "진료 미선택"}  ·  ${date ? `${formatDate(date)} ${time}` : "일시 미선택"}`
      : "진료와 일시를 선택해 주세요.";

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!valid) {
      setTried(true);
      return;
    }
    // 포트폴리오용 데모: 서버로 전송하지 않고 화면에서만 접수 처리합니다.
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    setDoneId(`OG-${date.slice(2).replace(/-/g, "")}-${rand}`);
  }

  function reset() {
    setTreatment("");
    setDoneId("");
    setDate("");
    setTime("");
    setName("");
    setPhone("");
    setMemo("");
    setAgree(false);
    setTried(false);
  }

  if (doneId) {
    return (
      <div className="booking-done" role="status">
        <h3 ref={doneRef} tabIndex={-1} className="booking-done__title">
          예약이 접수되었습니다.
        </h3>
        <dl className="rows booking-done__rows">
          <div><dt>예약번호</dt><dd className="strong">{doneId}</dd></div>
          <div><dt>진료</dt><dd className="strong">{tx?.name}</dd></div>
          <div><dt>일시</dt><dd className="strong">{date && `${formatDate(date)} ${time}`}</dd></div>
          <div><dt>예약자</dt><dd className="strong">{name} · {phone}</dd></div>
        </dl>
        <p className="booking-done__note">
          포트폴리오용 데모 화면으로, 실제 예약은 접수되지 않으며 입력하신 정보는 저장·전송되지 않습니다.
        </p>
        <button type="button" className="btn btn--outline" onClick={reset}>
          새 예약하기
        </button>
      </div>
    );
  }

  const slots = date && today ? slotsFor(date, today) : [];

  return (
    <form className="grid-box booking" noValidate onSubmit={handleSubmit}>
      {/* 1 진료 */}
      <fieldset className="cell booking__step">
        <legend className="step-title"><span>1</span>진료 항목</legend>
        <div className="chips">
          {TREATMENTS.map((t) => (
            <label key={t.id} className="chip">
              <input
                type="radio"
                name="treatment"
                value={t.id}
                checked={treatment === t.id}
                onChange={() => setTreatment(t.id)}
              />
              <span>{t.name}</span>
            </label>
          ))}
        </div>
        {show("treatment") && <p className="error">진료 항목을 선택해 주세요.</p>}
      </fieldset>

      {/* 2 날짜 / 3 시간 */}
      <div className="cell booking__when">
        <div className="booking__date">
          <p className="step-title"><span>2</span>날짜</p>
          {today ? (
            <Calendar
              today={today}
              value={date}
              onChange={(key) => {
                setDate(key);
                setTime("");
              }}
            />
          ) : (
            <div className="calendar calendar--loading" aria-hidden="true" />
          )}
        </div>
        <fieldset className="booking__time">
          <legend className="step-title step-title--row">
            <span>3</span>시간
            {date && <em>{formatDate(date)}</em>}
          </legend>
          {!date && <p className="muted">날짜를 먼저 선택해 주세요.</p>}
          <div className="slots">
            {slots.map((s) => (
              <label key={s} className="chip chip--slot">
                <input
                  type="radio"
                  name="time"
                  value={s}
                  checked={time === s}
                  onChange={() => setTime(s)}
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
          {show("when") && <p className="error">날짜와 시간을 선택해 주세요.</p>}
        </fieldset>
      </div>

      {/* 4 정보 */}
      <fieldset className="cell booking__step">
        <legend className="step-title"><span>4</span>예약자 정보</legend>
        <div className="fields">
          <label className="field">
            <span className="field__label">성함</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="홍길동"
              value={name}
              aria-invalid={show("name") || undefined}
              onChange={(e) => setName(e.target.value)}
            />
            {show("name") && <span className="error">성함을 입력해 주세요.</span>}
          </label>
          <label className="field">
            <span className="field__label">연락처</span>
            <input
              type="tel"
              name="phone"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="010-0000-0000"
              value={phone}
              aria-invalid={show("phone") || undefined}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
            />
            {show("phone") && <span className="error">휴대폰 번호를 확인해 주세요.</span>}
          </label>
          <label className="field field--full">
            <span className="field__label">
              요청 사항 <small>선택</small>
            </span>
            <textarea
              name="memo"
              rows={2}
              placeholder="고민 부위나 이전 시술 경험"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </label>
        </div>
        <label className={`agree${show("agree") ? " agree--error" : ""}`}>
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          개인정보 수집·이용 동의 (필수)
        </label>
        <p className="agree__note">성함·연락처를 예약 안내 목적으로만 사용합니다.</p>
      </fieldset>

      {/* 제출 */}
      <div className="cell booking__submit">
        <p className={`booking__summary${tx || date ? "" : " muted"}`} aria-live="polite">
          {summary}
        </p>
        <button type="submit" className="btn btn--wide">
          예약하기
        </button>
      </div>
    </form>
  );
}
