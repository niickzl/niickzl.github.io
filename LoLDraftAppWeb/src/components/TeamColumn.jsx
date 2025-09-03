import TeamSlot from "./TeamSlot";

export default function TeamColumn({ team, teamData = Array(5).fill(null) }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "repeat(5, 1fr)",
        gap: "8px",
        alignItems: "center",
        justifyItems: "center",
        height: "100%"
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <TeamSlot 
          key={i} 
          team={team} 
          index={i} 
          champion={teamData[i]} 
        />
      ))}
    </div>
  );
}
