import React from 'react';
import Login from './Login'; // Assurez-vous que ce composant existe
import GameObjectsList from './GameObjectsList'; // Assurez-vous que ce composant existe
import '../styles/Login.css'; // Importez les styles pour le login

const CurrentVersion = () => {
  return (
    <div>
      <Login /> {/* Affichez le système de login */}
      <GameObjectsList /> {/* Affichez la liste des objets */}
    </div>
  );
};

export default CurrentVersion;