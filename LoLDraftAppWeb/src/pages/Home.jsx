import ChampionGrid from "../components/ChampionGrid";
import TeamColumn from "../components/TeamColumn";
import { useState, useCallback } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSwapped, setIsSwapped] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [draftPhase, setDraftPhase] = useState(0);
  const [blueTeam, setBlueTeam] = useState(Array(5).fill(null));
  const [redTeam, setRedTeam] = useState(Array(5).fill(null));
  const [selectedChampions, setSelectedChampions] = useState(new Set());
  
  const resetDraft = useCallback(() => {
    setDraftPhase(0);
    setBlueTeam(Array(5).fill(null));
    setRedTeam(Array(5).fill(null));
    setSelectedChampions(new Set());
    setResetKey(prev => prev + 1);
  }, []);

  // Draft order: [B1, R1, R2, B2, B3, R3, R4, B4, B5, R5]
  const draftOrder = [
    { team: 'blue', index: 0 },
    { team: 'red', index: 0 },
    { team: 'red', index: 1 },
    { team: 'blue', index: 1 },
    { team: 'blue', index: 2 },
    { team: 'red', index: 2 },
    { team: 'red', index: 3 },
    { team: 'blue', index: 3 },
    { team: 'blue', index: 4 },
    { team: 'red', index: 4 },
  ];

  const handleChampionSelect = useCallback((champion) => {
    if (draftPhase >= draftOrder.length || selectedChampions.has(champion.id)) return;
    
    const currentPick = draftOrder[draftPhase];
    const team = currentPick.team;
    const index = currentPick.index;
    
    setSelectedChampions(prev => new Set([...prev, champion.id]));
    
    if (team === 'blue') {
      const newBlueTeam = [...blueTeam];
      newBlueTeam[index] = champion;
      setBlueTeam(newBlueTeam);
    } else {
      const newRedTeam = [...redTeam];
      newRedTeam[index] = champion;
      setRedTeam(newRedTeam);
    }
    
    setDraftPhase(prev => prev + 1);
  }, [draftPhase, blueTeam, redTeam, selectedChampions]);
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
          <TeamColumn 
            team={isSwapped ? "Red" : "Blue"} 
            teamData={isSwapped ? redTeam : blueTeam}
          />
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
                  resetDraft();
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
            <ChampionGrid 
              key={resetKey} 
              searchTerm={searchTerm} 
              onChampionSelect={handleChampionSelect}
              selectedChampions={selectedChampions}
            />
          </div>
        </div>

        {/* Right Team (swappable) */}
        <div style={{ height: "90%", display: "flex" }}>
          <TeamColumn 
            team={isSwapped ? "Blue" : "Red"} 
            teamData={isSwapped ? blueTeam : redTeam}
          />
        </div>
      </div>

    </div>
  );
}
