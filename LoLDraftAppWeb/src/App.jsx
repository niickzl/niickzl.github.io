import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

function App() {
  // Set the basename for the router based on the environment
  const basename = import.meta.env.PROD ? '/LolDraftAppWebDist' : '/';
  
  return (
    <Router basename={basename}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        <SiteHeader />
        <div style={{ flex: 1, minHeight: 0 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <SiteFooter />
      </div>
    </Router>
  );
}

export default App;
