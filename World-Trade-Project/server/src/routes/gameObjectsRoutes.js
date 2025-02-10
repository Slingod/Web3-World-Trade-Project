// World-Trade-Project/server/src/routes/gameObjectsRoutes.js

const express = require('express');
const router = express.Router();
const { getGameObjectDetails, submitResources } = require('../controllers/gameObjectsController');

// Route pour récupérer les détails d'une carte
router.get('/:id', getGameObjectDetails);

// Route pour soumettre les ressources de fabrication
router.post('/submitResources', submitResources);

module.exports = router;
