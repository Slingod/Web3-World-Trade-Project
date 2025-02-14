import React, { useState, useEffect, useContext } from "react"; // Importation de React et des hooks useState, useEffect, useContext
                                                              // Importing React and the useState, useEffect, useContext hooks

import { useParams, useNavigate } from "react-router-dom"; // Importation des hooks de React Router pour les paramètres et la navigation
                                                         // Importing React Router hooks for parameters and navigation

import axios from "axios"; // Importation de la bibliothèque axios pour les requêtes HTTP
                           // Importing the axios library for HTTP requests

import ThemeContext from "../context/ThemeContext"; // Importation du contexte de thème
                                                    // Importing the theme context

import Sidebar from "../components/Sidebar"; // Importation du composant Sidebar
                                            // Importing the Sidebar component

import "./CardDetailPage.css"; // Importation du fichier CSS pour le composant
                               // Importing the CSS file for the component

const CardDetailPage = () => {
  const { id } = useParams(); // Récupérer l'ID de la carte depuis les paramètres d'URL
                              // Retrieve the card ID from URL parameters

  const navigate = useNavigate(); // Fonction de navigation
                                  // Navigation function

  const { theme } = useContext(ThemeContext); // Utiliser le contexte de thème
                                              // Use the theme context

  const [card, setCard] = useState(null); // État pour stocker les détails de la carte
                                          // State to store card details

  const [resources, setResources] = useState(""); // État pour gérer les ressources
                                                // State to manage resources

  const [error, setError] = useState(null); // État pour gérer les erreurs
                                            // State to manage errors

  useEffect(() => {
    console.log("Chargement de la carte avec ID:", id); // Log pour le débogage
                                                         // Log for debugging
    fetchCardDetails(); // Récupérer les détails de la carte
                        // Fetch card details

  }, [id]); // Exécuter à chaque changement d'ID
            // Run on each ID change

  const fetchCardDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/gameObjects/${id}`); // Requête GET pour obtenir les détails de la carte
                                                                                        // GET request to fetch card details
      if (response.data) {
        setCard(response.data); // Mettre à jour l'état avec les détails de la carte
                                // Update state with card details

        setError(null); // Réinitialiser les erreurs
                        // Reset errors
      } else {
        setError("Objet non trouvé !"); // Définir une erreur si l'objet n'est pas trouvé
                                        // Set error if object is not found

        setCard(null); // Réinitialiser la carte
                       // Reset card
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails:", error); // Log de l'erreur
                                                                         // Log error

      setError("Impossible de charger l'objet."); // Définir une erreur générique
                                                  // Set generic error

      setCard(null); // Réinitialiser la carte
                     // Reset card
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
                        // Prevent default form behavior

    try {
      await axios.post("http://localhost:5000/api/submitResources", {
        cardId: id,
        resources,
      }); // Envoyer les ressources au serveur
                                                 // Send resources to the server
      alert("Ressources envoyées avec succès !"); // Alerte de succès

                                                   // Success alert
    } catch (error) {
      console.error("Erreur lors de l'envoi des ressources:", error); // Log de l'erreur
                                                                      // Log error

      alert("Erreur lors de l'envoi des ressources."); // Alerte d'erreur
                                                       // Error alert
    }
  };

  // 🔹 Redirection si l'objet est introuvable
  if (error) {
    setTimeout(() => navigate("/not-found"), 2000); // Rediriger après 2 secondes si une erreur est présente
                                                    // Redirect after 2 seconds if error is present

    return <div className="error-message">{error} - Redirection...</div>; // Afficher un message d'erreur
                                                                          // Display error message
  }

  if (!card) {
    return <div className="loading-message">Chargement...</div>; // Afficher un message de chargement
                                                                 // Display loading message
  }

  return (
    <div className={`card-detail-container ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
      {/* Sidebar ajoutée ici */}
      <Sidebar />

      <div className="card-content">
        <img src={card.img} alt={card.name} className="card-image" />
        <h1>{card.name}</h1>
        <p>Prix: ${card.purchasePrice}</p>
        <p>Rareté: {card.rarity}</p>
        <p>Catégorie: {card.type}</p>

        {/* Rendre la carte cliquable */}
        <a href={`/market/${card.id}`} className="buy-link">Acheter sur le Marché</a>

        <form onSubmit={handleSubmit} className="resource-form">
          <label>
            Ressources:
            <textarea
              value={resources}
              onChange={(e) => setResources(e.target.value)}
              className="resource-input"
            />
          </label>
          <button type="submit" className="submit-button">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default CardDetailPage; // Exportation du composant CardDetailPage
                               // Exporting the CardDetailPage component