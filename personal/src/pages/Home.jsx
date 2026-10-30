import { Link } from 'react-router-dom';

const featuredPages = [
  { to: '/projects', title: 'Projects', description: 'Things I have designed and built.' },
  { to: '/competitions', title: 'Competitions', description: 'Hackathons and case competitions.' },
  { to: '/photography', title: 'Photography', description: 'A few favorite moments and places.' },
  { to: '/chess', title: 'Chess', description: 'Games, reviews, and a long-running interest.' },
];

export default function Home() {
  return (
    <main id="main-content" className="page-shell home-page">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Personal website & portfolio</p>
          <h1>Hello, I’m <span>Nick.</span></h1>
          <p className="hero-lede">
            A computer science student at Simon Fraser University, building useful
            things and learning along the way.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/projects">Explore my work</Link>
            <Link className="button button-secondary" to="/about">More about me</Link>
          </div>
        </div>
        <img
          className="hero-portrait"
          src="/personal/images/profile.png"
          alt="Nick Lei"
          fetchPriority="high"
        />
      </section>
      <section className="featured-section" aria-labelledby="featured-title">
        <div className="section-heading">
          <p className="eyebrow">Explore</p>
          <h2 id="featured-title">A little bit of everything</h2>
        </div>
        <div className="feature-grid">
          {featuredPages.map((page, index) => (
            <Link className="feature-card" to={page.to} key={page.to}>
              <span className="card-number">0{index + 1}</span>
              <h3>{page.title}</h3>
              <p>{page.description}</p>
              <span className="feature-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <aside className="home-note">
        <p>This personal website showcases my portfolio and interests.</p>
        <p>For my latest updates, connect with me on LinkedIn.</p>
      </aside>
    </main>
  );
}
