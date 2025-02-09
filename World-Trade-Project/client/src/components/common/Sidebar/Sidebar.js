import React, { useState } from "react"; // Importation de React et du hook useState
                                            // Importing React and the useState hook

import ThemeToggle from '../ThemeToggle'; // Importation du composant ThemeToggle
                                                // Importing the ThemeToggle component

import {
  FiBarChart,
  FiBookOpen,
  FiChevronsRight,
  FiDollarSign,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiUsers
} from "react-icons/fi"; // Importation des icônes depuis react-icons
                           // Importing icons from react-icons

import { motion } from "framer-motion"; // Importation de motion pour les animations
                                         // Importing motion for animations

import "./Sidebar.css"; // Importation du fichier CSS pour la sidebar
                         // Importing the CSS file for the sidebar

const Sidebar = () => { // Définition du composant Sidebar
                         // Defining the Sidebar component
  const [open, setOpen] = useState(true); // État pour gérer l'ouverture/fermeture de la sidebar
                                           // State to manage sidebar open/close

  const [selected, setSelected] = useState("Dashboard"); // État pour gérer l'élément sélectionné
                                                          // State to manage the selected item

  return (
    <motion.nav
      layout
      style={{
        width: open ? "225px" : "60px", // Largeur en fonction de l'état d'ouverture
                                          // Width based on open state
        backgroundColor: "#2c3e50", // Couleur de fond de la sidebar
                                     // Background color of the sidebar
        color: "#fff", // Couleur du texte
                        // Text color
        height: "100vh", // Hauteur de la sidebar
                          // Sidebar height
        borderRight: "2px solid #1a202c", // Bordure droite
                                           // Right border
        padding: "10px", // Espace intérieur
                           // Inner spacing
        display: "flex", // Utilisation de Flexbox pour la disposition
                          // Using Flexbox for layout
        flexDirection: "column", // Disposition en colonne
                                  // Column layout
        alignItems: "center", // Alignement centré
                               // Centered alignment
        borderRadius: "10px", // Coins arrondis
                               // Rounded corners
      }}
    >
      <TitleSection open={open} /> {/* Section de titre */}
                                     {/* Title section */}
      <div style={{ width: "100%" }}> {/* Conteneur pour les options */}
                                       {/* Container for options */}
        <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Option Icon={FiHome} title="Home" selected={selected} setSelected={setSelected} open={open} />
        </a>
        <Option Icon={FiDollarSign} title="Sales" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiMonitor} title="Games" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiShoppingCart} title="Market" selected={selected} setSelected={setSelected} open={open} />
        <a href="https://paradox-8.gitbook.io/paradox" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
          <Option Icon={FiBookOpen} title="Wiki" selected={selected} setSelected={setSelected} open={open} />
        </a>
        <Option Icon={FiBarChart} title="Analytics" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={FiUsers} title="Members" selected={selected} setSelected={setSelected} open={open} />
      </div>
      <ToggleClose open={open} setOpen={setOpen} /> {/* Bouton pour ouvrir/fermer la sidebar */}
                                                       {/* Button to open/close the sidebar */}

        <ThemeToggle />    {/* Ajout du composant ThemeToggle en haut de l'application */}
                           {/* Adding the ThemeToggle component at the top of the application */}                                           
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open }) => { // Composant pour chaque option
                                                                     // Component for each option
  return (
    <motion.button
      layout
      onClick={() => setSelected(title)}
      style={{
        display: "flex", // Utilisation de Flexbox pour la disposition
                          // Using Flexbox for layout
        alignItems: "center", // Alignement centré
                               // Centered alignment
        width: "100%", // Largeur complète
                        // Full width
        height: "40px", // Hauteur fixe
                         // Fixed height
        padding: "10px", // Espace intérieur
                          // Inner spacing
        backgroundColor: selected === title ? "#EF5777" : "transparent", // Couleur de fond si sélectionné
                                                                           // Background color if selected
        borderRadius: "50px", // Coins arrondis
                              // Rounded corners
        color: "white", // Couleur du texte
                         // Text color
        cursor: "pointer", // Curseur en forme de pointeur
                            // Pointer cursor
        transition: "background 0.3s", // Transition de la couleur de fond
                                         // Background color transition
      }}
    >
      <motion.div style={{ width: "30px", textAlign: "center", fontSize: "18px" }}>
        <Icon /> {/* Affichage de l'icône */}
                {/* Displaying the icon */}
      </motion.div>
      {open && ( // Affichage du titre si la sidebar est ouverte
                 // Displaying the title if the sidebar is open
        <motion.span style={{ marginLeft: "10px", fontSize: "14px" }}>
          {title}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => { // Section de titre
                                     // Title section
  return (
    <div style={{ width: "100%", marginBottom: "20px", textAlign: "center" }}>
      {open && ( // Affichage du titre si la sidebar est ouverte
                 // Displaying the title if the sidebar is open
        <motion.div>
          <span style={{ display: "block", fontSize: "16px", fontWeight: "bold" }}></span>
        </motion.div>
      )}
    </div>
  );
};

const ToggleClose = ({ open, setOpen }) => { // Bouton pour ouvrir/fermer la sidebar
                                               // Button to open/close the sidebar
  return (
    <motion.button
      layout
      onClick={() => setOpen((prev) => !prev)} // Inverse l'état d'ouverture
                                                // Toggles the open state
      style={{
        position: "absolute", // Positionnement absolu
                               // Absolute positioning
        bottom: "20px", // Position en bas
                        // Bottom position
        background: "transparent", // Fond transparent
                                    // Transparent background
        border: "none", // Pas de bordure
                         // No border
        cursor: "pointer", // Curseur en forme de pointeur
                            // Pointer cursor
        color: "white", // Couleur du texte
                         // Text color
      }}
    >
      <FiChevronsRight
        style={{
          fontSize: "24px", // Taille de l'icône
                            // Icon size
          transform: open ? "rotate(180deg)" : "rotate(0deg)", // Rotation de l'icône
                                                               // Icon rotation
          transition: "transform 0.3s", // Transition de la rotation
                                         // Rotation transition
        }}
      />
    </motion.button>
  );
};

export default Sidebar; // Exportation du composant Sidebar
                         // Exporting the Sidebar component