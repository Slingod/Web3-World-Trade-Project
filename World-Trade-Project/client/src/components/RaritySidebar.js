import React from "react";
import "../styles/Sidebar.css"; // Assurez-vous d'avoir un fichier CSS associé

const rarityColors = {
  Common: "#a4b0be",
  Uncommon: "#1cbf6a",
  Rare: "#159cfd",
  Epic: "#a369ff",
  Legendary: "#e67e22",
  Mythic: "#ffd32a",
  Exalted: "#ef5777",
  Exotic: "#be2edd",
  Transcendent: "#ff3838",
  Unique: "#f368e0",
};

const categories = [
  "Armor",
  "Artifacts",
  "Decorations",
  "Land",
  "Access Keys",
  "Lootbox",
  "Tools",
  "Weapons",
];

const tags = {
  Artifacts: ["Armor", "Tool", "Weapon"],
  Decorations: ["Asian", "Carpet", "Furniture", "Light", "Miscellaneous", "Plant", "Wall Decor"],
  Land: ["Additional", "Founder"],
  Tools: ["Axe", "Pickaxe"],
  Weapon: ["Claws", "Club", "Dual Axes", "Greathammer", "Greatsword", "Sword And Shield"],
};

const RaritySidebar = () => {
  return (
    <div className="sidebar">
      {/* Section Rarity */}
      <h2 className="sidebar-title">Rarity</h2>
      <ul className="sidebar-list">
        {Object.entries(rarityColors).map(([rarity, color]) => (
          <li key={rarity} className="sidebar-item" style={{ color }}>
            {rarity}
          </li>
        ))}
      </ul>

      {/* Section Categories */}
      <h2 className="sidebar-title">Categories</h2>
      <ul className="sidebar-list">
        {categories.map((category) => (
          <li key={category} className="sidebar-item">{category}</li>
        ))}
      </ul>

      {/* Section Tags */}
      <h2 className="sidebar-title">Tags</h2>
      {Object.entries(tags).map(([category, items]) => (
        <div key={category}>
          <h3 className="sidebar-subtitle">{category}</h3>
          <ul className="sidebar-list">
            {items.map((item) => (
              <li key={item} className="sidebar-item"> {item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RaritySidebar;
