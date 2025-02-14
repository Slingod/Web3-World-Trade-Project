import React, { useState } from 'react'; // Importation de React et du hook useState
                                          // Importing React and the useState hook

import axios from 'axios'; // Importation de la bibliothèque axios pour les requêtes HTTP
                           // Importing the axios library for HTTP requests

import './Register.css'; // Importation du fichier CSS pour le composant Register
                         // Importing the CSS file for the Register component

import AnimatedButton from './AnimatedButton'; // Importation du composant AnimatedButton
                                              // Importing the AnimatedButton component

const Register = () => {
  const [email, setEmail] = useState(''); // État pour stocker l'email
                                          // State to store the email

  const [password, setPassword] = useState(''); // État pour stocker le mot de passe
                                                // State to store the password

  const [pseudo, setPseudo] = useState(''); // État pour stocker le pseudo
                                            // State to store the username

  const [error, setError] = useState(''); // État pour afficher un message d'erreur
                                          // State to display an error message

  const register = async () => { // Fonction pour gérer l'inscription
                                  // Function to handle registration
    setError(''); // Réinitialise les erreurs avant une nouvelle tentative
                  // Reset errors before a new attempt

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        pseudo
      });

      if (response.data) {
        alert("Inscription réussie !"); // Alerte de succès
                                        // Success alert
      }
    } catch (error) {
      setError('Erreur lors de l\'inscription'); // Affichage d'un message d'erreur en cas d'échec
                                                 // Display an error message in case of failure
      console.error('Error registering:', error); // Gestion des erreurs d'inscription
                                                   // Handling registration errors
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2> {/* Titre de la page d'inscription */}
                            {/* Title of the registration page */}
      <form onSubmit={(e) => { e.preventDefault(); register(); }} className="register-form">
        <div className="register-field">
          <label htmlFor="pseudo">Pseudo:</label>
          <input
            type="text"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="register-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="register-field">
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

        <AnimatedButton text="Register" onClick={register} /> {/* Utilisation du bouton animé */}
                                                                {/* Using the animated button */}
      </form>
    </div>
  );
};

export default Register; // Exportation du composant Register
                         // Exporting the Register component
