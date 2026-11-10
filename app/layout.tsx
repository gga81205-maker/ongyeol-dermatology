import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  weight: "45 920",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "온결피부과 | 피부의 결을 온전히 읽어내는 시간",
  description:
    "충분히 보고, 필요한 만큼만 권합니다. 리프팅, 색소, 여드름·흉터, 스킨부스터, 일반 피부 진료. 온라인으로 진료를 예약하세요.",
};

export const viewport: Viewport = {
  themeColor: "#faf9f7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
