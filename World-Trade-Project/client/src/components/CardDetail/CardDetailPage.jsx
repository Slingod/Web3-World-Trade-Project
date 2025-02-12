import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ThemeContext from "../context/ThemeContext";
import Sidebar from "../components/Sidebar";
import "./CardDetailPage.css";

const CardDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [card, setCard] = useState(null);
  const [resources, setResources] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Chargement de la carte avec ID:", id);
    fetchCardDetails();
  }, [id]);

  const fetchCardDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/gameObjects/${id}`);
      if (response.data) {
        setCard(response.data);
        setError(null);
      } else {
        setError("Objet non trouvé !");
        setCard(null);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails:", error);
      setError("Impossible de charger l'objet.");
      setCard(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/submitResources", {
        cardId: id,
        resources,
      });
      alert("Ressources envoyées avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'envoi des ressources:", error);
      alert("Erreur lors de l'envoi des ressources.");
    }
  };

  // 🔹 Redirection si l'objet est introuvable
  if (error) {
    setTimeout(() => navigate("/not-found"), 2000);
    return <div className="error-message">{error} - Redirection...</div>;
  }

  if (!card) {
    return <div className="loading-message">Chargement...</div>;
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

export default CardDetailPage;
