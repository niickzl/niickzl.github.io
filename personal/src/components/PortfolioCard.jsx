import { useEffect, useRef, useState } from 'react';
import ContentCard from './ContentCard.jsx';

function MediaLightbox({ image, video, alt, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Expanded project media"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
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
      <button className="lightbox-close" type="button" onClick={onClose}>
        Close
      </button>
    </dialog>
  );
}

export default function PortfolioCard({ item, kind = 'project' }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isCompetition = kind === 'competition';
  const mediaUrl = item.image ? `/personal/${item.image}` : undefined;

  return (
    <ContentCard
      bodyClassName={item.image ? 'has-media' : ''}
      id={`section-${item.number}`}
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
          onClick={() => setLightboxOpen(true)}
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
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </ContentCard>
  );
}
