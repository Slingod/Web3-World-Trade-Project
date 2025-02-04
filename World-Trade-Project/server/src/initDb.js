const sequelize = require('./config/database');
const User = require('./models/User');
const GameItem = require('./models/gameitems'); // Assurez-vous d'importer tous les modèles nécessaires

async function initDb() {
  try {
    await sequelize.sync({ force: true }); // Utilisez { force: true } pour recréer les tables à chaque exécution
    console.log('Base de données initialisée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    await sequelize.close();
  }
}

initDb();