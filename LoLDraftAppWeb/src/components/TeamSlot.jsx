const DATA_DRAGON_CDN = "https://ddragon.leagueoflegends.com/cdn";
const DATA_DRAGON_PATCH = "15.15.1";

import { useState } from 'react';

export default function TeamSlot({ team, index, champion = null, onClick = () => {} }) {
  const [isHovered, setIsHovered] = useState(false);
  const blueBorderColors = [
    "#60A5FA", // blue-400
    "#3B82F6", // blue-500
    "#2563EB", // blue-600
    "#1D4ED8", // blue-700
    "#1E40AF"  // blue-800
  ];
  const redBorderColors = [
    "#FCA5A5", // red-300
    "#F87171", // red-400
    "#EF4444", // red-500
    "#DC2626", // red-600
    "#B91C1C"  // red-700
  ];
  const isBlueTeam = String(team).toLowerCase() === "blue";
  const borderColor = (isBlueTeam ? blueBorderColors : redBorderColors)[index % 5];

  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => champion && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "auto",
        height: "100%",
        aspectRatio: "1 / 1",
        border: `2px solid ${borderColor}`,
        borderRadius: "10px",
        backgroundColor: "#1c1c1c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#aaa",
        fontSize: "clamp(12px, 1.8vw, 18px)",
        overflow: "hidden",
        position: "relative",
        cursor: champion ? 'pointer' : 'default',
        transition: 'all 0.1s ease-in-out',
        transform: isHovered && champion ? 'scale(1.02)' : 'none',
        boxShadow: isHovered && champion ? '0 0 15px #ff4444' : 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        KhtmlUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {champion ? (
        <>
          <img
            src={`${DATA_DRAGON_CDN}/${DATA_DRAGON_PATCH}/img/champion/${champion.id}.png`}
            alt={champion.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: 'none',
              WebkitUserDrag: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              opacity: isHovered ? 0.6 : 1,
              filter: isHovered ? 'grayscale(50%) brightness(0.8)' : 'none',
              transition: 'all 0.2s ease-in-out'
            }}
          />
          {isHovered && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#ff4444',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textShadow: '0 0 8px rgba(0,0,0,0.8)',
              pointerEvents: 'none'
            }}>
              ×
            </div>
          )}
        </>
      ) : (
        <span style={{ 
          zIndex: 1, 
          textShadow: "0 0 4px rgba(0,0,0,0.8)",
          userSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none'
        }}>
          {team} {index + 1}
        </span>
      )}
    </div>
  );
}
