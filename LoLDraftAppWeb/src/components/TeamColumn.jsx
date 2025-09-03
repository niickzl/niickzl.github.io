import TeamSlot from "./TeamSlot";

export default function TeamColumn({ 
  team, 
  teamData = Array(5).fill(null), 
  onSlotClick = () => {}
}) {
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
      {[0, 1, 2, 3, 4].map((position) => (
        <TeamSlot 
          key={position} 
          team={team} 
          index={position} 
          champion={teamData[position]}
          onClick={() => onSlotClick(team, position)}
        />
      ))}
    </div>
  );
}
