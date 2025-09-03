import Home from "./pages/Home.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";

function App() {
  return (
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
        <Home />
      </div>
      <SiteFooter />
    </div>
  );
}

export default App;
