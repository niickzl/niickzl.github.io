import PageIntro from '../components/PageIntro.jsx';
import PortfolioCard from '../components/PortfolioCard.jsx';
import { competitions } from '../data.js';

export default function Competitions() {
  return (
    <main id="main-content" className="page-shell">
      <PageIntro
        eyebrow="Teamwork & ideas"
        title="Competitions"
        description="Hackathons and case competitions that brought ideas to life."
      />
      <nav className="section-tabs" aria-label="Jump to a competition">
        {competitions.map((competition) => (
          <button
            type="button"
            key={competition.number}
            onClick={() => document.getElementById(`section-${competition.number}`)?.scrollIntoView({ behavior: 'smooth' })}
          >
            {competition.number} {competition.title}
          </button>
        ))}
      </nav>
      <div className="portfolio-list">
        {competitions.map((competition) => (
          <PortfolioCard item={competition} kind="competition" key={competition.number} />
        ))}
      </div>
    </main>
  );
}
