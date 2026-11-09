import PageIntro from '../components/PageIntro.jsx';
import PortfolioCard from '../components/PortfolioCard.jsx';
import FadeIn from '../components/FadeIn.jsx';
import ProjectNavigation from '../components/ProjectNavigation.jsx';
import { Link, useSearchParams } from 'react-router-dom';
import { competitions, projects } from '../data.js';

export default function Projects() {
  const [searchParams] = useSearchParams();
  const showingCompetitions = searchParams.get('view') === 'competitions';
  const items = showingCompetitions ? competitions : projects;
  const sectionName = showingCompetitions ? 'competition' : 'personal-work';

  return (
    <main id="main-content" className="page-shell projects-page">
      <FadeIn>
        <PageIntro
          title="Projects"
          description="Independent builds, coursework, and collaborative competition entries."
        >
          <nav className="section-tabs work-tabs" aria-label="Work categories">
            <Link
              to="/projects"
              viewTransition
              aria-current={!showingCompetitions ? 'page' : undefined}
            >
              Builds
            </Link>
            <Link
              to="/projects?view=competitions"
              viewTransition
              aria-current={showingCompetitions ? 'page' : undefined}
            >
              Competitions
            </Link>
          </nav>
        </PageIntro>
      </FadeIn>
      <div className="projects-layout" key={sectionName}>
        <ProjectNavigation
          items={items.map((item) => ({
            ...item,
            id: `section-${sectionName}-${item.number}`,
          }))}
          heading="On this page"
          buttonLabel={`Jump to ${showingCompetitions ? 'a competition' : 'an entry'}`}
          ariaLabel={`Jump to ${showingCompetitions ? 'a competition' : 'a project or course entry'}`}
        />
        <div className="portfolio-list">
          {items.map((item, index) => (
            <FadeIn key={item.number} style={{ transitionDelay: `${index * 30}ms` }}>
              <PortfolioCard
                item={item}
                kind={showingCompetitions ? 'competition' : 'project'}
                id={`section-${sectionName}-${item.number}`}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}
