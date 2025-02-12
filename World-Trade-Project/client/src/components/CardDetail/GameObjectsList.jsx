import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GameObjectsList.css';

const GameObjectsList = ({ selectedCategory, selectedRarity, selectedTag }) => {
  const [gameObjects, setGameObjects] = useState([]);
  const navigate = useNavigate(); // 🔥 Utiliser useNavigate au lieu de <Link>

  useEffect(() => {
    const fetchGameObjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gameObjects');
        setGameObjects(response.data);
      } catch (error) {
        console.error('Error fetching game objects:', error);
      }
    };
    fetchGameObjects();
  }, []);

  const filteredObjects = gameObjects.filter((item) => {
    const categoryMatch = !selectedCategory || item.type === selectedCategory;
    const rarityMatch = !selectedRarity || item.rarity === selectedRarity;
    const tagMatch = !selectedTag || item.tags.includes(selectedTag);
    return categoryMatch && rarityMatch && tagMatch;
  });

  return (
    <div className="game-objects-list">
      {filteredObjects.map((gameObject) => (
        <div
          key={gameObject.id}
          className="game-object-card"
          onClick={() => navigate(`/card/${gameObject.id}`)} // 🔥 Redirige sans <Link>
          style={{ cursor: "pointer" }} // 🔥 Pour montrer que c'est cliquable
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

export default GameObjectsList;
