const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Vérifier que le fichier authController est bien importé
if (!authController) {
  console.error('❌ authController non chargé correctement');
}

// Routes d'authentification
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Routes protégées
router.delete('/delete', authController.verifyToken, authController.deleteUser);
router.get('/me', authController.verifyToken, authController.getUser);

console.log('✅ Routes auth chargées: /api/auth');

module.exports = router;
