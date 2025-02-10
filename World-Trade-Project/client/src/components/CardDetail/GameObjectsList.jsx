import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GameObjectsList.css';

const GameObjectsList = ({ selectedCategory, selectedRarity, selectedTag }) => {
  const [gameObjects, setGameObjects] = useState([]);

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
        <Link key={gameObject.id} to={`/card/${gameObject.id}`} className="game-object-card">
          <img src={gameObject.img} alt={gameObject.name} className="game-object-image" />
          <h2>{gameObject.name}</h2>
          <p>Price: ${gameObject.purchasePrice}</p>
          <p>Rarity: {gameObject.rarity}</p>
          <p>Category: {gameObject.type}</p>
        </Link>
      ))}
    </div>
  );
};

export default GameObjectsList;
