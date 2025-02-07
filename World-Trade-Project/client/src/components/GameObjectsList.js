import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import Login from './Login'; // ✅ Login Form imported
import '../styles/GameObjectsList.css';

// ✅ Axios instance to fetch game objects
// 🇬🇧 This instance ensures that we correctly retrieve game objects from the API.
// 🇫🇷 Cette instance garantit que nous récupérons correctement les objets du jeu depuis l'API.
const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
});

// 🔘 Theme Toggle Component
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

// 🔹 Main Component | Displays game objects
const GameObjectsList = ({ selectedCategory, selectedRarity, selectedTag }) => {
  const [gameObjects, setGameObjects] = useState([]); // Full list of objects
  const [visibleObjects, setVisibleObjects] = useState(25); // Number of objects visible
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Theme management
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  // ✅ Fetch game objects from API
  useEffect(() => {
    const fetchGameObjects = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('http://localhost:5000/api/gameObjects');
        setGameObjects(response.data);
      } catch (error) {
        setError('Failed to fetch game objects.');
        console.error('Error fetching game objects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGameObjects();
  }, []);

  // ✅ Reset visible objects when filters change
  useEffect(() => {
    setVisibleObjects(30);
  }, [selectedCategory, selectedRarity]);

  // ✅ Apply filters
  const filteredObjects = gameObjects.filter((item) => {
    const categoryMatch = !selectedCategory || item.type === selectedCategory;
    const rarityMatch = !selectedRarity || item.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  // ✅ Apply dark/light mode
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Define border colors by rarity
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

  // 🔽 "Show More" button function
  const handleShowMore = () => {
    setVisibleObjects(prev => prev + 20);
  };

  // ✅ Show loading state
  if (loading) {
    return <p style={styles.loading}>Loading game objects...</p>;
  }

  // ✅ Show error state
  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div>
      {/* 🔘 Theme Toggle Button | 🇬🇧 Allows user to switch between light and dark mode */}
      {/* 🇫🇷 Permet à l'utilisateur de passer du mode clair au mode sombre */}
      <div style={styles.themeToggleContainer}>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>

      {/* 🔐 Login Form | 🇬🇧 Placed above the title */}
      {/* 🇫🇷 Formulaire de connexion placé au-dessus du titre */}
      <Login />

      {/* 🏷 Number of filtered objects | 🇬🇧 Displays the number of items found */}
      {/* 🇫🇷 Affiche le nombre d'objets trouvés */}
      <h1 style={styles.title}>{filteredObjects.length} Items</h1>

      {/* 🖼 Grid of filtered game objects | 🇬🇧 Displays the items in a grid */}
      {/* 🇫🇷 Affiche les objets sous forme de grille */}
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

      {/* 📌 "Show More" button | 🇬🇧 Allows user to load more items */}
      {/* 🇫🇷 Permet à l'utilisateur de charger plus d'objets */}
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

// 🎨 CSS Styles
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
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ffa502',
  },
  error: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#ff4757',
  }
};

export default GameObjectsList;
