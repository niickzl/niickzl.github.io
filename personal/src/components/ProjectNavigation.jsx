import { useState } from 'react';
import FadeIn from './FadeIn.jsx';

function scrollToItem(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function ProjectNavigation({
  items,
  heading,
  buttonLabel,
  ariaLabel,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  function navigateToItem(id) {
    scrollToItem(id);
    setMenuOpen(false);
  }

  return (
    <FadeIn as="aside" className="project-navigation">
      <nav
        aria-label={ariaLabel}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setMenuOpen(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && menuOpen) {
            setMenuOpen(false);
            event.currentTarget.querySelector('.project-navigation-toggle').focus();
          }
        }}
      >
        <h2>{heading}</h2>
        <button
          className="project-navigation-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="project-navigation-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {buttonLabel}
          <span className="project-navigation-icons" aria-hidden="true">
            <svg className="project-navigation-icon-closed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 9 6 6 6-6" />
            </svg>
            <svg className="project-navigation-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 15 6-6 6 6" />
            </svg>
          </span>
        </button>
        <ol
          className={`project-navigation-links${menuOpen ? ' is-open' : ''}`}
          id="project-navigation-links"
        >
          {items.map((item, index) => (
            <li key={item.id} style={{ '--stagger-index': index }}>
              <button type="button" onClick={() => navigateToItem(item.id)}>
                {item.number && <span>{item.number}</span>}
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </FadeIn>
  );
}
