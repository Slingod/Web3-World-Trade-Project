const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Charger les variables d'environnement à partir du fichier .env
dotenv.config({ path: '../../.env' });

// Initialiser Sequelize avec les variables d'environnement
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Désactiver les logs
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Exporter l'instance de Sequelize pour l'utiliser dans d'autres fichiers
module.exports = sequelize;
