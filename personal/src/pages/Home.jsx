import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn.jsx';

const technologies = [
  { name: 'Python', image: 'Python.png' },
  { name: 'JavaScript', image: 'JavaScript.png' },
  { name: 'C', image: 'C.png' },
  { name: 'C++', image: 'Cpp.png' },
  { name: 'React', image: 'React.png' },
  { name: 'Node.js', image: 'Node.png' },
];

export default function Home() {
  return (
    <main id="main-content" className="page-shell home-page">
      <FadeIn as="section" className="hero">
        <div className="hero-copy">
          <h1>Hello, I’m <span>Nick</span>.</h1>
          <p className="hero-lede">
            A computer science student building things that lasts.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/projects">Explore my work</Link>
            <Link className="button button-secondary" to="/#about">More about me</Link>
          </div>
        </div>
        <img
          className="hero-portrait"
          src="/personal/images/profile.png"
          alt="Nick Lei"
          fetchPriority="high"
        />
      </FadeIn>
      <FadeIn as="section" className="home-about" id="about" aria-labelledby="about-title">
        <h2 id="about-title">More about me</h2>
        <p>A little about my studies, skills, history, and future.</p>
        <section className="home-education" aria-labelledby="education-title">
          <h3 id="education-title">Education</h3>
          <p>
            I’m studying computer science, with a concentration on artificial intelligence and information systems.
          </p>
          <div className="education-list">
            <article className="education-card">
              <div className="education-logo">
                <img src="/personal/images/SFU.png" alt="" />
              </div>
              <div>
                <h4>Simon Fraser University</h4>
                <p>BSc in Computer Science, September 2023 - Present</p>
              </div>
            </article>
            <article className="education-card">
              <div className="education-logo">
                <img src="/personal/images/HKU.png" alt="" />
              </div>
              <div>
                <h4>The University of Hong Kong</h4>
                <p>BEng in Computer Science · Exchange, September - December 2026</p>
              </div>
            </article>
          </div>
        </section>
        <section className="home-skills" aria-labelledby="skills-title">
          <h3 id="skills-title">Technologies</h3>
          <p>Technologies I’m most comfortable with.</p>
          <ul className="technology-list">
            {technologies.map(({ name, image }) => (
              <li key={name}>
                <span className="technology-logo">
                  <img src={`/personal/images/${image}`} alt="" />
                </span>
                {name}
              </li>
            ))}
          </ul>
        </section>
        <div className="home-about-grid">
          <article className="home-about-entry">
            <h3>Building with purpose</h3>
            <p>
              I find meaning in building things that help the community around me.
              I care about performance and aim to make my projects and programs
              efficient, fast, and concise.
            </p>
            <p>
              I’m always happy to learn about new opportunities, meet people,
              and try something new.
            </p>
          </article>
          <article className="home-about-entry">
            <h3>Background and future</h3>
            <p>
              I was born in Canada with a Chinese background. After attending
              school in China until Grade 4, I moved back to Canada. I’m fluent in
              English, Mandarin, and Cantonese.
            </p>
            <p>
              I’d like to pursue a career in information systems, full-stack development,
              web development, artificial intelligence, and product management.
            </p>
          </article>
        </div>
      </FadeIn>
    </main>
  );
}
