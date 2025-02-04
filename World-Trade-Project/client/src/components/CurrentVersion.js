import React from 'react';
import Login from './Login';
import GameObjectsList from './GameObjectsList';
import { Sidebar } from './Sidebar';

const CurrentVersion = () => {
  return (
    <div style={styles.container}>
      <div style={{ display: "flex", height: "100vh", backgroundColor: "#2c2f33" }}>
    <Sidebar /> {/* Sidebar à gauche */}
    <GameObjectsList /> {/* Liste des objets à droite */}
  </div>
      <Login /> {/* Affichage du système de login */}
      <GameObjectsList /> {/* Affichage de la liste des objets */}
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
    backgroundColor: '#1e1e1e', // Fond sombre
    color: '#fff', // Texte blanc
    minHeight: '100vh', // Pleine hauteur
  },
};




export default CurrentVersion;
