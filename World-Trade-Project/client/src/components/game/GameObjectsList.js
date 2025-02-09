import React, { useEffect, useState } from "react"; // Importation de React et des hooks useEffect et useState
                                                    // Importing React and the useEffect and useState hooks

import axios from "axios"; // Importation de la bibliothèque axios pour les requêtes HTTP
                           // Importing the axios library for HTTP requests

import Login from "../auth/Login"; // Importation du composant Login
                              // Importing the Login component

import "./GameObjectsList.css"; // Importation du fichier CSS pour le composant
                                // Importing the CSS file for the component

// ✅ Instance Axios pour récupérer les objets de jeu
// ✅ Axios instance to fetch game objects
const axiosInstance = axios.create({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  },
});

// 🔹 Composant Principal | Affiche les objets de jeu
// 🔹 Main Component | Displays game objects
const GameObjectsList = ({ selectedCategory, selectedRarity }) => {
  const [gameObjects, setGameObjects] = useState([]); // État pour stocker les objets de jeu
                                                     // State to store game objects

  const [visibleObjects, setVisibleObjects] = useState(25); // Nombre d'objets visibles
                                                           // Number of visible objects

  const [loading, setLoading] = useState(true); // État pour gérer le chargement
                                               // State to manage loading

  const [error, setError] = useState(null); // État pour gérer les erreurs
                                            // State to manage errors

  // ✅ Récupérer les objets de jeu depuis l'API
  // ✅ Fetch game objects from API
  useEffect(() => {
    const fetchGameObjects = async () => {
      try {
        setLoading(true); // Active l'état de chargement
                         // Activates loading state

        const response = await axiosInstance.get(
          "http://localhost:5000/api/gameObjects"
        );
        setGameObjects(response.data); // Met à jour les objets de jeu
                                       // Updates game objects
      } catch (error) {
        setError("Failed to fetch game objects."); // Gère les erreurs
                                                   // Handles errors

        console.error("Error fetching game objects:", error);
      } finally {
        setLoading(false); // Désactive l'état de chargement
                           // Deactivates loading state
      }
    };
    fetchGameObjects();
  }, []);

  // ✅ Réinitialiser les objets visibles lorsque les filtres changent
  // ✅ Reset visible objects when filters change
  useEffect(() => {
    setVisibleObjects(30);
  }, [selectedCategory, selectedRarity]);

  // ✅ Appliquer les filtres
  // ✅ Apply filters
  const filteredObjects = gameObjects.filter((item) => {
    const categoryMatch = !selectedCategory || item.type === selectedCategory;
    const rarityMatch = !selectedRarity || item.rarity === selectedRarity;
    return categoryMatch && rarityMatch;
  });

  // ✅ Définir les couleurs de bordure par rareté
  // ✅ Define border colors by rarity
  const rarityBorders = {
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

  // 🔽 Fonction du bouton "Show More"
  // 🔽 "Show More" button function
  const handleShowMore = () => {
    setVisibleObjects((prev) => prev + 20); // Augmente le nombre d'objets visibles
                                            // Increases the number of visible objects
  };

  // ✅ Afficher l'état de chargement
  // ✅ Show loading state
  if (loading) {
    return <p style={styles.loading}>Loading game objects...</p>;
  }

  // ✅ Afficher l'état d'erreur
  // ✅ Show error state
  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div>
      {/* 🔐 Formulaire de connexion */}
      {/* 🔐 Login Form */}
      <Login />

      {/* 🏷 Nombre d'objets filtrés */}
      {/* 🏷 Number of filtered objects */}
      <h1 style={styles.title}>{filteredObjects.length} Items</h1>

      {/* 🖼 Grille des objets de jeu filtrés */}
      {/* 🖼 Grid of filtered game objects */}
      <div style={styles.grid}>
        {filteredObjects.slice(0, visibleObjects).map((gameObject) => (
          <div
            key={gameObject.id}
            style={{
              ...styles.card,
              border: `3px solid ${
                rarityBorders[gameObject.rarity] || "#FFFFFF"
              }`,
            }}
          >
            {gameObject.img &&
              (gameObject.img.endsWith(".webm") ? (
                <video
                  src={gameObject.img}
                  autoPlay
                  loop
                  muted
                  style={styles.image}
                />
              ) : (
                <img
                  src={gameObject.img}
                  alt={gameObject.name}
                  style={styles.image}
                />
              ))}
            <h2 style={styles.name}>{gameObject.name}</h2>
            <p>{gameObject.type}</p>
            {gameObject.rarity !== "-" && <p>{gameObject.rarity}</p>}
            {gameObject.stackSize !== 0 && <p>{gameObject.stackSize}</p>}
            <p>${gameObject.purchasePrice}</p>
          </div>
        ))}
      </div>

      {/* 📌 Bouton "Show More" */}
      {/* 📌 "Show More" button */}
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

// 🎨 Styles CSS
// 🎨 CSS Styles
const styles = {
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "var(--card-bg)",
    color: "var(--card-text)",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#ffa502",
  },
  error: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#ff4757",
  },
};

export default GameObjectsList; // Exportation du composant GameObjectsList
                                 // Exporting the GameObjectsList component
