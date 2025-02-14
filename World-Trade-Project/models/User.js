const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assure-toi que le chemin est correct

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING(32), // ✅ Limite à 32 caractères
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING(60), // ✅ Stockage sécurisé pour le hash
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(32), // ✅ Limite à 32 caractères
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = User;
