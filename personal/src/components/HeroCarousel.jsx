import { Link } from 'react-router-dom';

const destinations = [
  { label: 'More about me', to: '/#about' },
  { label: 'Professional Experience', to: '/experience' },
  { label: 'Projects', to: '/projects' },
  { label: 'Competitions', to: '/projects?view=competitions' },
  { label: 'Interests', to: '/interests' },
];

export default function HeroCarousel() {
  return (
    <div className="hero-carousel">
      <nav
        className="carousel-window"
        aria-label="Explore the site"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            event.currentTarget.scrollLeft = 0;
          }
        }}
      >
        <div className="carousel-track">
          {[0, 1].map((copy) => (
            <div className="carousel-group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
              {destinations.map(({ label, to }) => (
                <Link
                  className="button button-secondary"
                  key={to}
                  to={to}
                  viewTransition
                  tabIndex={copy === 1 ? -1 : undefined}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
