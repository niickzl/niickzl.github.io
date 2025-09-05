import ChampionGrid from "../components/ChampionGrid";
import TeamColumn from "../components/TeamColumn";
import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";

// Import role icons
const TopIcon = "/roleIcon/Top_icon.png";
const JungleIcon = "/roleIcon/Jungle_icon.png";
const MidIcon = "/roleIcon/Middle_icon.png";
const BotIcon = "/roleIcon/Bottom_icon.png";
const SupportIcon = "/roleIcon/Support_icon.png";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSwapped, setIsSwapped] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [draftPhase, setDraftPhase] = useState(0);
  const [isBanning, setIsBanning] = useState(true);
  const [banPhase, setBanPhase] = useState(0);
  
  // Ban order: B1, R1, B2, R2, B3, R3
  const banOrder = [
    { team: 'blue', position: 0 },  // B1
    { team: 'red', position: 0 },   // R1
    { team: 'blue', position: 1 },  // B2
    { team: 'red', position: 1 },   // R2
    { team: 'blue', position: 2 },  // B3
    { team: 'red', position: 2 },   // R3
    { team: 'blue', position: 3 },  // B4
    { team: 'red', position: 3 },   // R4
    { team: 'blue', position: 4 },  // B5
    { team: 'red', position: 4 },   // R5
  ];
  
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
  const [bannedChampions, setBannedChampions] = useState(Array(10).fill(null));
  const [deletedSlots, setDeletedSlots] = useState([]); // Track deleted slots in order
  const [deletedBanSlots, setDeletedBanSlots] = useState([]); // Track deleted ban slots
  const [selectedRole, setSelectedRole] = useState(null); // Track selected role

  // Debug log for team state updates
  useEffect(() => {
    console.log('Blue Team Updated:', blueTeam);
    console.log('Red Team Updated:', redTeam);
    console.log('Banned Champions:', bannedChampions);
    console.log('Selected Champions (Set):', Array.from(selectedChampions));
  }, [blueTeam, redTeam, bannedChampions, selectedChampions]);

  // Update team states based on current selections
  const updateTeamStates = useCallback((newSelections) => {
    console.log('Updating team states with selections:', newSelections);
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
    setBanPhase(0);
    setSelections(Array(draftOrder.length).fill(null));
    setBannedChampions(Array(banOrder.length).fill(null));
    setBlueTeam(Array(5).fill(null));
    setRedTeam(Array(5).fill(null));
    setSelectedChampions(new Set());
    setSelectedRole(null);
    setDeletedSlots([]);
    setDeletedBanSlots([]);
    setResetKey(prev => prev + 1);
  }, [draftOrder.length, banOrder.length]);

  const handleSlotClick = useCallback((team, position) => {
    console.log(`Slot clicked - Team: ${team}, Position: ${position}`);
    const teamKey = team.toLowerCase();
    const teamArray = teamKey === 'blue' ? blueTeam : redTeam;
    const champion = teamArray[position];
    console.log('Champion in slot:', champion?.name || 'Empty slot');
    
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

  const handleBanClick = useCallback((team, position) => {
    const banIndex = banOrder.findIndex(ban => ban.team === team && ban.position === position);
    if (banIndex === -1 || bannedChampions[banIndex] === null) return;
    
    setBannedChampions(prev => {
      const newBans = [...prev];
      newBans[banIndex] = null;
      setDeletedBanSlots(prev => [...prev, banIndex]);
      return newBans;
    });
  }, [bannedChampions]);

  const handleChampionSelect = useCallback((champion) => {
    console.log('Champion selected:', champion.name);
    // Check if champion is already selected or banned
    if (selectedChampions.has(champion.id) || bannedChampions.some(ban => ban?.id === champion.id)) {
      console.log('Champion already selected or banned, ignoring selection');
      return;
    }
    
    if (isBanning) {
      // Handle ban selection
      setBannedChampions(prev => {
        // Check if all ban slots are filled
        const filledBanSlots = prev.filter(Boolean).length;
        if (filledBanSlots >= banOrder.length) {
          return prev;
        }
        
        const newBans = [...prev];
        
        // First fill any deleted ban slots
        if (deletedBanSlots.length > 0) {
          const slotToFill = deletedBanSlots[0];
          newBans[slotToFill] = champion;
          setDeletedBanSlots(prev => prev.slice(1));
        } else {
          // Find next empty ban slot
          const nextEmptyIndex = newBans.findIndex(ban => ban === null);
          if (nextEmptyIndex !== -1) {
            newBans[nextEmptyIndex] = champion;
            setBanPhase(prev => Math.min(prev + 1, banOrder.length - 1));
          }
        }
        
        return newBans;
      });
    } else {
      // Handle pick selection
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
    }
  }, [selectedChampions, bannedChampions, isBanning, draftOrder, deletedSlots, deletedBanSlots, updateTeamStates]);
  
  const banSpotSize = 44;
  const banSpotBaseStyle = {
    width: banSpotSize,
    height: banSpotSize,
    border: "2px solid #222",
    borderRadius: 6,
    backgroundColor: "#0f0f0f",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  const getChampionImageUrl = (championId) => {
    const DATA_DRAGON_CDN = "https://ddragon.leagueoflegends.com/cdn";
    const DATA_DRAGON_PATCH = "15.17.1";
    return `${DATA_DRAGON_CDN}/${DATA_DRAGON_PATCH}/img/champion/${championId}.png`;
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
              {[0, 1, 2, 3, 4].map((position) => {
                const team = isSwapped ? 'red' : 'blue';
                const banIndex = banOrder.findIndex((ban, idx) => 
                  ban.team === team && ban.position === position
                );
                const ban = banIndex !== -1 ? bannedChampions[banIndex] : null;
                const isActive = isBanning && banPhase === banIndex && banOrder[banPhase]?.team === team;
                
                return (
                  <div
                    key={`left-ban-${position}`}
                    onClick={() => ban && handleBanClick(isSwapped ? 'red' : 'blue', position)}
                    style={{
                      ...banSpotBaseStyle,
                      borderColor: isSwapped ? "#dc2626" : "#2563eb",
                      borderWidth: '2px',
                      opacity: ban ? 1 : 0.6,
                      backgroundImage: ban ? `url(${getChampionImageUrl(ban.id)})` : 'none',
                      cursor: ban ? 'pointer' : 'default',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {ban && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, transparent 45%, rgba(220, 38, 38, 0.8) 45%, rgba(220, 38, 38, 0.8) 55%, transparent 55%)',
                        pointerEvents: 'none'
                      }} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Search bar and action buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                flexWrap: "wrap"
              }}
            >
              <input
                type="text"
                placeholder="Search champions..."
                style={{
                  width: "min(380px, 70%)",
                  padding: "12px 16px",
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
                onClick={() => setIsBanning(b => !b)}
                style={{
                  backgroundColor: isBanning ? '#dc2626' : '#2563eb',
                  color: 'white',
                  border: 'none',
                  padding: '4px 6px',
                  minWidth: '80px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s'
                }}
              >
                {isBanning ? 'Banning' : 'Selecting'}
              </button>
              <button
                type="button"
                className="action-button"
                onClick={() => setIsSwapped((s) => !s)}
                style={{
                  backgroundColor: '#0d8a6b',
                  border: 'none',
                  padding: '4px 6px',
                  minWidth: '80px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  color: 'white',
                  transition: 'background-color 0.2s'
                }}
              >
                Swap Side
              </button>
              <button
                type="button"
                className="action-button"
                style={{
                  backgroundColor: '#4b5563',
                  color: 'white',
                  border: 'none',
                  padding: '4px 6px',
                  minWidth: '80px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s'
                }}
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
              {[0, 1, 2, 3, 4].map((position) => {
                const team = isSwapped ? 'blue' : 'red';
                const banIndex = banOrder.findIndex((ban, idx) => 
                  ban.team === team && ban.position === position
                );
                const ban = banIndex !== -1 ? bannedChampions[banIndex] : null;
                const isActive = isBanning && banPhase === banIndex && banOrder[banPhase]?.team === team;
                
                return (
                  <div
                    key={`right-ban-${position}`}
                    onClick={() => ban && handleBanClick(isSwapped ? 'blue' : 'red', position)}
                    style={{
                      ...banSpotBaseStyle,
                      borderColor: isSwapped ? "#2563eb" : "#dc2626",
                      borderWidth: '2px',
                      opacity: ban ? 1 : 0.6,
                      backgroundImage: ban ? `url(${getChampionImageUrl(ban.id)})` : 'none',
                      cursor: ban ? 'pointer' : 'default',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {ban && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, transparent 45%, rgba(220, 38, 38, 0.8) 45%, rgba(220, 38, 38, 0.8) 55%, transparent 55%)',
                        pointerEvents: 'none'
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ChampionGrid 
              key={resetKey} 
              searchTerm={searchTerm} 
              onChampionSelect={handleChampionSelect}
              selectedChampions={selectedChampions}
              bannedChampions={bannedChampions}
              draftPhase={isBanning ? banPhase : draftPhase}
              draftOrder={isBanning ? banOrder : draftOrder}
              isBanning={isBanning}
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
              allyTeam={isSwapped ? redTeam : blueTeam}
              enemyTeam={isSwapped ? blueTeam : redTeam}
              isSwapped={isSwapped}
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
