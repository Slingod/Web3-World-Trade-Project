import React, { useState, useEffect } from 'react'; // Importation de React et des hooks useState et useEffect
                                                    // Importing React and the useState and useEffect hooks

import { useNavigate } from 'react-router-dom'; // Importation du hook de navigation
                                               // Importing the navigation hook

import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP
                           // Importing the axios library for HTTP requests

import './Login.css'; // Importation du fichier CSS pour le composant Login
                      // Importing the CSS file for the Login component

import { FiLock } from "react-icons/fi"; // Importation de l'icône de verrouillage depuis react-icons
                                          // Importing lock icon from react-icons

const Login = ({ setUser }) => { // Définition du composant Login avec setUser pour gérer l'état global
                                 // Defining the Login component with setUser to manage global state
  const navigate = useNavigate(); // Hook pour la navigation après connexion
                                  // Hook for navigation after login

  const [email, setEmail] = useState(''); // État pour stocker l'email
                                          // State to store the email

  const [password, setPassword] = useState(''); // État pour stocker le mot de passe
                                                // State to store the password

  const [text, setText] = useState("Encrypt data"); // État pour le texte du bouton
                                                    // State for the button text

  const [error, setError] = useState(''); // État pour afficher un message d'erreur
                                          // State to display an error message

  const login = async () => { // Fonction pour gérer la connexion
                              // Function to handle login
    setError(''); // Réinitialise les erreurs avant une nouvelle tentative
                  // Reset errors before a new attempt

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, username } = response.data; // Récupération du token et du username
                                                 // Retrieving the token and username

      localStorage.setItem('token', token); // Stockage du token dans le localStorage
                                            // Storing the token in localStorage

      setUser({ username, token }); // Mise à jour de l'état utilisateur global
                                    // Updating global user state

      navigate('/'); // Redirection vers la page d'accueil après connexion
                     // Redirect to home page after login
    } catch (error) {
      setError('Email ou mot de passe invalide'); // Affichage d'un message d'erreur en cas d'échec
                                                  // Display an error message in case of failure
      console.error('Error logging in:', error); // Gestion des erreurs de connexion
                                                 // Handling login errors
    }
  };

  const scrambleText = () => { // Fonction pour animer le texte du bouton avec des caractères aléatoires
                               // Function to animate the button text with random characters
    const button = document.querySelector('.encrypt-login-button'); // Vérifiez que le bouton existe

    if (button) {
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
        if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
          clearInterval(interval); // Arrête l'animation lorsque tous les cycles sont terminés
                                   // Stops the animation when all cycles are complete
          setText(TARGET_TEXT); // Remet le texte d'origine
                                // Resets the text to the original
        } else {
          pos++; // Incrémentation de la largeur
                 // Incrementing the width
          setText(
            TARGET_TEXT.split("").map((char, index) => {
              if (pos / CYCLES_PER_LETTER > index) {
                return char; // Retourne le caractère original si le cycle est terminé
                             // Returns the original character if the cycle is complete
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)]; // Retourne un caractère aléatoire
                                                                    // Returns a random character
            }).join("")
          );
        }
      }, SHUFFLE_TIME);
    } else {
      console.error('Login button not found.'); // Log de l'erreur si le bouton n'est pas trouvé
                                               // Log error if the button is not found
    }
  };

  useEffect(() => {
    scrambleText(); // Assurez-vous que l'animation est déclenchée après le rendu initial
                    // Ensure the animation is triggered after the initial render
  }, []);

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

        {error && <p className="error-message">{error}</p>} {/* Affichage du message d'erreur si présent */}
                                                            {/* Display error message if present */}

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
