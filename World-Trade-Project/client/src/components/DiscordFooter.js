import React from 'react'; // Importation de React
                           // Importing React

import '../styles/DiscordFooter.css'; // Importation du fichier CSS pour le footer Discord
                                      // Importing the CSS file for the Discord footer

const DiscordFooter = () => { // Définition du composant DiscordFooter
                              // Defining the DiscordFooter component
  return (
    <div className="discord-footer">
      <h2>Join Discord Partners</h2> {/* Titre invitant à rejoindre les partenaires Discord */}
                                      {/* Title inviting to join Discord partners */}
    </div>
  );
};

export default DiscordFooter; // Exportation du composant DiscordFooter
                               // Exporting the DiscordFooter component
