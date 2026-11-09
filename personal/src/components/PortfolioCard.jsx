import { useEffect, useRef, useState } from 'react';
import ContentCard from './ContentCard.jsx';

function MediaLightbox({ image, video, alt, origin, onClose }) {
  const dialogRef = useRef(null);
  const closeTimer = useRef(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
      if (dialog?.open) dialog.close();
    };
  }, []);

  function requestClose() {
    if (closing) return;
    setClosing(true);
    closeTimer.current = window.setTimeout(onClose, 320);
  }

  return (
    <dialog
      ref={dialogRef}
      className={`lightbox${closing ? ' is-closing' : ''}`}
      aria-label="Expanded project media"
      inert={closing}
      style={{
        '--trigger-x': `${origin.x}px`,
        '--trigger-y': `${origin.y}px`,
      }}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) requestClose();
      }}
    >
      {video ? (
        <video
          className="lightbox-media"
          src={video}
          aria-label={alt}
          controls
          autoPlay
          loop
          onClick={(event) => event.stopPropagation()}
        />
      ) : (
        <img
          className="lightbox-media"
          src={image}
          alt={alt}
          onClick={(event) => event.stopPropagation()}
        />
      )}
      <button className="lightbox-close" type="button" onClick={requestClose}>
        Close
      </button>
    </dialog>
  );
}

export default function PortfolioCard({ item, kind = 'project', id }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxOrigin, setLightboxOrigin] = useState({ x: 0, y: 0 });
  const isCompetition = kind === 'competition';
  const mediaUrl = item.image ? `/personal/${item.image}` : undefined;

  return (
    <ContentCard
      bodyClassName={item.image ? 'has-media' : ''}
      id={id || `section-${item.number}`}
      title={item.title}
      marker={item.number}
      subtitle={[item.category, item.organization].filter(Boolean).join(' · ')}
      date={<time>{item.date}</time>}
    >
      <div className="portfolio-copy">
        <p>{item.background}</p>
        {item.idea && <h3>{isCompetition ? 'Our idea' : 'Highlights'}: {item.idea}</h3>}
        {item.stack && <p><strong>Built with:</strong> {item.stack}</p>}
        {item.features && (
          <ul>
            {item.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        )}
        <div className="card-actions">
          {item.repository && (
            <a href={item.repository} target="_blank" rel="noreferrer">
              GitHub repository
            </a>
          )}
          {item.live && (
            <a href={item.live} target="_blank" rel="noreferrer">
              Live app
            </a>
          )}
          {item.demo && (
            <a href={item.demo} target="_blank" rel="noreferrer">
              Demo video
            </a>
          )}
          {item.document && (
            <a href={`/personal/${item.document}`} target="_blank" rel="noreferrer">
              View presentation
            </a>
          )}
        </div>
      </div>
      {item.image && (
        <button
          className="media-button"
          type="button"
          onClick={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            setLightboxOrigin({
              x: bounds.left + bounds.width / 2,
              y: bounds.top + bounds.height / 2,
            });
            setLightboxOpen(true);
          }}
          aria-label={`Expand: ${item.alt}`}
        >
          {item.video ? (
            <video src={mediaUrl} aria-label={item.alt} muted loop autoPlay playsInline />
          ) : (
            <img src={mediaUrl} alt={item.alt} loading="lazy" />
          )}
          <span>Expand media</span>
        </button>
      )}
      {item.image && lightboxOpen && (
        <MediaLightbox
          image={mediaUrl}
          video={item.video ? mediaUrl : undefined}
          alt={item.alt}
          origin={lightboxOrigin}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </ContentCard>
  );
}
