import logo from "/favicon/favicon-32x32.png";

export default function SiteHeader() {
  return (
    <header
      style={{
        padding: "10px 20px",
        backgroundColor: "#111",
        borderBottom: "1px solid #222",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <a
        href="../../index.html"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#fff",
          textDecoration: "none",
        }}
      >
        <img src={logo} alt="Nick's LoL Drafter Logo" style={{ height: 32, width: 32 }} />
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Nick's LoL Drafter</span>
      </a>
    </header>
  );
}


