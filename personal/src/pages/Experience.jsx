import PageIntro from '../components/PageIntro.jsx';
import FadeIn from '../components/FadeIn.jsx';
import ContentCard from '../components/ContentCard.jsx';
import ProjectNavigation from '../components/ProjectNavigation.jsx';

const experienceItems = [
  { id: 'experience-weltel', number: '01', title: 'Full Stack Developer @ WelTel' },
  { id: 'experience-portal', number: '02', title: 'Co-Founder & Lead Engineer @ Portal' },
  { id: 'experience-caseit', number: '03', title: 'Director of Web Development @ CaseIT' },
];

export default function Experience() {
  return (
    <main id="main-content" className="page-shell experience-page">
      <FadeIn>
        <PageIntro
          title="Professional Experience"
          description="Related roles I currently hold, have held, or will soon take on."
        />
      </FadeIn>
      <div className="experience-layout">
        <ProjectNavigation
          items={experienceItems}
          heading="On this page"
          buttonLabel="Jump to a role"
          ariaLabel="Jump to a professional experience"
        />
        <div className="experience-list">
          <FadeIn className="experience-fade">
            <ContentCard
              id="experience-weltel"
              title="Incoming Full Stack Developer"
              subtitle="WelTel · Internship"
              logo="/personal/images/WelTel.png"
              date={(
                <>
                  <time dateTime="2027-01">Jan 2027</time> –{' '}
                  <time dateTime="2027-08">Aug 2027</time>
                </>
              )}
            >
              <p className="experience-status">Incoming 8-month internship</p>
            </ContentCard>
          </FadeIn>
          <FadeIn className="experience-fade">
            <ContentCard
              id="experience-portal"
              title="Co-Founder & Lead Engineer"
              subtitle={<a href="https://tryportal.ca">Portal</a>}
              logo="/personal/images/Portal.png"
              date={<><time dateTime="2026-01">Jan 2026</time> – Present</>}
            >
              <ul>
                <li>
                  Six months after launch, Portal has 250+ active users, partnerships
                  with SFU Surge, SFUEA, SFU DNS, and SFU Anime, and has supported
                  80+ positions and 200+ applications.
                </li>
                <li>
                  Lead full-stack development and database management, including
                  Alembic-versioned migrations; contribute to feature and UX design
                  and maintain the product end to end.
                </li>
                <li>
                  Improve user flows and perceived performance with optimistic
                  updates, skeleton loading, HTTP and query caching, and lazy imports;
                  implement CI/CD.
                </li>
                <li>
                  Set up and manage Cloudflare DNS, domains, and Pages; Google Cloud
                  Run; Supabase; and Resend.
                </li>
                <li>
                  Apply security controls including SQL-injection prevention,
                  malicious-file upload protections, rate limiting, role-based URL
                  access, cache and local-session controls, and SameSite=Lax cookies
                  to help prevent cross-site requests.
                </li>
              </ul>
            </ContentCard>
          </FadeIn>
          <FadeIn className="experience-fade">
            <ContentCard
              id="experience-caseit"
              title="Director of Web Development"
              subtitle="CaseIT MIS Case Competition"
              logo="/personal/images/CaseIT.png"
              date={<><time dateTime="2026-08">Aug 2026</time> – Present</>}
            >
              <ul>
                <li>
                  Implemented CMS functionality, a PWA with a new logs system, and
                  site analytics using Microsoft Clarity.
                </li>
                <li>
                  Turned the design team’s Figma designs into responsive frontend
                  interfaces.
                </li>
                <li>
                  Led a web development associate by assigning tasks, reviewing
                  code, and facilitating regular team meetings.
                </li>
              </ul>
            </ContentCard>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
