const express = require('express');
const router = express.Router();
const ObjectModel = require('../models/gameitems');

// Fetch all objects
router.get('/', async (req, res) => {
  try {
    const objects = await ObjectModel.findAll();
    res.json(objects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new object
router.post('/', async (req, res) => {
  try {
    const newObject = await ObjectModel.create(req.body);
    res.status(201).json(newObject);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an object
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await ObjectModel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedObject = await ObjectModel.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedObject);
    } else {
      res.status(404).json({ error: 'Object not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an object
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ObjectModel.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Object not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;