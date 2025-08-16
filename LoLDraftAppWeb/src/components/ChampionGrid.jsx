import { useEffect, useMemo, useState } from "react";

const DATA_DRAGON_CDN = "https://ddragon.leagueoflegends.com/cdn";
const DATA_DRAGON_PATCH = "15.15.1";
const TILE_SIZE = "clamp(80px, 7vw, 112px)";

export default function ChampionGrid({ searchTerm = "" }) {
  const [champions, setChampions] = useState([]);
  const [error, setError] = useState(null);

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

  const filteredChampions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return sortedChampions;
    return sortedChampions.filter((c) => c.name.toLowerCase().includes(term));
  }, [sortedChampions, searchTerm]);

  return (
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
        height: "95%",
        overflowX: "hidden",
        overflowY: "auto",
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
            onClick={() => console.log(`Champion selected: ${champ.name}`)}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                overflow: "hidden",
                borderRadius: "8px",
                backgroundColor: "#181818",
                border: "1px solid #2a2a2a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={imgUrl}
                alt={champ.name}
                style={{
                  width: "95%",
                  height: "95%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 14,
                color: "#ddd",
                textAlign: "center",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={champ.name}
            >
              {champ.name}
            </div>
          </button>
        );
      })}
    </div>
  );
}
