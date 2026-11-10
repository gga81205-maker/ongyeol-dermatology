export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__logo">
          온결피부과
        </a>
        <nav aria-label="주요 메뉴" className="header__nav">
          <a href="#about">소개</a>
          <a href="#treatments">진료</a>
          <a href="#doctor">의료진</a>
          <a href="#info">안내</a>
          <a href="#booking" className="btn btn--sm">
            예약하기
          </a>
        </nav>
      </div>
    </header>
  );
}
