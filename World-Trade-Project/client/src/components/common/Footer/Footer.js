import React from 'react';          // Importation de la bibliothèque React
                                   // Importing the React library



import './Footer.css';           // Importation du fichier CSS pour le footer
                                // Importing the CSS file for the footer

const Footer = () => {         // Définition d'un composant fonctionnel React
  return (                    // Defining a React functional component
    <div className="footer">                {/* Conteneur principal du footer */}
                                            {/* Main container for the footer */}
      
      <div className="discord-icons">       {/* Main container for the footer */}
                                            {/*Container for Discord icons */}
            
      <a href="https://discord.gg/RqVZZcEsgJ" target="_blank" rel="noopener noreferrer">
        <img src="para.png" alt="Discord Partner 1" />      {/* Lien vers le serveur Discord avec une image */}
        </a>                                                {/* Link to Discord server with an image */}

        <a href="https://discord.gg/bigtimewarriors" target="_blank" rel="noopener noreferrer">
        <img src="Big_Time_Warrior_Discordlogo.png" alt="Discord Partner 2" />
        </a>

        <a href="https://discord.gg/fRRAGastcS" target="_blank" rel="noopener noreferrer">
        <img src="CHRDAO.jpg" alt="Discord Partner 3" />
        </a>

        <a href="https://discord.gg/XZhXtfaTrs" target="_blank" rel="noopener noreferrer">
        <img src="Logo THP.png" alt="Discord Partner 4" />
        </a>

        <a href="https://discord.gg/QBN2d5cx2E" target="_blank" rel="noopener noreferrer">
        <img src="OP.webp" alt="Discord Partner 5" />
        </a>

        <a href="https://discord.com/invite/votre-lien-ici" target="_blank" rel="noopener noreferrer">
        <img src="/images/discord6.png" alt="Discord Partner 6" />
        </a>

      </div>
    </div>
  );
};

export default Footer;     // Exportation du composant Footer pour une utilisation dans d'autres fichiers
                          // Exporting the Footer component for use in other files
