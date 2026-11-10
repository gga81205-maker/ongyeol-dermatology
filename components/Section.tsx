type SectionProps = {
  id: string;
  num: string;
  title: string;
  /** 섹션 제목 아래에 붙는 보조 문구 */
  aside?: React.ReactNode;
  children: React.ReactNode;
};

export default function Section({ id, num, title, aside, children }: SectionProps) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container section__inner">
        <div className="section__label">
          <p className="section__num">{num}</p>
          <h2 id={`${id}-title`} className="section__title">
            {title}
          </h2>
          {aside}
        </div>
        <div className="section__body">{children}</div>
      </div>
    </section>
  );
}
