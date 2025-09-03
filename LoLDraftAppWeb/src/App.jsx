import Home from "./pages/Home";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

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
