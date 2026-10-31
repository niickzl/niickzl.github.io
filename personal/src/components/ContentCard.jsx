export default function ContentCard({
  id,
  title,
  subtitle,
  date,
  marker,
  logo,
  className = '',
  bodyClassName = '',
  children,
}) {
  const classNames = ['content-card', marker && 'has-marker', className]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classNames} id={id}>
      <header className="content-card-header">
        {marker && <span className="content-card-marker">{marker}</span>}
        <div className="content-card-identity">
          {logo && <img className="content-card-logo" src={logo} alt="" />}
          <div className="content-card-title">
            <h2>{title}</h2>
            {subtitle && <div className="content-card-subtitle">{subtitle}</div>}
          </div>
        </div>
        {date && <div className="content-card-date">{date}</div>}
      </header>
      <div className={`content-card-body${bodyClassName ? ` ${bodyClassName}` : ''}`}>
        {children}
      </div>
    </article>
  );
}
