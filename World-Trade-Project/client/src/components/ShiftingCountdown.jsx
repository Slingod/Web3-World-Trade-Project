// src/components/Countdown/Countdownhome.jsx
import React, { useEffect, useRef, useState } from 'react'; // Importation de React et des hooks useEffect, useRef et useState
                                                           // Importing React and the useEffect, useRef, and useState hooks

import { useAnimate } from 'framer-motion'; // Importation de useAnimate pour les animations
                                             // Importing useAnimate for animations

import './Countdownhome.css'; // Importation du fichier CSS pour le composant
                               // Importing the CSS file for the component

const COUNTDOWN_FROM = '2025-03-01'; // Date cible pour le compte à rebours
                                     // Target date for the countdown

const SECOND = 1000; // Nombre de millisecondes dans une seconde
                     // Number of milliseconds in a second

const MINUTE = SECOND * 60; // Nombre de millisecondes dans une minute
                            // Number of milliseconds in a minute

const HOUR = MINUTE * 60; // Nombre de millisecondes dans une heure
                          // Number of milliseconds in an hour

const DAY = HOUR * 24; // Nombre de millisecondes dans un jour
                       // Number of milliseconds in a day

const ShiftingCountdown = () => { // Définition du composant ShiftingCountdown
                                  // Defining the ShiftingCountdown component
  return (
    <div className="countdown-container">
      <div className="countdown-items">
        <CountdownItem unit="Day" text="days" /> {/* Composant pour les jours */}
                                                  {/* Component for days */}

        <CountdownItem unit="Hour" text="hours" /> {/* Composant pour les heures */}
                                                    {/* Component for hours */}

        <CountdownItem unit="Minute" text="minutes" /> {/* Composant pour les minutes */}
                                                        {/* Component for minutes */}

        <CountdownItem unit="Second" text="seconds" /> {/* Composant pour les secondes */}
                                                         {/* Component for seconds */}
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text }) => { // Définition du composant CountdownItem
                                             // Defining the CountdownItem component

  const { ref, time } = useTimer(unit); // Utilisation du hook useTimer pour gérer le temps
                                         // Using the useTimer hook to manage time

  return (
    <div className="countdown-item">
      <div className="countdown-value">
        <span ref={ref} className="countdown-time">
          {time} {/* Affichage du temps */}
                 {/* Displaying the time */}
        </span>
      </div>
      <span className="countdown-text">{text}</span>   {/* Affichage du texte de l'unité */}
                                                       {/* Displaying the unit text */}
    </div>
  );
};

export default ShiftingCountdown; // Exportation du composant ShiftingCountdown
                                   // Exporting the ShiftingCountdown component

const useTimer = (unit) => { // Définition du hook useTimer pour gérer le temps
                             // Defining the useTimer hook to manage time

  const [ref, animate] = useAnimate(); // Utilisation de useAnimate pour les animations
                                       // Using useAnimate for animations

  const intervalRef = useRef(null); // Référence pour l'intervalle de temps
                                     // Reference for the time interval

  const timeRef = useRef(0); // Référence pour stocker le temps actuel
                             // Reference to store the current time

  const [time, setTime] = useState(0); // État pour stocker le temps
                                       // State to store the time

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000); // Déclenchement du compte à rebours toutes les secondes
                                                               // Triggering the countdown every second

    return () => clearInterval(intervalRef.current || undefined); // Nettoyage de l'intervalle lorsque le composant est démonté
                                                                   // Cleaning up the interval when the component unmounts
  }, []);

  const handleCountdown = async () => { // Fonction pour gérer le compte à rebours
                                        // Function to handle the countdown

    const end = new Date(COUNTDOWN_FROM); // Date cible
                                          // Target date

    const now = new Date(); // Date actuelle
                            // Current date

    const distance = +end - +now; // Calcul de la distance entre les deux dates
                                  // Calculating the distance between the two dates

    let newTime = 0; // Initialisation du nouveau temps
                     // Initializing the new time

    if (unit === 'Day') {
      newTime = Math.floor(distance / DAY); // Calcul du nombre de jours
                                             // Calculating the number of days
    } else if (unit === 'Hour') {
      newTime = Math.floor((distance % DAY) / HOUR); // Calcul du nombre d'heures
                                                     // Calculating the number of hours
    } else if (unit === 'Minute') {
      newTime = Math.floor((distance % HOUR) / MINUTE); // Calcul du nombre de minutes
                                                         // Calculating the number of minutes
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND); // Calcul du nombre de secondes
                                                           // Calculating the number of seconds
    }

    if (newTime !== timeRef.current) {
      // Animation de sortie
      // Exit animation
      await animate(
        ref.current,
        { y: ['0%', '-50%'], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime; // Mise à jour du temps actuel
                                 // Updating the current time

      setTime(newTime); // Mise à jour de l'état du temps
                        // Updating the time state

      // Animation d'entrée
      // Enter animation
      await animate(
        ref.current,
        { y: ['50%', '0%'], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time }; // Retourne la référence et le temps
                        // Returns the reference and the time
};