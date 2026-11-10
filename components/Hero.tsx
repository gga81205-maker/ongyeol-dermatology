import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__media">
        <Image
          src="/images/hero.jpg"
          alt="맑은 피부의 여성이 미소 짓는 모습"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="container hero__content">
        <h1 id="hero-title" className="hero__title">
          피부의 결을
          <br />
          온전히 읽어내는 시간
        </h1>
        <div className="hero__side">
          <p className="hero__sub">충분히 보고, 필요한 만큼만 권합니다.</p>
          <a href="#booking" className="btn">
            진료 예약하기
          </a>
        </div>
      </div>
    </section>
  );
}
