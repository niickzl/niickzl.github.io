import PageIntro from '../components/PageIntro.jsx';

export default function About() {
  return (
    <main id="main-content" className="page-shell">
      <PageIntro eyebrow="A little about me" title="More about me">
        <p>Some background, what I’m focused on, and where I hope to go next.</p>
      </PageIntro>
      <section className="about-grid" aria-label="About Nick">
        <article className="about-card about-current">
          <div>
            <p className="eyebrow">Right now</p>
            <h2>Studying computer science</h2>
            <p>
              I’m an undergraduate student at <strong>Simon Fraser University</strong>,
              studying computer science with a minor in business.
            </p>
          </div>
          <img src="/personal/images/profile.png" alt="Nick Lei" loading="lazy" />
        </article>
        <article className="about-card about-background">
          <img
            src="/personal/images/babyPhoto.jpg"
            alt="A childhood photo of Nick"
            loading="lazy"
          />
          <div>
            <p className="eyebrow">My background</p>
            <h2>At home in three languages</h2>
            <p>
              I have a Chinese background and was born in Canada. After attending
              school in China until Grade 4, I moved back to Canada. I’m fluent in
              English, Mandarin, and Cantonese.
            </p>
          </div>
        </article>
        <article className="about-card about-future">
          <div>
            <p className="eyebrow">Looking ahead</p>
            <h2>Curious about what’s next</h2>
            <p>
              I’m interested in exploring artificial intelligence, information
              systems, and product management.
            </p>
          </div>
          <img
            src="/personal/images/cmpt120Photo.jpg"
            alt="A computer science project from CMPT 120"
            loading="lazy"
          />
        </article>
      </section>
    </main>
  );
}
