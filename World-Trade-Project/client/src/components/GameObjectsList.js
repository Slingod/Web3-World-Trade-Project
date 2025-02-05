import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

// Création d'une instance Axios
const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
});

// 🔘 Composant Toggle Jour/Nuit
const ThemeToggle = ({ theme, setTheme }) => {
  return (
    <div className="theme-toggle">
      <button
        className={`toggle-btn ${theme === "light" ? "active" : ""}`}
        onClick={() => setTheme("light")}
      >
        <FiSun />
      </button>
      <button
        className={`toggle-btn ${theme === "dark" ? "active" : ""}`}
        onClick={() => setTheme("dark")}
      >
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

const GameObjectsList = () => {
  const [gameObjects, setGameObjects] = useState([]);
  const [visibleObjects, setVisibleObjects] = useState(20);

  // 🔄 Fetch des objets de l'API au chargement
  useEffect(() => {
    const fetchGameObjects = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/gameObjects');
        console.log('Nombre d\'objets récupérés :', response.data.length);
        setGameObjects(response.data);
      } catch (error) {
        console.error('Erreur lors du fetch des objets :', error);
      }
    };

    fetchGameObjects();
  }, []);

  // 🎨 Définition des couleurs des bordures selon la rareté
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

  // 🔽 Bouton "Show More"
  const handleShowMore = () => {
    setVisibleObjects(prevVisibleObjects => prevVisibleObjects + 20);
  };

  // 🌙☀️ Gestion du mode Jour/Nuit (APPLIQUÉ À TOUTE LA PAGE)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme; // ✅ Switch color from <body> 
    localStorage.setItem("theme", theme); // ✅ Save on localStorage
  }, [theme]);

  return (
    <div>
      {/* 🔘 Bouton Day/Night on Top Left */}
      <div style={styles.themeToggleContainer}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      <h1 style={styles.title}>167 Items</h1>
      
      <div style={styles.grid}>
        {gameObjects.slice(0, visibleObjects).map((gameObject) => (
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

      {/* 📌 Bouton "Show More" */}
      {visibleObjects < gameObjects.length && (
        <div style={styles.showMoreContainer}>
          <button onClick={handleShowMore} style={styles.showMoreButton}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

// 🎨 Styles Online
const styles = {
  themeToggleContainer: {
    position: "absolute",
    top: "10px",
    right: "20px",
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
  },

  // 🎨 Card Styles (Objects)
  card: {
    backgroundColor: 'var(--card-bg)',
    color: 'var(--card-text)',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  showMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },

  // 🎨 Show More Button Styles
  showMoreButton: {
    backgroundColor: '#FFFFFF',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#1a202c',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background 0.3s ease',
  },
};

export default GameObjectsList;
