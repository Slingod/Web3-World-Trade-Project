import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CardDetailPage.css';

const CardDetailPage = () => {
  const { id } = useParams(); // Récupérer l'ID de la carte depuis l'URL
  const [card, setCard] = useState(null);
  const [resources, setResources] = useState('');

  const fetchCardDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/gameObjects/${id}`);
      setCard(response.data);
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/submitResources', {
        cardId: id,
        resources,
      });
      alert('Resources submitted successfully');
    } catch (error) {
      console.error('Error submitting resources:', error);
    }
  };

  useEffect(() => {
    fetchCardDetails();
  }, [id]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-detail-container">
      <img src={card.img} alt={card.name} className="card-image" />
      <h1>{card.name}</h1>
      <p>Price: ${card.purchasePrice}</p>
      <p>Rarity: {card.rarity}</p>
      <p>Category: {card.type}</p>
      <a href={`/market/${card.id}`} className="buy-link">Buy on Market</a>
      <form onSubmit={handleSubmit} className="resource-form">
        <label>
          Resources:
          <textarea
            value={resources}
            onChange={(e) => setResources(e.target.value)}
            className="resource-input"
          />
        </label>
        <button type="submit" className="submit-button">Submit Resources</button>
      </form>
    </div>
  );
};

export default CardDetailPage;
