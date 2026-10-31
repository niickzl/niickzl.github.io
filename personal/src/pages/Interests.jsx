import { Link, useSearchParams } from 'react-router-dom';
import { chessGames, photographs } from '../data.js';
import FadeIn from '../components/FadeIn.jsx';

const interestSections = [
  { id: 'photography', label: 'Photography' },
  { id: 'music', label: 'Music' },
  { id: 'chess', label: 'Chess' },
];

const topSongs = [
  '6X4gGPP7K1ElsNnmc6BYKs',
  '0r0VLsvWv7jo2HGfvlt5xh',
  '5SPT1KuklXBFoBc5QdphOC',
  '5qII2n90lVdPDcgXEEVHNy',
  '5evE7bweEhX83fd1ZmwPjP',
  '373pNLPvNhF23nrfOOj7Ig',
  '4xlkIVboOY2plOALp9bqD8',
  '5maOnuGt1ftrhFaQNSbrNT',
];

function PhotographySection() {
  return (
    <>
      <div className="interest-actions">
        <a
          className="text-link"
          href="https://drive.google.com/drive/folders/11A1i5bbHlNRmZ2ht9XCsdGO404n6DOIG?usp=drive_link"
          target="_blank"
          rel="noreferrer"
        >
          Browse photo collections
        </a>
      </div>
      <section className="photo-grid" aria-label="Selected photographs">
        {photographs.map((photo) => (
          <figure className="photo-card" key={photo.image}>
            <img src={`/personal/${photo.image}`} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.location}</figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

function ChessSection() {
  return (
    <>
      <div className="interest-actions">
        <a
          className="text-link"
          href="https://www.chess.com/member/hiiamnick"
          target="_blank"
          rel="noreferrer"
        >
          Visit my Chess.com profile
        </a>
      </div>
      <section className="chess-grid" aria-label="Selected chess games">
        {chessGames.map((game) => (
          <article className="chess-card" key={game.image}>
            <h2>{game.title}</h2>
            <img
              src={`/personal/${game.image}`}
              alt={`Animated board from ${game.title}`}
              loading="lazy"
            />
            <a href={game.review} target="_blank" rel="noreferrer">
              Review this game
            </a>
          </article>
        ))}
      </section>
    </>
  );
}

function MusicSection() {
  return (
    <>
      <div className="interest-actions">
        <a
          className="text-link"
          href="https://open.spotify.com/user/a8996u4euvbxavuwz3ugsc93i?si=c2d7bf6e778441d8"
          target="_blank"
          rel="noreferrer"
        >
          View my Spotify profile
        </a>
      </div>
      <section className="music-grid" aria-label="My top four songs">
        {topSongs.map((trackId, index) => (
          <iframe
            key={trackId}
            title={`Spotify player for top song ${index + 1}`}
            src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        ))}
      </section>
    </>
  );
}

const sectionContent = {
  photography: PhotographySection,
  chess: ChessSection,
  music: MusicSection,
};

export default function Interests() {
  const [searchParams] = useSearchParams();
  const requestedSection = searchParams.get('section');
  const activeSection = interestSections.some(({ id }) => id === requestedSection)
    ? requestedSection
    : 'photography';
  const ActiveSection = sectionContent[activeSection];

  return (
    <main id="main-content" className="page-shell interests-page">
      <FadeIn as="header" className="interests-heading">
        <h1>Interests</h1>
        <nav className="section-tabs work-tabs" aria-label="Interest categories">
          {interestSections.map(({ id, label }) => (
            <Link
              key={id}
              to={`/interests?section=${id}`}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="page-description">
          A few things I enjoy beyond work, from photography and chess to music.
        </p>
      </FadeIn>
      <FadeIn key={activeSection} className="interest-content">
        <ActiveSection />
      </FadeIn>
    </main>
  );
}
