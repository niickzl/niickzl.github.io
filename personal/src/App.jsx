import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import About from './pages/About.jsx';
import Chess from './pages/Chess.jsx';
import Competitions from './pages/Competitions.jsx';
import Home from './pages/Home.jsx';
import Photography from './pages/Photography.jsx';
import Projects from './pages/Projects.jsx';

const pageTitles = {
  '/': 'Home',
  '/about': 'About me',
  '/projects': 'Projects',
  '/competitions': 'Competitions',
  '/photography': 'Photography',
  '/chess': 'Chess',
};

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname] || 'Home';
    document.title = `${title} | Nick Lei`;
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <SiteLayout>
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/chess" element={<Chess />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </SiteLayout>
  );
}
