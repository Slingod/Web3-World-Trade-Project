import React, { useState } from 'react'; // Importing React and the useState hook
                                        // Importation de React et du hook useState

import axios from 'axios'; // Importing the axios library for HTTP requests
                           // Importation de la bibliothèque axios pour les requêtes HTTP

import './Register.css'; // Importing the CSS file for the Register component
                         // Importation du fichier CSS pour le composant Register

import AnimatedButton from './AnimatedButton'; // Importing the AnimatedButton component
                                              // Importation du composant AnimatedButton

const Register = () => {
  const [email, setEmail] = useState(''); // State to store the email
                                          // État pour stocker l'email

  const [password, setPassword] = useState(''); // State to store the password
                                                // État pour stocker le mot de passe

  const [username, setUsername] = useState(''); // State to store the username
                                                // État pour stocker le nom d'utilisateur

  const [error, setError] = useState(''); // State to display an error message
                                          // État pour afficher un message d'erreur

  const register = async () => { // Function to handle registration
                                 // Fonction pour gérer l'inscription
    setError(''); // Reset errors before a new attempt
                  // Réinitialise les erreurs avant une nouvelle tentative

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        username
      });

      if (response.data) {
        alert("Inscription réussie !"); // Success alert
                                        // Alerte de succès
      }
    } catch (error) {
      setError('Erreur lors de l\'inscription'); // Display an error message in case of failure
                                                // Affichage d'un message d'erreur en cas d'échec
      console.error('Error registering:', error); // Handling registration errors
                                                  // Gestion des erreurs d'inscription
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2> {/* Title of the registration page */}
                           {/* Titre de la page d'inscription */}
      <form onSubmit={(e) => { e.preventDefault(); register(); }} className="register-form">
        <div className="register-field">
          <label htmlFor="username">Username:</label> {/* Changed Pseudo to Username */}
                                                      {/* Changement de Pseudo à Username */}
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        {error && <p className="error-message">{error}</p>} {/* Display error message if present */}
                                                            {/* Affichage du message d'erreur si présent */}

        <AnimatedButton text="Register" onClick={register} /> {/* Using the animated button */}
                                                              {/* Utilisation du bouton animé */}
      </form>
    </div>
  );
};

export default Register; // Exporting the Register component
                         // Exportation du composant Register
