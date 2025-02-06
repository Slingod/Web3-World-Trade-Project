import React from 'react';
import '../styles/Footer.css'; // ✅ Correction : Utilisation du bon chemin

const Footer = () => {
  return (
    <div className="footer">
      <div className="discord-icons">
            
      <a href="https://discord.gg/RqVZZcEsgJ" target="_blank" rel="noopener noreferrer">
        <img src="para.png" alt="Discord Partner 1" />
        </a>

        <a href="https://discord.gg/bigtimewarriors" target="_blank" rel="noopener noreferrer">
        <img src="Big_Time_Warrior_Discordlogo.png" alt="Discord Partner 2" />
        </a>

        <a href="https://discord.gg/fRRAGastcS" target="_blank" rel="noopener noreferrer">
        <img src="/images/discord3.png" alt="Discord Partner 3" />
        </a>

        <a href="https://discord.com/invite/votre-lien-ici" target="_blank" rel="noopener noreferrer">
        <img src="/images/discord4.png" alt="Discord Partner 4" />
        </a>

        <a href="https://discord.com/invite/votre-lien-ici" target="_blank" rel="noopener noreferrer">
        <img src="/images/discord5.png" alt="Discord Partner 5" />
        </a>

        <a href="https://discord.com/invite/votre-lien-ici" target="_blank" rel="noopener noreferrer">
        <img src="/images/discord6.png" alt="Discord Partner 6" />
        </a>

      </div>
    </div>
  );
};

export default Footer;
