import React, { useEffect, useState } from 'react'; // Importation de React et des hooks useEffect et useState
                                                    // Importing React and the useEffect and useState hooks

import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP
                           // Importing the axios library for HTTP requests

import { useNavigate } from 'react-router-dom'; // Importation de useNavigate pour la navigation
                                               // Importing useNavigate for navigation

import './GameObjectsList.css'; // Importation du fichier CSS pour le composant
                               // Importing the CSS file for the component

const GameObjectsList = ({ selectedCategory, selectedRarity, selectedTag }) => {
  const [gameObjects, setGameObjects] = useState([]); // État pour stocker les objets de jeu
                                                       // State to store game objects

  const navigate = useNavigate(); // 🔥 Utiliser useNavigate au lieu de <Link>
                                  // 🔥 Use useNavigate instead of <Link>

  useEffect(() => {
    const fetchGameObjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gameObjects'); // Requête GET pour récupérer les objets de jeu
                                                                                       // GET request to fetch game objects

        setGameObjects(response.data); // Mettre à jour l'état avec les objets de jeu
                                      // Update state with game objects
      } catch (error) {
        console.error('Error fetching game objects:', error); // Log de l'erreur
                                                             // Log error
      }
    };
    fetchGameObjects(); // Appel de la fonction pour récupérer les objets de jeu
                        // Call the function to fetch game objects

  }, []); // Exécuter une seule fois au montage du composant
          // Run once when the component mounts

  const filteredObjects = gameObjects.filter((item) => {
    const categoryMatch = !selectedCategory || item.type === selectedCategory; // Vérifier si la catégorie correspond
                                                                              // Check if the category matches

    const rarityMatch = !selectedRarity || item.rarity === selectedRarity;    // Vérifier si la rareté correspond
                                                                              // Check if the rarity matches

    const tagMatch = !selectedTag || item.tags.includes(selectedTag);          // Vérifier si le tag correspond
                                                                              // Check if the tag matches

    return categoryMatch && rarityMatch && tagMatch; // Retourner vrai si tout correspond
                                                    // Return true if all match
  });

  return (
    <div className="game-objects-list">
      {filteredObjects.map((gameObject) => (
        <div
          key={gameObject.id}
          className="game-object-card"
          onClick={() => navigate(`/card/${gameObject.id}`)} // 🔥 Redirige sans <Link>
                                                             // 🔥 Redirect without <Link>

          style={{ cursor: "pointer" }} // 🔥 Pour montrer que c'est cliquable
                                        // 🔥 To show it's clickable
        >
          <img src={gameObject.img} alt={gameObject.name} className="game-object-image" />
          <h2>{gameObject.name}</h2>
          <p>Price: ${gameObject.purchasePrice}</p>
          <p>Rarity: {gameObject.rarity}</p>
          <p>Category: {gameObject.type}</p>
        </div>
      ))}
    </div>
  );
};

export default GameObjectsList; // Exportation du composant GameObjectsList
                               // Exporting the GameObjectsList component