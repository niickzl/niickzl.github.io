import PageIntro from '../components/PageIntro.jsx';
import { photographs } from '../data.js';

export default function Photography() {
  return (
    <main id="main-content" className="page-shell">
      <PageIntro
        eyebrow="Places & moments"
        title="Photography"
        description="A few favorite photos from Canada and China. All of these were taken with my phone."
      >
        <a
          className="text-link"
          href="https://drive.google.com/drive/folders/11A1i5bbHlNRmZ2ht9XCsdGO404n6DOIG?usp=drive_link"
          target="_blank"
          rel="noreferrer"
        >
          Browse the full photo collection
        </a>
      </PageIntro>
      <section className="photo-grid" aria-label="Selected photographs">
        {photographs.map((photo) => (
          <figure className="photo-card" key={photo.image}>
            <img src={`/personal/${photo.image}`} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.location}</figcaption>
          </figure>
        ))}
      </section>
      <p className="photo-note">
        My dad introduced me to photography when I was ten, and scenery has been a
        favorite subject ever since.
      </p>
    </main>
  );
}
