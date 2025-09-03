const DATA_DRAGON_CDN = "https://ddragon.leagueoflegends.com/cdn";
const DATA_DRAGON_PATCH = "15.15.1";

export default function TeamSlot({ team, index, champion = null }) {
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

  return (
    <div
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
        position: "relative"
      }}
    >
      {champion ? (
        <img
          src={`${DATA_DRAGON_CDN}/${DATA_DRAGON_PATCH}/img/champion/${champion.image.full}`}
          alt={champion.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      ) : (
        <span style={{ zIndex: 1, textShadow: "0 0 4px rgba(0,0,0,0.8)" }}>
          {team} {index + 1}
        </span>
      )}
    </div>
  );
}
