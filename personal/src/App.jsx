import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Experience = lazy(() => import('./pages/Experience.jsx'));
const Interests = lazy(() => import('./pages/Interests.jsx'));
const Projects = lazy(() => import('./pages/Projects.jsx'));

const pageTitles = {
  '/': 'Home',
  '/experience': 'Professional Experience',
  '/projects': 'Projects',
  '/interests': 'Interests',
};

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname] || 'Home';
    document.title = `${title} | Nick Lei`;
    if (location.pathname === '/' && location.hash === '#about') {
      document.getElementById('about')?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash, location.key]);

  return null;
}

export default function App() {
  return (
    <SiteLayout>
      <RouteEffects />
      <Suspense
        fallback={
          <main id="main-content" className="page-shell" role="status">
            Loading page…
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/competitions" element={<Navigate to="/projects?view=competitions" replace />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/photography" element={<Navigate to="/interests?section=photography" replace />} />
          <Route path="/chess" element={<Navigate to="/interests?section=chess" replace />} />
          <Route path="/music" element={<Navigate to="/interests?section=music" replace />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </SiteLayout>
  );
}
