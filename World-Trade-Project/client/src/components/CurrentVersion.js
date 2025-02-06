import React from 'react';
import Login from './Login';
import GameObjectsList from './GameObjectsList';
import Sidebar from "../components/Sidebar"; 

const CurrentVersion = () => {
  return (
    <div style={styles.container}>
      <Login /> {/* Affichage du système de login */}
      <div style={{ display: "flex", height: "100vh",  }}>
    <Sidebar /> {/* Sidebar à gauche */}
    <GameObjectsList /> {/* Liste des objets à droite */}
  </div>
      
     
    </div>
  );
};

// Styles en ligne
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    minHeight: '100vh', // Pleine hauteur
  },
};
export default CurrentVersion;