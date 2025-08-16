import ChampionGrid from "../components/ChampionGrid";
import TeamColumn from "../components/TeamColumn";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSwapped, setIsSwapped] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const banSpotSize = 36;
  const banSpotBaseStyle = {
    width: banSpotSize,
    height: banSpotSize,
    border: "2px solid #222",
    borderRadius: 6,
    backgroundColor: "#0f0f0f"
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#000",
        color: "white",
        
      }}
    >
      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: "20px",
          padding: "20px",
          boxSizing: "border-box",
          overflow: "hidden"
        }}
      >
        {/* Left Team (swappable) */}
        <div style={{ height: "90%", display: "flex" }}>
          <TeamColumn team={isSwapped ? "Red" : "Blue"} />
        </div>

        {/* Champion Grid with search bar above */}
        <div
          style={{
            height: "90%",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: "8px",
              padding: "2px 0"
            }}
          >
            {/* Left bans (swappable) */}
            <div style={{ display: "flex", gap: 8 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`left-ban-${i}`}
                  style={{
                    ...banSpotBaseStyle,
                    borderColor: isSwapped ? "#dc2626" : "#2563eb",
                  }}
                />
              ))}
            </div>

            {/* Center group: search + buttons packaged together */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                flexWrap: "wrap"
              }}
            >
              <button
                type="button"
                className="action-button"
                onClick={() => setIsSwapped((s) => !s)}
              >
                Swap Side
              </button>
              <input
                type="text"
                placeholder="Search champions..."
                style={{
                  width: "min(640px, 90%)",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #333",
                  backgroundColor: "#0f0f0f",
                  color: "#fff",
                  outline: "none"
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="button"
                className="action-button"
                onClick={() => {
                  setIsSwapped(false);
                  setSearchTerm("");
                  setResetKey((k) => k + 1);
                }}
              >
                Reset All
              </button>
            </div>

            {/* Right bans (swappable) */}
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`right-ban-${i}`}
                  style={{
                    ...banSpotBaseStyle,
                    borderColor: isSwapped ? "#2563eb" : "#dc2626",
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ChampionGrid key={resetKey} searchTerm={searchTerm} />
          </div>
        </div>

        {/* Right Team (swappable) */}
        <div style={{ height: "90%", display: "flex" }}>
          <TeamColumn team={isSwapped ? "Blue" : "Red"} />
        </div>
      </div>

    </div>
  );
}
