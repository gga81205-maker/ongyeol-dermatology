import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import TreatmentList from "@/components/TreatmentList";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/BookingContext";
import Image from "next/image";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />

        <Section id="about" num="01" title="소개">
          <p className="lead">
            더하기보다 덜어내는 진료.
            <br />
            피부가 스스로 회복하는 힘을 믿고, 필요한 순간에만 손을 보탭니다.
          </p>
          <ul className="grid-box grid-box--3">
            <li className="cell">
              <h3 className="cell__title">충분한 진단</h3>
              <p className="cell__text">시술보다 먼저 피부 상태와 생활 습관을 살핍니다.</p>
            </li>
            <li className="cell">
              <h3 className="cell__title">필요한 만큼</h3>
              <p className="cell__text">과한 패키지 대신 지금 피부에 맞는 것만 제안합니다.</p>
            </li>
            <li className="cell">
              <h3 className="cell__title">끝까지 관리</h3>
              <p className="cell__text">시술 이후의 회복과 홈케어까지 함께 봅니다.</p>
            </li>
          </ul>
        </Section>

        <Section id="treatments" num="02" title="진료">
          <TreatmentList />
        </Section>

        <Section id="doctor" num="03" title="의료진">
          <div className="doctor">
            <div className="doctor__photo">
              <Image
                src="/images/doctor.jpg"
                alt="한도윤 대표원장"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            <div className="doctor__body">
              <blockquote className="doctor__quote">
                “피부를 바꾸는 일은, 사람의 하루를 바꾸는 일이라 생각합니다.”
              </blockquote>
              <div>
                <p className="doctor__name">
                  한도윤 <span>대표원장</span>
                </p>
                <ul className="doctor__career">
                  <li>피부과 전문의</li>
                  <li>대학병원 피부과 전공의 수료</li>
                  <li>대한피부과학회 정회원</li>
                  <li>대한레이저피부모발학회 정회원</li>
                  <li>前 대학병원 피부과 임상강사</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="booking"
          num="04"
          title="예약"
          aside={
            <p className="section__note">
              온라인으로 예약하시면
              <br />
              확정 안내를 문자로 드립니다.
              <br />
              전화 02-0000-0000
            </p>
          }
        >
          <BookingForm />
        </Section>

        <Section id="info" num="05" title="안내">
          <div className="grid-box grid-box--2">
            <div className="cell">
              <h3 className="cell__heading">진료 시간</h3>
              <dl className="rows">
                <div><dt>평일</dt><dd>10:00 – 19:00</dd></div>
                <div><dt>주말</dt><dd>10:00 – 15:00</dd></div>
                <div><dt>공휴일</dt><dd className="muted">휴진</dd></div>
              </dl>
            </div>
            <div className="cell">
              <h3 className="cell__heading">오시는 길</h3>
              <dl className="rows">
                <div><dt>주소</dt><dd>서울특별시 강남구 온결로 12, 온결빌딩 5층</dd></div>
                <div><dt>전화</dt><dd>02-0000-0000</dd></div>
                <div><dt>주차</dt><dd>건물 지하 주차장 · 진료 시 2시간 무료</dd></div>
              </dl>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </BookingProvider>
  );
}
