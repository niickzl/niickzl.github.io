import { useCallback, useEffect, useMemo, useState } from "react";
import championRoles from "../data/championRoles";
import { rankChampions } from "../utils/draftAnalyzer";
import championStats from "../data/championStats";

// Import role icons
const TopIcon = "./roleIcon/Top_icon.png";
const JungleIcon = "./roleIcon/Jungle_icon.png";
const MidIcon = "./roleIcon/Middle_icon.png";
const BotIcon = "./roleIcon/Bottom_icon.png";
const SupportIcon = "./roleIcon/Support_icon.png";

const DATA_DRAGON_CDN = "https://ddragon.leagueoflegends.com/cdn";
const DATA_DRAGON_PATCH = "15.17.1";
const TILE_SIZE = "clamp(80px, 7vw, 112px)";

export default function ChampionGrid({ 
  searchTerm = "", 
  onChampionSelect, 
  selectedChampions = new Set(),
  bannedChampions = [],
  draftOrder = [],
  isBanning = false,
  allyTeam = [],
  enemyTeam = [],
  isSwapped = false,
  selectedRole = null,
  onRoleSelect = () => {}
}) {
  const [champions, setChampions] = useState([]);
  const [error, setError] = useState(null);
  const [recommendedChampions, setRecommendedChampions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const res = await fetch(
          `${DATA_DRAGON_CDN}/${DATA_DRAGON_PATCH}/data/en_US/champion.json`
        );
        const json = await res.json();
        const list = Object.values(json.data || {});
        if (!isMounted) return;
        setChampions(list);
      } catch (e) {
        if (!isMounted) return;
        setError("Failed to load champions");
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const sortedChampions = useMemo(() => {
    return [...champions].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
  }, [champions]);

  // Handle role selection
  const handleRoleSelect = useCallback((role) => {
    onRoleSelect(role);
  }, [onRoleSelect]);

  // Team changes effect - no debug logs

  // Update recommendations when teams or draft state changes
  useEffect(() => {
    if (!champions.length) return;

    const calculateRecommendations = () => {
      try {
        const allySide = isSwapped ? 'red' : 'blue';
        const enemySide = isSwapped ? 'blue' : 'red';

        // Get ally and enemy champions based on current side
        // Note: The team arrays are already filtered by side in the Home component
        const currentAllyTeam = Array.isArray(allyTeam) ? [...allyTeam] : [];
        const currentEnemyTeam = Array.isArray(enemyTeam) ? [...enemyTeam] : [];

        // Get champion names for the algorithm
        const allyChampions = currentAllyTeam
          .filter(Boolean)  // Remove null/undefined entries
          .map(champ => champ.name);  // Champion objects are directly in the array
          
        const enemyChampions = currentEnemyTeam
          .filter(Boolean)  // Remove null/undefined entries
          .map(champ => champ.name);  // Champion objects are directly in the array
          
        // Get all available champions that aren't banned or already picked
        const availableChampions = champions
          .filter(champ => !bannedChampions.some(ban => ban?.id === champ.id) && 
                          !selectedChampions.has(champ.id))
          .map(champ => champ.name);

        // Always run the algorithm, even with empty teams
        const recommendations = rankChampions(
          allyChampions,
          enemyChampions,
          availableChampions,
          championStats
        );
        
        setRecommendedChampions(recommendations || []);
      } catch (error) {
        console.error('Error calculating recommendations');
        setRecommendedChampions([]);
      }
    };

    // Use requestAnimationFrame to debounce rapid updates
    const frameId = requestAnimationFrame(calculateRecommendations);
    return () => cancelAnimationFrame(frameId);
  }, [
    champions, 
    JSON.stringify(allyTeam),
    JSON.stringify(enemyTeam), 
    JSON.stringify(bannedChampions), 
    selectedChampions.size,
    isSwapped,
    championStats  // Add championStats to dependencies
  ]);

  const filteredChampions = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    
    // Create a map of recommendation scores for sorting
    const recommendationScores = {};
    recommendedChampions.forEach((rec, index) => {
      recommendationScores[rec.name] = recommendedChampions.length - index;
    });

    // Start with all champions
    let result = [...champions];
    
    // Apply role filter if selected
    if (selectedRole) {
      result = result.filter(champ => {
        const roles = championRoles[champ.name]?.roles || [];
        return roles.some(role => 
          role && role.toLowerCase() === selectedRole.toLowerCase()
        );
      });
    }

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(champ => 
        champ.name.toLowerCase().includes(searchLower) ||
        champ.id.toLowerCase().includes(searchLower)
      );
    }

    // Always sort by recommendation score if available, then by name
    result = [...result].sort((a, b) => {
      const scoreA = recommendationScores[a.name] || 0;
      const scoreB = recommendationScores[b.name] || 0;
      
      // Sort by recommendation score (highest first)
      if (scoreA !== scoreB) {
        return scoreB - scoreA;
      }
      
      // If same score or no scores, sort by name
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [champions, searchTerm, selectedRole, championRoles, recommendedChampions]);

  const isChampionSelectable = useCallback((champion) => {
    // Check if champion is already selected or banned
    if (selectedChampions.has(champion.id) || bannedChampions.some(ban => ban?.id === champion.id)) {
      return false;
    }
    
    // If in banning mode, check if all ban slots are filled
    if (isBanning) {
      const filledBanSlots = bannedChampions.filter(Boolean).length;
      return filledBanSlots < draftOrder.length;
    }
    
    // In picking mode, always allow selection if champion isn't banned or already picked
    return true;
  }, [selectedChampions, bannedChampions, draftOrder.length, isBanning]);

  return (
    <div className="champion-grid-container" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '15px', flexShrink: 0 }}>
        {[
          { name: 'Top', icon: TopIcon, role: 'top' },
          { name: 'Jungle', icon: JungleIcon, role: 'jungle' },
          { name: 'Mid', icon: MidIcon, role: 'mid' },
          { name: 'Bot', icon: BotIcon, role: 'bot' },
          { name: 'Support', icon: SupportIcon, role: 'support' }
        ].map((role) => (
          <button
            key={role.name}
            type="button"
            className={`role-button ${selectedRole === role.role ? 'role-button-active' : ''}`}
            onClick={() => onRoleSelect(selectedRole === role.role ? null : role.role)}
          >
            <img 
              src={role.icon} 
              alt={role.name} 
              title={role.name}
              style={{ width: '35px', height: '35px' }}
            />
          </button>
        ))}
      </div>
      <div
        className="champion-grid"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${TILE_SIZE}, ${TILE_SIZE}))`,
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "start",
          alignContent: "start",
          gap: "16px",
          backgroundColor: "#111",
          padding: "30px",
          paddingBottom: "36px",
          borderRadius: "10px",
          overflow: "auto",
          minHeight: 0, // Important for flex children to respect overflow
        }}
      >
        {error && (
          <div style={{ color: "#f87171" }}>Unable to load champions.</div>
        )}
        {!error && filteredChampions.map((champ) => {
          const imgUrl = `${DATA_DRAGON_CDN}/${DATA_DRAGON_PATCH}/img/champion/${champ.image.full}`;
          return (
            <button
              key={champ.id}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                color: "inherit"
              }}
              onClick={() => isChampionSelectable(champ) && onChampionSelect(champ)}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: "8px",
                  backgroundColor: selectedChampions.has(champ.id) 
                    ? "#1a3a1a" 
                    : bannedChampions.some(ban => ban?.id === champ.id)
                      ? "#3a1a1a"
                      : "#181818",
                  border: selectedChampions.has(champ.id)
                    ? "2px solid #4CAF50"
                    : bannedChampions.some(ban => ban?.id === champ.id)
                      ? "2px solid #f44336"
                      : "1px solid #2a2a2a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: 'relative',
                  opacity: selectedChampions.has(champ.id) || bannedChampions.some(ban => ban?.id === champ.id) 
                    ? 0.5 
                    : (isChampionSelectable(champ) ? 1 : 0.3),
                  cursor: isChampionSelectable(champ) ? 'pointer' : 'not-allowed',
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={imgUrl}
                    alt={champ.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {recommendedChampions.some(rec => rec.name === champ.name) && (() => {
                    const recommendation = recommendedChampions.find(rec => rec.name === champ.name);
                    const score = Math.round(recommendation.final_score);
                    return (
                      <div style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        borderRadius: '4px',
                        padding: '2px 6px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        lineHeight: 1.1,
                        textShadow: '0 1px 1px rgba(0,0,0,0.3)',
                        minWidth: '18px',
                        textAlign: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                      }}>
                        {score}
                      </div>
                    );
                  })()}
                </div>
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  color: selectedChampions.has(champ.id) 
                    ? "#4CAF50" 
                    : bannedChampions.some(ban => ban?.id === champ.id) 
                      ? "#f87171" 
                      : "#ddd",
                  textAlign: "center",
                  width: "100%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: selectedChampions.has(champ.id) || bannedChampions.some(ban => ban?.id === champ.id) 
                    ? 'bold' 
                    : 'normal'
                }}
                title={champ.name}
              >
                {champ.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
