const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const GameObject = require('../models/gameitems');

const newGameObjects = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'new-game-objects.json'), 'utf8'));

const addGameObjectToDB = async (gameObject) => {
  try {
    await GameObject.create(gameObject);
    console.log(`Added game object: ${gameObject.name}`);
  } catch (error) {
    console.error(`Error adding game object: ${gameObject.name}`, error);
  }
};

const addGameObjectsToDB = async () => {
  for (const gameObject of newGameObjects) {
    await addGameObjectToDB(gameObject);
  }
};

sequelize.sync().then(() => {
  addGameObjectsToDB();
});
