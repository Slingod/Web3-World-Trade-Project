import React, { useState } from 'react'; // Importation de React et du hook useState
                                          // Importing React and the useState hook

import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP
                           // Importing the axios library for HTTP requests

import '../styles/Login.css'; // Importation du fichier CSS pour le composant Login
                               // Importing the CSS file for the Login component

import { FiLock } from "react-icons/fi"; // Importation de l'icône de verrouillage depuis react-icons
                                          // Importing lock icon from react-icons

const Login = () => { // Définition du composant Login
                      // Defining the Login component
  const [email, setEmail] = useState(''); // État pour stocker l'email
                                          // State to store the email

  const [password, setPassword] = useState(''); // État pour stocker le mot de passe
                                                // State to store the password

  const [token, setToken] = useState(''); // État pour stocker le token d'authentification
                                          // State to store the authentication token

  const [text, setText] = useState("Encrypt data"); // État pour le texte du bouton
                                                    // State for the button text

  const login = async () => { // Fonction pour gérer la connexion
                              // Function to handle login
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      setToken(response.data.token); // Stockage du token reçu
                                      // Storing the received token
      console.log('Login response:', response.data);
    } catch (error) {
      console.error('Error logging in:', error); // Gestion des erreurs de connexion
                                                 // Handling login errors
    }
  };

  const scrambleText = () => { // Fonction pour animer le texte du bouton avec des caractères aléatoires
                               // Function to animate the button text with random characters

    const CHARS = "!@#$%^&*():{};|,.<>/?"; // Caractères utilisés pour l'animation
                                            // Characters used for the animation

    let pos = 0; // Position actuelle dans le texte
                  // Current position in the text

    const CYCLES_PER_LETTER = 2; // Nombre de cycles par lettre pour l'animation
                                  // Number of cycles per letter for the animation

    const SHUFFLE_TIME = 50; // Durée de chaque cycle en millisecondes
                             // Duration of each cycle in milliseconds

    const TARGET_TEXT = "Login"; // Texte cible pour l'animation
                                 // Target text for the animation

    const interval = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char; // Retourne le caractère original si le cycle est terminé
                         // Returns the original character if the cycle is complete
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)]; // Retourne un caractère aléatoire
                                                                  // Returns a random character
        })
        .join("");

      setText(scrambled); // Met à jour le texte avec le texte mélangé
                          // Updates the text with the scrambled text
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        clearInterval(interval); // Arrête l'animation lorsque tous les cycles sont terminés
                                  // Stops the animation when all cycles are complete

        setText(TARGET_TEXT); // Remet le texte d'origine
                               // Resets the text to the original
      }
    }, SHUFFLE_TIME);
  };

  return (
    <div className="login-container">
      <form onSubmit={(e) => { e.preventDefault(); login(); }} className="login-form">
        <div className="login-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="login-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="encrypt-login-button"
          onMouseEnter={scrambleText} // Déclenche l'animation au survol
                                      // Triggers the animation on hover
        >
          <FiLock /> <span>{text}</span>  {/* Affichage de l'icône et du texte animé */}
                                          {/* Displaying the icon and the animated text */}
        </button>
      </form>
    </div>
  );
};

export default Login; // Exportation du composant Login
                       // Exporting the Login component