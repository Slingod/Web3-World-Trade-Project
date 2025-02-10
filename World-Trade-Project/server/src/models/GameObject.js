// World-Trade-Project/server/src/models/GameObject.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GameObject = sequelize.define('GameObject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  purchasePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  rarity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resources: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = GameObject;
