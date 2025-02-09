import React, { useEffect, useState } from "react"; // Importation de React et des hooks useEffect et useState
                                                    // Importing React and the useEffect and useState hooks

import { motion } from "framer-motion"; // Importation de motion pour les animations
                                        // Importing motion for animations

import { FiMoon, FiSun } from "react-icons/fi"; // Importation des icônes de lune et de soleil depuis react-icons
                                                // Importing moon and sun icons from react-icons

const ThemeToggle = () => { // Définition du composant ThemeToggle
                            // Defining the ThemeToggle component

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // État pour gérer le thème, initialisé avec la valeur stockée dans le localStorage ou "light" par défaut
  // State to manage the theme, initialized with the value stored in localStorage or "light" by default

  useEffect(() => {
    document.body.className = theme; // Applique le thème au corps du document
                                     // Applies the theme to the document body

    localStorage.setItem("theme", theme); // Stocke le thème dans le localStorage
                                          // Stores the theme in localStorage

  }, [theme]); // Déclenché lorsque le thème change
               // Triggered when the theme changes

  const styles = {
    container: {
      display: "flex", // Utilisation de Flexbox pour la disposition
                       // Using Flexbox for layout

      alignItems: "center", // Alignement centré
                            // Centered alignment

      gap: "10px", // Espacement entre les éléments
                   // Spacing between elements
    },
    button: (isActive) => ({
      background: "none", // Pas de fond
                          // No background

      border: "none", // Pas de bordure
                      // No border

      cursor: "pointer", // Curseur en forme de pointeur
                         // Pointer cursor

      fontSize: "24px", // Taille de la police
                        // Font size

      color: isActive ? "#f39c12" : "#7f8c8d", // Couleur en fonction de l'état actif
                                               // Color based on active state

      transition: "color 0.3s ease-in-out", // Transition de la couleur
                                           // Color transition
    }),
    slider: {
      width: "30px", // Largeur du curseur
                     // Slider width

      height: "10px", // Hauteur du curseur
                      // Slider height
                      
      backgroundColor: theme === "dark" ? "#2c3e50" : "#ecf0f1", // Couleur de fond en fonction du thème
                                                                // Background color based on theme
      borderRadius: "10px", // Coins arrondis
                            // Rounded corners
      transition: "background-color 0.3s ease-in-out", // Transition de la couleur de fond
                                                      // Background color transition
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.button(theme === "light")} onClick={() => setTheme("light")}>
        <FiSun /> {/* Affichage de l'icône de soleil */}
                  {/* Displaying the sun icon */}
      </button>
      <button style={styles.button(theme === "dark")} onClick={() => setTheme("dark")}>
        <FiMoon />  {/* Affichage de l'icône de lune */}
                    {/* Displaying the moon icon */}
      </button>
      <motion.div
        layout
        transition={{ type: "spring", damping: 15, stiffness: 250 }}
        style={styles.slider}
      />  {/* Curseur animé */}
          {/* Animated slider */}
    </div>
  );
};

export default ThemeToggle;   // Exportation du composant ThemeToggle
                             // Exporting the ThemeToggle component
