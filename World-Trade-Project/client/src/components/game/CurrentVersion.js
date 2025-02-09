import React from 'react';
import Sidebar from "../common/Sidebar/Sidebar"; 
import GameObjectsList from './GameObjectsList';
import ThemeToggle from '../common/ThemeToggle'; // ✅ Importation de ThemeToggle

const CurrentVersion = () => {
  return (
    <div style={styles.container}>
      
      <ThemeToggle /> {/* ✅ Ajout du ThemeToggle en haut de l'application */}
      {/* ✅ Suppression de <Login />, maintenant géré dans GameObjectsList */}
      <div style={styles.content}>
        <Sidebar /> {/* ✅ Sidebar à gauche */}
      </div>
    </div>
  );
};

// ✅ Styles pour l'affichage correct
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    minHeight: '100vh',
  },
  content: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
};

export default CurrentVersion;
