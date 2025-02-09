import React from 'react'; // Importation de React
                           // Importing React

import ReactDOM from 'react-dom'; // Importation de ReactDOM pour le rendu côté client
                                   // Importing ReactDOM for client-side rendering

import './App.css'; // Importation du fichier CSS principal
                     // Importing the main CSS file

import App from './App'; // Importation du composant principal App
                           // Importing the main App component

import reportWebVitals from './reportWebVitals'; // Importation de la fonction pour mesurer les performances
                                                  // Importing the function to measure performance metrics

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* Rendu du composant App */}
            {/* Rendering the App component */}
  </React.StrictMode>,
  document.getElementById('root') // Point de montage de l'application dans le DOM
                                   // Mounting point of the application in the DOM
);

reportWebVitals(); // Mesure et rapport des performances de l'application
                     // Measure and report web vitals