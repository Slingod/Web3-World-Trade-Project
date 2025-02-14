const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Routes d'authentification
router.post('/register', authController.registerUser);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.delete('/delete', authController.verifyToken, authController.deleteUser);

// ✅ Nouvelle route pour récupérer les infos de l'utilisateur connecté
router.get('/me', authController.verifyToken, authController.getUser);

module.exports = router;
