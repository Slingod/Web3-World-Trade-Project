// World-Trade-Project/server/src/controllers/gameObjectsController.js

const { GameObject } = require('../models/GameObject');

// Fonction pour récupérer les détails d'une carte
exports.getGameObjectDetails = async (req, res) => {
  try {
    const gameObject = await GameObject.findByPk(req.params.id);
    if (!gameObject) {
      return res.status(404).json({ error: 'Game object not found' });
    }
    res.json(gameObject);
  } catch (error) {
    console.error('Error fetching game object details:', error);
    res.status(500).json({ error: 'Failed to fetch game object details' });
  }
};

// Fonction pour soumettre les ressources de fabrication
exports.submitResources = async (req, res) => {
  const { cardId, resources } = req.body;
  try {
    const gameObject = await GameObject.findByPk(cardId);
    if (!gameObject) {
      return res.status(404).json({ error: 'Game object not found' });
    }
    // Logique pour enregistrer les ressources dans la base de données
    gameObject.resources = resources;
    await gameObject.save();
    res.status(200).send('Resources submitted successfully');
  } catch (error) {
    console.error('Error submitting resources:', error);
    res.status(500).json({ error: 'Failed to submit resources' });
  }
};
