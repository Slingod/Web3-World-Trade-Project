import React, { useState, useEffect } from 'react'; // Importation de React, du hook useState et useEffect
                                                   // Importing React, useState and useEffect hook

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Importation des composants de routage
                                                                                 // Importing routing components

import './App.css'; // Importation du fichier CSS principal
                     // Importing the main CSS file

import './styles/tailwind.css'; // Importation du fichier CSS de Tailwind
                                 // Importing the Tailwind CSS file

import GameObjectsList from './components/game/GameObjectsList'; // Importation du composant GameObjectsList
                                                                 // Importing the GameObjectsList component

import Home from './components/home/Home'; // Importation du composant Home
                                             // Importing the Home component

import CurrentVersion from './components/game/CurrentVersion'; // Importation du composant CurrentVersion
                                                               // Importing the CurrentVersion component

import RaritySidebar from "./components/game/RaritySidebar"; // Importation du composant RaritySidebar
                                                              // Importing the RaritySidebar component

import Footer from './components/common/Footer/Footer'; // Importation du composant Footer
                                                         // Importing the Footer component

import DiscordFooter from "./components/common/Footer/DiscordFooter"; // Importation du composant DiscordFooter
                                                                        // Importing the DiscordFooter component

import ThemeToggle from "./components/common/ThemeToggle"; // Importation du composant ThemeToggle
                                                             // Importing the ThemeToggle component

import Register from "./components/auth/Register"; // Importation du composant Register
import Login from "./components/auth/Login"; // Importation du composant Login

const App = () => { // Définition du composant App
                     // Defining the App component
                     
  // ✅ États pour l'authentification
  // ✅ States for authentication
  const [token, setToken] = useState(localStorage.getItem("token") || ''); // État pour stocker le token d'authentification
                                                                          // State to store the authentication token

  const [username, setUsername] = useState(''); // État pour stocker le nom d'utilisateur
                                                // State to store the username

  // ✅ États pour le filtrage
  // ✅ States for filtering
  const [selectedRarity, setSelectedRarity] = useState(null); // État pour stocker la rareté sélectionnée
                                                              // State to store the selected rarity

  const [selectedCategory, setSelectedCategory] = useState(null); // État pour stocker la catégorie sélectionnée
                                                                  // State to store the selected category

  const [selectedTag, setSelectedTag] = useState(null); // État pour stocker le tag sélectionné
                                                       // State to store the selected tag

  // ✅ Fonction pour réinitialiser les filtres
  // ✅ Function to reset filters
  const resetFilters = () => {
    setSelectedRarity(null); // Réinitialisation de la rareté
                             // Reset rarity
    setSelectedCategory(null); // Réinitialisation de la catégorie
                               // Reset category
    setSelectedTag(null); // Réinitialisation du tag
                          // Reset tag
  };

  // ✅ Récupération du nom d'utilisateur si un token est présent
  // ✅ Fetch username if a token is available
  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            setUsername(data.username);
          }
        })
        .catch((err) => console.error("Erreur récupération utilisateur :", err));
    }
  }, [token]);

  return (
    <Router>
      <div className="app-container">
        
        

        <Routes>
          {/* 🏠 Page d'accueil */}
          {/* 🏠 Home Page */}
          <Route path="/" element={<Home />} />

          {/* ✅ Pages Register & Login */}
          {/* ✅ Register & Login Pages */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* 📌 Autres pages (Avec Sidebar & Footers) */}
          {/* 📌 Other Pages (With Sidebar & Footers) */}
          <Route
            path="/*"
            element={
              <div className="content-container">
                {/* ✅ Sidebar pour filtrer les objets */}
                {/* ✅ Sidebar for filtering items */}
                <RaritySidebar
                  selectedRarity={selectedRarity}
                  setSelectedRarity={setSelectedRarity}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                  resetFilters={resetFilters}
                />

                {/* ✅ Affichage de la liste des objets de jeu */}
                {/* ✅ Display game objects list */}
                <GameObjectsList
                  selectedRarity={selectedRarity}
                  selectedCategory={selectedCategory}
                  selectedTag={selectedTag}
                />

                {/* ✅ Contenu principal (Routes incluses) */}
                {/* ✅ Main Content (Routes included) */}
                <Routes>
                  <Route path="/current-version" element={<CurrentVersion />} />
                </Routes>
              </div>
            }
          />
        </Routes>

        {/* ✅ Footer (Uniquement sur les pages autres que l'accueil) */}
        {/* ✅ Footer (Only on non-home pages) */}
        <Routes>
          <Route path="/" element={null} /> {/* ❌ Pas de Footer sur la page d'accueil */}
                                              {/* ❌ No Footer on Home */}
          <Route path="/*" element={
            <div className="footer-container">
              <DiscordFooter />
              <Footer />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App; // Exportation du composant App
                      // Exporting the App component
