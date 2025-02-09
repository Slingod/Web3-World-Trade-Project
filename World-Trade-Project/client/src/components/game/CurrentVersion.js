import React from 'react'; // Importation de React
                           // Importing React

import Sidebar from "../common/Sidebar/Sidebar"; // Importation du composant Sidebar
                                                 // Importing the Sidebar component

import GameObjectsList from './GameObjectsList'; // Importation du composant GameObjectsList
                                                // Importing the GameObjectsList component

import ThemeToggle from '../common/ThemeToggle'; // Importation du composant ThemeToggle
                                                  // Importing the ThemeToggle component

const CurrentVersion = () => { // Définition du composant CurrentVersion
                               // Defining the CurrentVersion component
  return (
    <div style={styles.container}>
      {/* Suppression du composant <Login />, maintenant géré dans GameObjectsList */}
      {/* Removal of the <Login /> component, now managed within GameObjectsList */}

      <div style={styles.content}>
        <Sidebar />  {/* Affichage de la Sidebar à gauche */}
                     {/* Displaying the Sidebar on the left */}
      </div>
    </div>
  );
};

// Styles pour l'affichage correct
// Styles for proper display
const styles = {
  container: {
    display: 'flex', // Utilisation de Flexbox pour la disposition
                     // Using Flexbox for layout

    flexDirection: 'column', // Disposition en colonne
                             // Column layout

    alignItems: 'center', // Alignement centré
                          // Centered alignment

    padding: '20px', // Espace intérieur
                     // Inner spacing

    minHeight: '100vh', // Hauteur minimale de 100% de la fenêtre
                        // Minimum height of 100% of the viewport
  },
  content: {
    display: 'flex', // Utilisation de Flexbox pour la disposition
                     // Using Flexbox for layout

    width: '100%', // Largeur complète
                   // Full width

    justifyContent: 'center', // Alignement centré horizontalement
                               // Centered horizontal alignment
  },
};

export default CurrentVersion; // Exportation du composant CurrentVersion
                                // Exporting the CurrentVersion component