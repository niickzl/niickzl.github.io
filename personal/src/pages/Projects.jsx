import PageIntro from '../components/PageIntro.jsx';
import PortfolioCard from '../components/PortfolioCard.jsx';
import FadeIn from '../components/FadeIn.jsx';
import ProjectNavigation from '../components/ProjectNavigation.jsx';
import { projects } from '../data.js';

export default function Projects() {
  return (
    <main id="main-content" className="page-shell projects-page">
      <FadeIn>
        <PageIntro
          title="Projects"
          description="A selection of software, tools, and experiments I’ve worked on."
        />
      </FadeIn>
      <div className="projects-layout">
        <ProjectNavigation
          items={projects.map((project) => ({
            ...project,
            id: `section-${project.number}`,
          }))}
          heading="On this page"
          buttonLabel="Jump to a project"
          ariaLabel="Jump to a project"
        />
        <div className="portfolio-list">
          {projects.map((project) => (
            <FadeIn key={project.number}>
              <PortfolioCard item={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}
