import PageIntro from '../components/PageIntro.jsx';
import FadeIn from '../components/FadeIn.jsx';

export default function Experience() {
  return (
    <main id="main-content" className="page-shell experience-page">
      <FadeIn>
        <PageIntro
          title="Professional Experience"
          description="Related roles I currently hold, have held, or will soon take on."
        />
      </FadeIn>
      <div className="experience-list">
        <FadeIn as="article" className="experience-entry">
          <header className="experience-heading">
            <div>
              <div className="experience-identity">
                <img className="experience-logo" src="/personal/images/WelTel.png" alt="" />
                <div>
                  <h2>Incoming Full Stack Developer</h2>
                  <p>WelTel · Internship</p>
                </div>
              </div>
            </div>
            <p className="experience-date">
              <time dateTime="2027-01">Jan 2027</time> –{' '}
              <time dateTime="2027-08">Aug 2027</time>
            </p>
          </header>
          <p className="experience-status">Incoming 8-month internship</p>
        </FadeIn>
        <FadeIn as="article" className="experience-entry">
          <header className="experience-heading">
            <div>
              <div className="experience-identity">
                <img className="experience-logo" src="/personal/images/Portal.png" alt="" />
                <div>
                  <h2>Co-Founder &amp; Lead Engineer</h2>
                  <p>
                    <a href="https://tryportal.ca">Portal</a>
                  </p>
                </div>
              </div>
            </div>
            <p className="experience-date">
              <time dateTime="2026-01">Jan 2026</time> – Present
            </p>
          </header>
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
        </FadeIn>
        <FadeIn as="article" className="experience-entry">
          <header className="experience-heading">
            <div>
              <div className="experience-identity">
                <img className="experience-logo" src="/personal/images/CaseIT.png" alt="" />
                <div>
                  <h2>Director of Web Development</h2>
                  <p>CaseIT MIS Case Competition</p>
                </div>
              </div>
            </div>
            <p className="experience-date">
              <time dateTime="2026-08">Aug 2026</time> – Present
            </p>
          </header>
          <ul>
            <li>
              Developing PostgreSQL, data-analysis, and CMS capabilities for
              the competition platform.
            </li>
            <li>
              Translating designs into responsive interfaces and integrating
              tracking and analytics systems.
            </li>
            <li>
              Leading sprint planning, weekly stand-ups, and code reviews while
              standardizing Git workflows for associate developers.
            </li>
          </ul>
        </FadeIn>
      </div>
    </main>
  );
}
