import PageIntro from '../components/PageIntro.jsx';
import PortfolioCard from '../components/PortfolioCard.jsx';
import { projects } from '../data.js';

export default function Projects() {
  return (
    <main id="main-content" className="page-shell">
      <PageIntro
        eyebrow="Selected work"
        title="Projects"
        description="A selection of software, tools, and experiments I’ve worked on."
      />
      <nav className="section-tabs" aria-label="Jump to a project">
        {projects.map((project) => (
          <button
            type="button"
            key={project.number}
            onClick={() => document.getElementById(`section-${project.number}`)?.scrollIntoView({ behavior: 'smooth' })}
          >
            {project.number} {project.title}
          </button>
        ))}
      </nav>
      <div className="portfolio-list">
        {projects.map((project) => <PortfolioCard item={project} key={project.number} />)}
      </div>
    </main>
  );
}
