import React from "react"; // Importation de React
                           // Importing React

import "../common/Sidebar/Sidebar.css"; // Importation du fichier CSS pour la sidebar
                                        // Importing the CSS file for the sidebar

// ✅ Couleurs associées à chaque rareté
// ✅ Colors associated with each rarity
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

// ✅ Catégories disponibles
// ✅ Available categories
const categories = ["Armor", "Artifact", "Island", "Tool", "Weapon"];

// ✅ Tags associés à chaque catégorie
// ✅ Tags associated with each category
const tags = {
  Artifact: ["Armor", "Tool", "Weapon"],
  Island: ["Additional", "Founder"],
  Tool: ["Axe", "Pickaxe"],
  Weapon: ["Claws", "Club", "Dual Axes", "Greathammer", "Greatsword", "Sword And Shield"],
};

// ✅ Composant RaritySidebar
// ✅ RaritySidebar Component
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
      {/* ✅ Bouton de réinitialisation centré */}
      {/* ✅ Centered Reset Button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <button
          onClick={resetFilters}
          style={{
            padding: "10px 15px",
            backgroundColor: "#ffd32a",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* ✅ Section Rareté */}
      {/* ✅ Rarity Section */}
      <h2 className="sidebar-title">Rarity</h2>
      <ul className="sidebar-list">
        {Object.entries(rarityColors).map(([rarity, color]) => (
          <li
            key={rarity}
            className="sidebar-item"
            style={{ color, cursor: "pointer" }}
            onClick={() => setSelectedRarity(rarity)}
          >
            {rarity}
          </li>
        ))}
      </ul>

      {/* ✅ Section Catégories */}
      {/* ✅ Categories Section */}
      <h2 className="sidebar-title">Categories</h2>
      <ul className="sidebar-list">
        {categories.map((category) => (
          <li
            key={category}
            className="sidebar-item"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      {/* ✅ Section Tags */}
      {/* ✅ Tags Section */}
      <h2 className="sidebar-title">Tags</h2>
      {Object.entries(tags).map(([category, items]) => (
        <div key={category}>
          <h3 className="sidebar-subtitle">{category}</h3>
          <ul className="sidebar-list">
            {items.map((item) => (
              <li
                key={item}
                className="sidebar-item"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedTag(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RaritySidebar; // Exportation du composant RaritySidebar
                               // Exporting the RaritySidebar component
