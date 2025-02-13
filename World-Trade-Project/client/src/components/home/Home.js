import React, { useState, useEffect } from 'react'; // Importation de React et des hooks useState et useEffect
                                                    // Importing React and the useState and useEffect hooks

import { Link } from 'react-router-dom'; // Importation du composant Link pour la navigation
                                         // Importing the Link component for navigation

import ShiftingCountdown from "./ShiftingCountdown"; // Importation du composant ShiftingCountdown
                                                     // Importing the ShiftingCountdown component

const Home = () => { // Définition du composant Home
                     // Defining the Home component

  const [user, setUser] = useState(null); // État pour stocker les informations de l'utilisateur
                                          // State to store user information

  useEffect(() => { 
    // ✅ Récupération des informations utilisateur
    // ✅ Fetching user information
    const fetchUser = async () => { 
      const token = localStorage.getItem("token"); // Récupération du token stocké localement
                                                   // Retrieving the locally stored token

      if (token) { 
        try { 
          const response = await fetch("http://localhost:5000/api/auth/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête de la requête
                                                // Sending the token in the request header
            },
          });

          if (response.ok) { 
            const data = await response.json(); // Conversion de la réponse en JSON
                                                // Converting the response to JSON
            setUser(data.user); // Mise à jour de l'état avec les données de l'utilisateur
                                // Updating the state with user data
          } else { 
            setUser(null); // Réinitialisation de l'état en cas d'erreur
                           // Resetting the state in case of an error
          }
        } catch (error) { 
          console.error("Erreur lors de la récupération de l'utilisateur :", error); 
          // Logging de l'erreur si la requête échoue
          // Logging the error if the request fails
        }
      }
    };

    fetchUser(); // Appel de la fonction fetchUser
                 // Calling the fetchUser function
  }, []);

  const handleLogout = () => { // Fonction pour gérer la déconnexion
                               // Function to handle logout
    localStorage.removeItem("token"); // Suppression du token du stockage local
                                      // Removing the token from local storage
    setUser(null); // Réinitialisation de l'état utilisateur
                   // Resetting the user state
  };

  const handleDeleteAccount = async () => { // Fonction pour gérer la suppression du compte
                                            // Function to handle account deletion
    const token = localStorage.getItem("token"); // Récupération du token stocké localement
                                                 // Retrieving the locally stored token
    if (!token) return; // Vérification si aucun token n'est présent
                        // Checking if no token is present

    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) { 
      // Affichage d'une boîte de confirmation
      // Displaying a confirmation box
      try { 
        const response = await fetch("http://localhost:5000/api/auth/delete", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête
                                              // Sending the token in the header
          },
        });

        if (response.ok) { 
          localStorage.removeItem("token"); // Suppression du token après suppression du compte
                                            // Removing the token after account deletion
          setUser(null); // Réinitialisation de l'état utilisateur
                         // Resetting the user state
          alert("Compte supprimé avec succès !"); // Notification de succès
                                                   // Success notification
        } else { 
          alert("Erreur lors de la suppression du compte."); // Notification d'erreur
                                                             // Error notification
        }
      } catch (error) { 
        console.error("Erreur lors de la suppression du compte :", error); 
        // Logging de l'erreur en cas d'échec
        // Logging the error in case of failure
      }
    }
  };

  // ✅ Effet pour gérer la barre de progression
  // ✅ Effect to handle the progress bar
  useEffect(() => { 
    const progressBar = document.getElementById('progressBar'); // Sélection de la barre de progression
                                                                // Selecting the progress bar

    const percentageText = document.querySelector('.percentage'); // Sélection du texte de pourcentage
                                                                  // Selecting the percentage text

    let width = 0; // Définition de la largeur initiale
                   // Defining the initial width

    const interval = setInterval(() => { 
      if (width >= 100) { 
        width = 0; // Réinitialisation à 0 lorsqu'on atteint 100%
                   // Resetting to 0 when reaching 100%
      }
      width++; // Incrémentation de la largeur
               // Incrementing the width
      progressBar.style.width = width + '%'; // Mise à jour de la barre de progression
                                             // Updating the progress bar

      percentageText.textContent = width + '%'; // Mise à jour du texte affichant le pourcentage
                                                // Updating the text displaying the percentage
    }, 200); // Fréquence de mise à jour toutes les 200ms
             // Update frequency every 200ms

    return () => clearInterval(interval); // Nettoyage de l'intervalle à la suppression du composant
                                          // Cleaning up the interval when the component unmounts
  }, []);

  return (
    <div>
      {/* ✅ NAVBAR */}
      {/* ✅ NAVBAR */}
      <nav className="navbar">
        <h2>{user ? `Bienvenue, ${user.username}` : "Bienvenue"}</h2> 
        {/* Affichage du nom de l'utilisateur s'il est connecté */}
        {/* Displaying the user's name if logged in */}

        <div className="nav-links">
          {!user ? ( 
            <>
              <Link to="/register" className="nav-button">S'inscrire</Link> 
              <Link to="/login" className="nav-button">Se connecter</Link> 
              {/* Affichage des boutons d'inscription et de connexion si l'utilisateur n'est pas connecté */}
              {/* Displaying register and login buttons if the user is not logged in */}
            </>
          ) : ( 
            <>
              <button onClick={handleLogout} className="nav-button">Se déconnecter</button> 
              <button onClick={handleDeleteAccount} className="nav-button delete">Supprimer mon compte</button> 
              {/* Affichage des boutons de déconnexion et de suppression du compte */}
              {/* Displaying logout and account deletion buttons */}
            </>
          )}
        </div>
      </nav>

      {/* ✅ CONTENU PRINCIPAL */}
      {/* ✅ MAIN CONTENT */}
      <div className="home-container">
        <h1 className="main-title">World Trade Project</h1> 
        <h2>Work in Progress</h2> 
        <ShiftingCountdown /> 

        {/* ✅ Barre de progression */}
        {/* ✅ Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" id="progressBar"></div> 
        </div>
        <div className="percentage">0%</div> 

        {/* ✅ Lien vers la version actuelle */}
        {/* ✅ Link to the current version */}
        <div className="center-link">
          <a href="/current-version" className="link">Current Version</a> 
        </div>
      </div>
    </div>
  );
};

export default Home; // Exportation du composant Home
                     // Exporting the Home component
