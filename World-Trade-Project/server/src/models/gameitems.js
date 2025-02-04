const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GameObject = sequelize.define('GameObject', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rarity: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stackSize: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  purchasePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'gameObjects',
  timestamps: true
});

module.exports = GameObject;