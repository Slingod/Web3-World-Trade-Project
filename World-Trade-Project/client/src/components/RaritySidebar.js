import React from "react";
import "../styles/Sidebar.css";

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
  "Artifact",
  "Island",
  "Tool",
  "Weapon",
];

const tags = {
  Artifact: ["Armor", "Tool", "Weapon"],
  Island: ["Additional", "Founder"],
  Tool: ["Axe", "Pickaxe"],
  Weapon: ["Claws", "Club", "Dual Axes", "Greathammer", "Greatsword", "Sword And Shield"],
};

const RaritySidebar = ({
  selectedRarity,
  setSelectedRarity,
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  resetFilters,
}) => {
  return (
    <div className="sidebar">
      {/* Section Rarity */}
      <h2 className="sidebar-title">Rarity</h2>
      <ul className="sidebar-list">
        {Object.entries(rarityColors).map(([rarity, color]) => (
          <li
            key={rarity}
            className="sidebar-item"
            style={{ color, cursor: 'pointer' }}
            onClick={() => setSelectedRarity(rarity)}
          >
            {rarity}
          </li>
        ))}
      </ul>

      {/* Section Categories */}
      <h2 className="sidebar-title">Categories</h2>
      <ul className="sidebar-list">
        {categories.map((category) => (
          <li
            key={category}
            className="sidebar-item"
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      {/* Section Tags */}
      <h2 className="sidebar-title">Tags</h2>
      {Object.entries(tags).map(([category, items]) => (
        <div key={category}>
          <h3 className="sidebar-subtitle">{category}</h3>
          <ul className="sidebar-list">
            {items.map((item) => (
              <li
                key={item}
                className="sidebar-item"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedTag(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Reset Button */}
      <button onClick={resetFilters} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#ffd32a', border: 'none', cursor: 'pointer' }}>
        Reset Filters
      </button>
    </div>
  );
};

export default RaritySidebar;
