import { useRef, useState } from "react"; // Importation des hooks useRef et useState de React
                                           // Importing useRef and useState hooks from React

import { FiLock } from "react-icons/fi"; // Importation de l'icône de verrouillage depuis react-icons
                                          // Importing lock icon from react-icons

import { motion } from "framer-motion"; // Importation de motion pour les animations
                                        // Importing motion for animations

import './AnimatedButton.css'; // Importation du fichier CSS pour le bouton animé
                                // Importing the CSS file for the animated button

// ✅ Définition du texte cible
// ✅ Definition of the target text
const TARGET_TEXT = "Login";

const CYCLES_PER_LETTER = 2; // Nombre de cycles par lettre pour l'animation
                             // Number of cycles per letter for the animation

const SHUFFLE_TIME = 50; // Durée de chaque cycle en millisecondes
                         // Duration of each cycle in milliseconds

const CHARS = "!@#$%^&*():{};|,.<>/?"; // Caractères utilisés pour l'animation
                                       // Characters used for the animation

// ✅ Composant du bouton animé
// ✅ Animated button component
const AnimatedButton = ({ text, onClick }) => {
  const intervalRef = useRef(null); // Référence pour l'intervalle d'animation
                                    // Reference for the animation interval

  const [displayText, setDisplayText] = useState(text); // État pour le texte du bouton
                                                        // State for the button text

  // ✅ Fonction pour animer le texte avec des caractères aléatoires
  // ✅ Function to animate the text with random characters
  const scramble = () => {
    let pos = 0; // Position actuelle dans le texte
                 // Current position in the text

    intervalRef.current = setInterval(() => {
      const scrambled = text.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char; // Retourne le caractère original si le cycle est terminé
                         // Returns the original character if the cycle is complete
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex]; // Retourne un caractère aléatoire
                                         // Returns a random character
        })
        .join("");

      setDisplayText(scrambled); // Met à jour le texte avec le texte mélangé
                                 // Updates the text with the scrambled text
      pos++;

      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble(); // Arrête l'animation lorsque tous les cycles sont terminés
                        // Stops the animation when all cycles are complete
      }
    }, SHUFFLE_TIME);
  };

  // ✅ Arrête l'animation et remet le texte d'origine
  // ✅ Stops the animation and resets the text to the original
  const stopScramble = () => {
    clearInterval(intervalRef.current); // Arrête l'intervalle d'animation
                                        // Stops the animation interval
    setDisplayText(text); // Remet le texte d'origine
                          // Resets the text to the original
  };

  return (
    <motion.button
      whileHover={{ scale: 1.025 }} // Agrandissement au survol
                                    // Enlargement on hover

      whileTap={{ scale: 0.975 }} // Réduction au clic
                                  // Reduction on click

      onMouseEnter={scramble} // Démarre l'animation au survol
                              // Starts the animation on hover

      onMouseLeave={stopScramble} // Arrête l'animation lorsque la souris quitte le bouton
                                  // Stops the animation when the mouse leaves the button

      onClick={onClick} // Gestionnaire d'événement pour le clic
                         // Click event handler

      className="animated-button" // Applique un style unique
                                   // Applies a unique style
    >
      <div className="button-content">
        <FiLock /> {/* Affichage de l'icône de verrouillage */}
                   {/* Displaying the lock icon */}

        <span>{displayText}</span>  {/* Affichage du texte animé */}
                                    {/* Displaying the animated text */}
      </div>
      <motion.span
        initial={{ y: "100%" }} // Position initiale de l'effet
                                // Initial position of the effect

        animate={{ y: "-100%" }} // Position finale de l'effet
                                // Final position of the effect
        transition={{
          repeat: Infinity, // Répétition infinie de l'animation
                            // Infinite repetition of the animation

          repeatType: "mirror", // Type de répétition
                                // Type of repetition

          duration: 1, // Durée de l'animation
                       // Duration of the animation

          ease: "linear", // Courbe d'animation
                          // Animation curve
        }}
        className="button-effect" // Classe pour l'effet d'animation
                                   // Class for the animation effect
      />
    </motion.button>
  );
};

export default AnimatedButton; // Exportation du composant AnimatedButton
                               // Exporting the AnimatedButton component
