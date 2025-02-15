require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const gameObjectsRoutes = require('./routes/gameObjects');
const { verifyToken } = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('✅ Current working directory:', process.cwd());
console.log('✅ Trying to load .env from:', require('path').resolve(__dirname, '../.env'));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Vérifier si les routes sont bien enregistrées
app.use('/api/auth', authRoutes);
console.log('✅ Routes auth chargées: /api/auth');

app.use('/api/gameObjects', gameObjectsRoutes);
console.log('✅ Routes gameObjects chargées: /api/gameObjects');

// Route pour récupérer les détails d'un objet du jeu
app.get('/api/gameObjects/:id', async (req, res) => {
  const id = req.params.id;
  try {
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
    console.error('❌ Error fetching card details:', error);
    res.status(500).json({ error: 'Failed to fetch card details' });
  }
});

// Route pour soumettre des ressources de fabrication
app.post('/api/submitResources', (req, res) => {
  const { cardId, resources } = req.body;
  console.log(`📦 Resources for card ${cardId} submitted:`, resources);
  res.status(200).send('Resources submitted successfully');
});

// Page d'accueil
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route PROTÉGÉE (nécessite un token JWT)
app.get('/api/protected', verifyToken, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.email}, vous avez accédé à une route protégée.` });
});

// Route pour afficher la version actuelle
app.get('/current-version', (req, res) => {
  res.send('Current Version');
});

// Synchronisation de la base de données
sequelize.sync()
  .then(() => {
    console.log('✅ Database synchronized');
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('✅ Connection to the database has been established successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

// Middleware global pour gérer les erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
