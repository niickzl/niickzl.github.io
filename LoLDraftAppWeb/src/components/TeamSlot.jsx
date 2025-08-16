export default function TeamSlot({ team, index }) {
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
        fontSize: "clamp(12px, 1.8vw, 18px)"
      }}
    >
      {team} {index + 1}
    </div>
  );
}
