import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GameObjectsList.css';

// Créer une instance d'Axios avec l'en-tête User-Agent
const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
});

const GameObjectsList = () => {
  const [gameObjects, setGameObjects] = useState([]);
  const [deleteId, setDeleteId] = useState('');
  const [newObject, setNewObject] = useState({
    name: '',
    img: '',
    type: '',
    rarity: '',
    stackSize: 0,
    purchasePrice: 0
  });
  const [visibleObjects, setVisibleObjects] = useState(20); // Nombre d'objets visibles initialement

  useEffect(() => {
    const fetchGameObjects = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/gameObjects');
        console.log('Number of game objects fetched:', response.data.length); // Ajoutez cette ligne pour vérifier le nombre d'objets
        setGameObjects(response.data);
      } catch (error) {
        console.error('Error fetching game objects:', error);
      }
    };

    fetchGameObjects();
  }, []);

  const handleChange = (e) => {
    setNewObject({
      ...newObject,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('http://localhost:5000/api/gameObjects', newObject);
      setGameObjects([...gameObjects, response.data]);
      setNewObject({
        name: '',
        img: '',
        type: '',
        rarity: '',
        stackSize: 0,
        purchasePrice: 0
      });
    } catch (error) {
      console.error('Error creating game object:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`http://localhost:5000/api/gameObjects/${deleteId}`);
      alert('Object deleted successfully');
      setGameObjects(gameObjects.filter(obj => obj.id !== parseInt(deleteId)));
      setDeleteId('');
    } catch (error) {
      console.error('Error deleting object:', error);
      alert('Error deleting object');
    }
  };

  const getRarityClass = (rarity) => {
    switch (rarity) {
      case 'Common':
        return 'rarity-common';
      case 'Uncommon':
        return 'rarity-uncommon';
      case 'Rare':
        return 'rarity-rare';
      case 'Epic':
        return 'rarity-epic';
      case 'Legendary':
        return 'rarity-legendary';
      case 'Mythic':
        return 'rarity-mythic';
      case 'Exalted':
        return 'rarity-exalted';
      case 'Exotic':
        return 'rarity-exotic';
      case 'Transcendent':
        return 'rarity-transcendent';
      case 'Unique':
        return 'rarity-unique';
      default:
        return '';
    }
  };

  const handleShowMore = () => {
    setVisibleObjects(prevVisibleObjects => prevVisibleObjects + 20); // Afficher 20 objets supplémentaires
  };

  return (
    <div className="game-objects-list">
      <h1>Game Objects</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={newObject.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="img" value={newObject.img} onChange={handleChange} placeholder="Image URL" />
        <input type="text" name="type" value={newObject.type} onChange={handleChange} placeholder="Type" />
        <input type="text" name="rarity" value={newObject.rarity} onChange={handleChange} placeholder="Rarity" />
        <input type="number" name="stackSize" value={newObject.stackSize} onChange={handleChange} placeholder="Stack Size" />
        <input type="number" name="purchasePrice" value={newObject.purchasePrice} onChange={handleChange} placeholder="Purchase Price" />
        <button type="submit">Add Game Object</button>
      </form>
      <div className="game-objects-grid">
        {gameObjects.slice(0, visibleObjects).map((gameObject) => (
          <div key={gameObject.id} className={`game-object-card ${getRarityClass(gameObject.rarity)}`}>
            {gameObject.img && (
              gameObject.img.endsWith('.webm') ? (
                <video src={gameObject.img} autoPlay loop muted />
              ) : (
                <img src={gameObject.img} alt={gameObject.name} />
              )
            )}
            <h2 className="game-object-name">{gameObject.name}</h2>
            <p>{gameObject.type}</p>
            {gameObject.rarity !== '-' && <p>{gameObject.rarity}</p>}
            {gameObject.stackSize !== 0 && <p>{gameObject.stackSize}</p>}
            <p>${gameObject.purchasePrice}</p>
          </div>
        ))}
      </div>
      {visibleObjects < gameObjects.length && (
        <button onClick={handleShowMore} style={{ marginTop: '20px' }}>
          Show More
        </button>
      )}
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter Object ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
          Delete Object
        </button>
      </div>
    </div>
  );
};

export default GameObjectsList;
