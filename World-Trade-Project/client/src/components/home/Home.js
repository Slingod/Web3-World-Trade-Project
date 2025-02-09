import React, { useEffect } from 'react'; // Importation de React et du hook useEffect
                                           // Importing React and the useEffect hook

import ShiftingCountdown from "./ShiftingCountdown";   // Importation du composant ShiftingCountdown
                                                      // Importing the ShiftingCountdown component

const Home = () => { // Définition du composant Home
                     // Defining the Home component
  useEffect(() => {
    const progressBar = document.getElementById('progressBar'); // Sélection de la barre de progression
                                                               // Selecting the progress bar

    const percentageText = document.querySelector('.percentage'); // Sélection du texte de pourcentage
                                                                 // Selecting the percentage text

    let width = 0; // Largeur initiale de la barre de progression
                   // Initial width of the progress bar

    const interval = setInterval(() => {
      if (width >= 100) {
        width = 0; // Réinitialisation de la largeur à 0 lorsqu'elle atteint 100%
                   // Reset width to 0 when it reaches 100%
      }
      width++;
      progressBar.style.width = width + '%'; // Mise à jour de la largeur de la barre de progression
                                             // Updating the width of the progress bar

      percentageText.textContent = width + '%'; // Mise à jour du texte de pourcentage
                                                // Updating the percentage text
    }, 200);

    return () => clearInterval(interval); // Nettoyage de l'intervalle lorsque le composant est démonté
                                          // Cleaning up the interval when the component unmounts
  }, []);

  return (
    <div className="home-container">
      <h1 className="main-title">World Trade Project</h1>  {/* Titre principal */}
                                                           {/* Main title */}
                                                           
      <h2>Work in Progress</h2> {/* Sous-titre indiquant que le projet est en cours */}
                                {/* Subtitle indicating the project is in progress */}

      {/* Ajout du composant de compte à rebours */}
      {/* Adding the countdown component */}
      <ShiftingCountdown />

      <div className="progress-container">
        <div className="progress-bar" id="progressBar"></div>  {/* Barre de progression */}
                                                               {/* Progress bar */}
      </div>
      <div className="percentage">0%</div> {/* Texte de pourcentage */}
                                           {/* Percentage text */}

      <div className="center-link">
        <a href="/current-version" className="link">Current Version</a> {/* Lien vers la version actuelle */}
                                                                        {/* Link to the current version */}
      </div>
    </div>
  );
};

export default Home; // Exportation du composant Home
                      // Exporting the Home component