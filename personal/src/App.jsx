import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import Chess from './pages/Chess.jsx';
import Competitions from './pages/Competitions.jsx';
import Experience from './pages/Experience.jsx';
import Home from './pages/Home.jsx';
import Music from './pages/Music.jsx';
import Photography from './pages/Photography.jsx';
import Projects from './pages/Projects.jsx';

const pageTitles = {
  '/': 'Home',
  '/experience': 'Professional Experience',
  '/projects': 'Projects',
  '/competitions': 'Competitions',
  '/photography': 'Photography',
  '/chess': 'Chess',
  '/music': 'Music',
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Navigate to="/" replace />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/chess" element={<Chess />} />
        <Route path="/music" element={<Music />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </SiteLayout>
  );
}
