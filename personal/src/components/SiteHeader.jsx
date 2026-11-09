import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SiteNotice from './SiteNotice.jsx';

const navigationLinks = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Professional Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/interests', label: 'Interests' },
];

function NavigationLink({ to, children, onNavigate, style }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      viewTransition
      onClick={onNavigate}
      style={style}
      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
    >
      {children}
    </NavLink>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'light',
  );
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.error('Unable to save the selected color theme.', error);
    }
  }, [theme]);

  function closeNavigation() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" viewTransition aria-label="Nick Lei home">
          <span className="brand-name">Nick Ze Kun Lei</span>
          <span className="brand-location">Vancouver, Canada</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Menu'}
          title={menuOpen ? 'Close menu' : 'Menu'}
          data-state={menuOpen ? 'open' : 'closed'}
          onClick={() => {
            setMenuOpen((open) => !open);
          }}
        >
          <svg className="menu-icon menu-icon-closed" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg className="menu-icon menu-icon-open" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 5l14 14M19 5 5 19" />
          </svg>
        </button>
        <nav
          className={menuOpen ? 'primary-navigation is-open' : 'primary-navigation'}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {navigationLinks.map((item, index) => (
            <NavigationLink
              key={item.to}
              to={item.to}
              onNavigate={closeNavigation}
              style={{ '--stagger-index': index }}
            >
              {item.label}
            </NavigationLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            data-theme={theme}
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          >
            <svg className="theme-icon theme-icon-moon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
            </svg>
            <svg className="theme-icon theme-icon-sun" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
            </svg>
          </button>
          <a className="nav-link hub-link" href="../index.html">Web hub</a>
        </div>
      </div>
      <SiteNotice />
    </header>
  );
}
