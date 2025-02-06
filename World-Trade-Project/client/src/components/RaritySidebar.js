import React from "react";
import "../styles/Sidebar.css"; // ✅ On réutilise le même CSS que l'ancienne Sidebar

const rarities = [
  { name: "Common", color: "#a4b0be" },
  { name: "Uncommon", color: "#1cbf6a" },
  { name: "Rare", color: "#159cfd" },
  { name: "Epic", color: "#a369ff" },
  { name: "Legendary", color: "#e67e22" },
  { name: "Mythic", color: "#ffd32a" },
  { name: "Exalted", color: "#ef5777" },
  { name: "Exotic", color: "#be2edd" },
  { name: "Transcendent", color: "#ff3838" },
  { name: "Unique", color: "#f368e0" }
];

const RaritySidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Rarity</h2>
      <ul className="sidebar-list">
        {rarities.map((rarity) => (
          <li 
            key={rarity.name} 
            className="sidebar-item"
            style={{ backgroundColor: rarity.color }} // ✅ Applique la couleur
          >
            {rarity.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RaritySidebar;
