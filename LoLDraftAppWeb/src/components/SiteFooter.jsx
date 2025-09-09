export default function SiteFooter() {
  return (
    <footer
      style={{
        padding: "10px 20px",
        backgroundColor: "#111",
        borderTop: "1px solid #222",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#aaa",
      }}
    >
      <div>© {new Date().getFullYear()} Nick's LoL Drafter - No rights reserved.</div>
    </footer>
  );
}


