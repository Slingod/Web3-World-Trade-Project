import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

// ✅ Axios instance to fetch game objects
// ✅ Instance Axios pour récupérer les objets du jeu
const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
});

// 🔘 Toggle Button for Light/Dark Mode
// 🔘 Bouton pour basculer entre Mode Jour/Nuit
const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="theme-toggle">
      <button className={`toggle-btn ${theme === "light" ? "active" : ""}`} onClick={() => setTheme("light")}>
        <FiSun />
      </button>
      <button className={`toggle-btn ${theme === "dark" ? "active" : ""}`} onClick={() => setTheme("dark")}>
        <FiMoon />
      </button>
      <motion.div
        layout
        transition={{ type: "spring", damping: 15, stiffness: 250 }}
        className={`toggle-slider ${theme === "dark" ? "right" : "left"}`}
      />
    </div>
  );
};

// 🔹 Main component | Composant principal
const GameObjectsList = ({ selectedCategory, selectedRarity, resetFilters }) => {
  const [gameObjects, setGameObjects] = useState([]);
  const [visibleObjects, setVisibleObjects] = useState(25);

  // ✅ Fetch objects when the component loads
  // ✅ Récupère les objets lors du chargement du composant
  useEffect(() => {
    const fetchGameObjects = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/gameObjects');
        console.log('Number of objects fetched:', response.data.length);
        setGameObjects(response.data);
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    };
    fetchGameObjects();
  }, []);

  // ✅ Define border colors based on item rarity
  // ✅ Définition des couleurs des bordures selon la rareté
  const rarityBorders = {
    'Common': '#a4b0be',       
    'Uncommon': '#1cbf6a',    
    'Rare': '#159cfd',        
    'Epic': '#a369ff',        
    'Legendary': '#e67e22',   
    'Mythic': '#ffd32a',      
    'Exalted': '#ef5777',     
    'Exotic': '#be2edd',      
    'Transcendent': '#ff3838',
    'Unique': '#f368e0'       
  };

  // ✅ Filter objects based on selected Category & Rarity
  // ✅ Filtrer les objets en fonction de la Catégorie & Rareté sélectionnées
  const filteredObjects = gameObjects.filter((item) => {
    const categoryMatch = !selectedCategory || item.type === selectedCategory;
    const rarityMatch = !selectedRarity || item.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  // 🔽 "Show More" button function
  // 🔽 Fonction du bouton "Voir Plus"
  const handleShowMore = () => {
    setVisibleObjects(prevVisibleObjects => prevVisibleObjects + 20);
  };

  // 🌙☀️ Manage Light/Dark Theme
  // 🌙☀️ Gestion du Mode Jour/Nuit
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme; // ✅ Apply theme to <body>
    localStorage.setItem("theme", theme); // ✅ Save in localStorage
  }, [theme]);

  return (
    <div>
      {/* 🔘 Theme Toggle Button */}
      <div style={styles.themeToggleContainer}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      {/* 🏷 Display filtered object count | Afficher le nombre d'objets filtrés */}
      <h1 style={styles.title}>{filteredObjects.length} Items</h1>

      {/* 🖼 Object Grid | Grille des objets */}
      <div style={styles.grid}>
        {filteredObjects.slice(0, visibleObjects).map((gameObject) => (
          <div key={gameObject.id} style={{
            ...styles.card,
            border: `3px solid ${rarityBorders[gameObject.rarity] || '#FFFFFF'}` 
          }}>
            {gameObject.img && (
              gameObject.img.endsWith('.webm') ? (
                <video src={gameObject.img} autoPlay loop muted style={styles.image} />
              ) : (
                <img src={gameObject.img} alt={gameObject.name} style={styles.image} />
              )
            )}
            <h2 style={styles.name}>{gameObject.name}</h2>
            <p>{gameObject.type}</p>
            {gameObject.rarity !== '-' && <p>{gameObject.rarity}</p>}
            {gameObject.stackSize !== 0 && <p>{gameObject.stackSize}</p>}
            <p>${gameObject.purchasePrice}</p>
          </div>
        ))}
      </div>

      {/* 📌 "Show More" Button | Bouton "Voir Plus" */}
      {visibleObjects < filteredObjects.length && (
        <div style={styles.showMoreContainer}>
          <button onClick={handleShowMore} style={styles.showMoreButton}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

// 🎨 Styles
const styles = {
  themeToggleContainer: {
    position: "absolute",
    top: "10px",
    right: "20px",
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'var(--card-bg)',
    color: 'var(--card-text)',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  showMoreContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  showMoreButton: {
    backgroundColor: "#ffd32a",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default GameObjectsList;
