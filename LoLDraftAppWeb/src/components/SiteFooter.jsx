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
      © {new Date().getFullYear()} League Draft Helper — All rights reserved.
    </footer>
  );
}


