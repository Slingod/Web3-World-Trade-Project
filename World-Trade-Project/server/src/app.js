require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const gameObjectsRoutes = require('./routes/gameObjects');
const { verifyToken } = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('Current working directory:', process.cwd());
console.log('Trying to load .env from:', require('path').resolve('../.env'));

// Middlewares d'abord
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes ensuite
app.use('/api/auth', authRoutes);
app.use('/api/gameObjects', gameObjectsRoutes);

// Route pour récupérer les détails d'une carte
app.get('/api/gameObjects/:id', async (req, res) => {
  const id = req.params.id;
  try {
    // Logique pour récupérer les détails de la carte depuis la base de données
    // Exemple de données fictives
    const card = {
      id,
      name: `Item ${id}`,
      img: `https://example.com/image${id}.png`,
      purchasePrice: `$${id * 10}`,
      rarity: 'Common',
      type: 'Category',
    };
    res.json(card);
  } catch (error) {
    console.error('Error fetching card details:', error);
    res.status(500).json({ error: 'Failed to fetch card details' });
  }
});

// Route pour soumettre les ressources de fabrication
app.post('/api/submitResources', (req, res) => {
  const { cardId, resources } = req.body;
  // Logique pour enregistrer les ressources dans la base de données
  console.log(`Resources for card ${cardId} submitted:`, resources);
  res.status(200).send('Resources submitted successfully');
});

// Route racine
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route protégée
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: 'Vous avez accédé à une route protégée', userId: req.userId });
});

// Define the /current-version route
app.get('/current-version', (req, res) => {
  res.send('Current Version');
});

// Synchronisation de la base de données
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Middleware global pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
