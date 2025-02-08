import React from 'react';
import Sidebar from "../components/Sidebar"; 
import GameObjectsList from './GameObjectsList'; // ✅ Contient maintenant Login

const CurrentVersion = () => {
  return (
    <div style={styles.container}>
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
