import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Create an axios instance to make requests to the backend
const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
});

const GameObjectsList = () => {
  const [gameObjects, setGameObjects] = useState([]);
  const [visibleObjects, setVisibleObjects] = useState(20); // nomber of objects to show

  useEffect(() => {
    const fetchGameObjects = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/gameObjects');
        console.log('Number of game objects fetched:', response.data.length); // verify the number of game objects fetched
        setGameObjects(response.data);
      } catch (error) {
        console.error('Error fetching game objects:', error);
      }
    };

    fetchGameObjects();
  }, []);

  // define the colors for the rarity borders
  const rarityBorders = {
    'Common': '##a4b0be;',       // Gray
    'Uncommon': '#1cbf6a',      // Green
    'Rare': '#159cfd',          // Blue
    'Epic': '#a369ff',          // Purple
    'Legendary': '#e67e22',     // Orange
    'Mythic': '#ffd32a',        // Yellow
    'Exalted': '#ef5777',       // Pink ~ Red
    'Exotic': '#be2edd',        // Indigo
    'Transcendent': '#ff3838',  // Red
    'Unique': '#f368e0'         // Pink
  };

  const handleShowMore = () => {
    setVisibleObjects(prevVisibleObjects => prevVisibleObjects + 20); // Add 20 more objects
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Game Objects</h1>
      
      <div style={styles.grid}>
        {gameObjects.slice(0, visibleObjects).map((gameObject) => (
          <div key={gameObject.id} style={{
            ...styles.card,
            border: `3px solid ${rarityBorders[gameObject.rarity] || '#FFFFFF'}` // Border color based on rarity
          }}>
            {gameObject.img && (
              gameObject.img.endsWith('.webm') ? (
                <video src={gameObject.img} autoPlay loop muted style={styles.image} />
              ) : (
                <img src={gameObject.img} alt={gameObject.name} style={styles.image} />
              )
            )}
            <h2 style={styles.name}>{gameObject.name}</h2>
            <p>{gameObject.type}</p>
            {gameObject.rarity !== '-' && <p>{gameObject.rarity}</p>}
            {gameObject.stackSize !== 0 && <p>{gameObject.stackSize}</p>}
            <p>${gameObject.purchasePrice}</p>
          </div>
        ))}
      </div>

      {/* Bouton Show More on center */}
      {visibleObjects < gameObjects.length && (
        <div style={styles.showMoreContainer}>
          <button onClick={handleShowMore} style={styles.showMoreButton}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

// Styles in line
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#2c2f33', // Dark background
    color: '#ffffff',
    borderRadius: '10px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#23272a',
    padding: '15px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
  name: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  showMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  showMoreButton: {
    backgroundColor: '#ffcc00',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'black',
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background 0.3s ease',
  },
};

export default GameObjectsList;
