const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

// Charger les variables d'environnement
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Vérifier si les variables sont bien chargées
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASS) {
  console.error("🔴 Erreur : Les variables d'environnement pour la base de données ne sont pas chargées !");
  process.exit(1); // Arrêter le serveur si .env est mal configuré
}

// Configuration de Sequelize avec PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Nom de la base de données
  process.env.DB_USER,   // Nom d'utilisateur PostgreSQL
  process.env.DB_PASS,   // Mot de passe PostgreSQL
  {
    host: process.env.DB_HOST,   // Hôte (localhost ou autre)
    port: process.env.DB_PORT,   // Port de connexion
    dialect: 'postgres',         // Type de base de données
    logging: false,              // Désactiver les logs SQL
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Tester la connexion
sequelize.authenticate()
  .then(() => console.log("🟢 Connexion à la base de données réussie"))
  .catch(err => {
    console.error("🔴 Erreur de connexion à la base de données :", err);
    process.exit(1);
  });

module.exports = sequelize;
