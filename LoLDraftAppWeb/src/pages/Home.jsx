import ChampionGrid from "../components/ChampionGrid";
import TeamColumn from "../components/TeamColumn";
import { useState, useCallback } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSwapped, setIsSwapped] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [draftPhase, setDraftPhase] = useState(0);
  
  // Draft order specifies the exact position for each pick
  const draftOrder = [
    // Phase 1
    { team: 'blue', position: 0 },  // B1
    { team: 'red', position: 0 },   // R1
    { team: 'red', position: 1 },   // R2
    { team: 'blue', position: 1 },  // B2
    { team: 'blue', position: 2 },  // B3
    // Phase 2
    { team: 'red', position: 2 },   // R3
    { team: 'red', position: 3 },   // R4
    { team: 'blue', position: 3 },  // B4
    { team: 'blue', position: 4 },  // B5
    { team: 'red', position: 4 },   // R5
  ];
  
  // Track selections in draft order
  const [selections, setSelections] = useState(Array(draftOrder.length).fill(null));
  const [blueTeam, setBlueTeam] = useState(Array(5).fill(null));
  const [redTeam, setRedTeam] = useState(Array(5).fill(null));
  const [selectedChampions, setSelectedChampions] = useState(new Set());
  const [deletedSlots, setDeletedSlots] = useState([]); // Track deleted slots in order

  // Update team states based on current selections
  const updateTeamStates = useCallback((newSelections) => {
    const newBlueTeam = Array(5).fill(null);
    const newRedTeam = Array(5).fill(null);
    const newSelectedChampions = new Set();
    
    // Track which positions have been filled for each team
    const bluePositions = new Set();
    const redPositions = new Set();
    
    // Process each pick in draft order
    draftOrder.forEach(({ team, position }, pickIndex) => {
      const champion = newSelections[pickIndex];
      if (!champion) return;
      
      if (team === 'blue') {
        if (!bluePositions.has(position)) {
          newBlueTeam[position] = champion;
          bluePositions.add(position);
        } else {
          // Find next available position
          for (let i = 0; i < 5; i++) {
            if (!bluePositions.has(i)) {
              newBlueTeam[i] = champion;
              bluePositions.add(i);
              break;
            }
          }
        }
      } else if (team === 'red') {
        if (!redPositions.has(position)) {
          newRedTeam[position] = champion;
          redPositions.add(position);
        } else {
          // Find next available position
          for (let i = 0; i < 5; i++) {
            if (!redPositions.has(i)) {
              newRedTeam[i] = champion;
              redPositions.add(i);
              break;
            }
          }
        }
      }
      
      newSelectedChampions.add(champion.id);
    });
    
    setBlueTeam(newBlueTeam);
    setRedTeam(newRedTeam);
    setSelectedChampions(newSelectedChampions);
  }, [draftOrder]);
  
  const resetDraft = useCallback(() => {
    setDraftPhase(0);
    setSelections(Array(draftOrder.length).fill(null));
    setBlueTeam(Array(5).fill(null));
    setRedTeam(Array(5).fill(null));
    setSelectedChampions(new Set());
    setDeletedSlots([]);
    setResetKey(prev => prev + 1);
  }, [draftOrder.length]);

  const handleSlotClick = useCallback((team, position) => {
    const teamKey = team.toLowerCase();
    const teamArray = teamKey === 'blue' ? blueTeam : redTeam;
    const champion = teamArray[position];
    
    if (!champion) return;
    
    setSelections(prevSelections => {
      const newSelections = [...prevSelections];
      const selectionIndex = newSelections.findIndex(champ => champ?.id === champion.id);
      
      if (selectionIndex !== -1) {
        // Add to deleted slots in order
        setDeletedSlots(prev => [...prev, selectionIndex]);
        newSelections[selectionIndex] = null;
        updateTeamStates(newSelections);
      }
      
      return newSelections;
    });
  }, [blueTeam, redTeam, updateTeamStates]);

  const handleChampionSelect = useCallback((champion) => {
    // Check if champion is already selected
    if (selectedChampions.has(champion.id)) {
      return;
    }
    
    setSelections(prevSelections => {
      // Check if all slots are filled
      const filledSlots = prevSelections.filter(Boolean).length;
      if (filledSlots >= draftOrder.length) {
        return prevSelections;
      }
      
      const newSelections = [...prevSelections];
      
      // First fill any deleted slots in order
      if (deletedSlots.length > 0) {
        const slotToFill = deletedSlots[0];
        newSelections[slotToFill] = champion;
        setDeletedSlots(prev => prev.slice(1));
      } 
      // Otherwise fill the next available slot in draft order
      else {
        const nextEmptyIndex = newSelections.findIndex((slot, index) => 
          slot === null && !deletedSlots.includes(index)
        );
        if (nextEmptyIndex !== -1) {
          newSelections[nextEmptyIndex] = champion;
          // Only update draft phase if we're not filling a deleted slot
          if (!deletedSlots.includes(nextEmptyIndex)) {
            setDraftPhase(prev => Math.min(prev + 1, draftOrder.length - 1));
          }
        }
      }
      
      updateTeamStates(newSelections);
      return newSelections;
    });
  }, [selectedChampions, draftOrder, updateTeamStates, deletedSlots]);
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
            onSlotClick={handleSlotClick}
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
              draftPhase={draftPhase}
              draftOrder={draftOrder}
            />
          </div>
        </div>

        {/* Right Team (swappable) */}
        <div style={{ height: "90%", display: "flex" }}>
          <TeamColumn 
            team={isSwapped ? "Blue" : "Red"} 
            teamData={isSwapped ? blueTeam : redTeam}
            onSlotClick={handleSlotClick}
          />
        </div>
      </div>

    </div>
  );
}
