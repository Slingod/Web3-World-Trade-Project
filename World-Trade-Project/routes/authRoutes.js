const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, authenticateUser, deleteAccount } = require('../controllers/authController');

// Route pour l'inscription
router.post('/register', registerUser);

// Route pour la connexion
router.post('/login', loginUser);

// Route pour la déconnexion
router.post('/logout', logoutUser);

// Route pour supprimer son compte (protégée)
router.delete('/delete', authenticateUser, deleteAccount);

module.exports = router;
