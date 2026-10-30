import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navigationGroups = [
  {
    title: 'Personal Activities',
    links: [
      { to: '/projects', label: 'Projects' },
      { to: '/competitions', label: 'Competitions' },
    ],
  },
  {
    title: 'Interests',
    links: [
      { to: '/photography', label: 'Photography' },
      { to: '/chess', label: 'Chess' },
    ],
  },
];

const standaloneLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About me' },
];

function NavigationLink({ to, children, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onNavigate}
      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
    >
      {children}
    </NavLink>
  );
}

function SiteHeader() {
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

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Nick Lei home">
          <span className="brand-name">Nick Lei</span>
          <span className="brand-location">Canada, BC</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close menu' : 'Menu'}
        </button>
        <nav
          className={menuOpen ? 'primary-navigation is-open' : 'primary-navigation'}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {standaloneLinks.map((item) => (
            <NavigationLink
              key={item.to}
              to={item.to}
              onNavigate={() => setMenuOpen(false)}
            >
              {item.label}
            </NavigationLink>
          ))}
          {navigationGroups.map((group) => (
            <div className="nav-group" key={group.title}>
              <span className="nav-group-title">{group.title}</span>
              <div className="nav-group-links">
                {group.links.map((item) => (
                  <NavigationLink
                    key={item.to}
                    to={item.to}
                    onNavigate={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </NavigationLink>
                ))}
              </div>
            </div>
          ))}
          <a className="nav-link" href="../index.html">
            Web hub
          </a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? 'Light theme' : 'Dark theme'}
        </button>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Thanks for visiting. Feel free to reach out.</p>
      <nav className="social-links" aria-label="Contact and social links">
        <a href="mailto:20051024nick@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/nickl24/" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/niickzl" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://www.youtube.com/@nickzl24" target="_blank" rel="noreferrer">
          YouTube
        </a>
        <a href="https://www.chess.com/member/hiiamnick" target="_blank" rel="noreferrer">
          Chess.com
        </a>
        <a href="files/resume.pdf" target="_blank" rel="noreferrer">
          Resume
        </a>
        <a href="tel:12368627277">Phone</a>
      </nav>
      <small>© 2026 Nick Lei</small>
    </footer>
  );
}

export default function SiteLayout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
