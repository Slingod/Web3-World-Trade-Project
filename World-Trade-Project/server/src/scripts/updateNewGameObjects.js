const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const GameObject = require('../models/gameitems');

const updateNewGameObjects = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const filePath = path.join(__dirname, 'new-game-objects.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const newObjects = JSON.parse(data);

    for (const newObj of newObjects) {
      const [object, created] = await GameObject.upsert({
        name: newObj.name,
        rarity: newObj.rarity,
        purchasePrice: newObj.purchasePrice,
        supply: newObj.supply,
        type: newObj.type,
        img: newObj.img,
      });

      if (created) {
        console.log(`Object created: ${object.name}`);
      } else {
        console.log(`Object updated: ${object.name}`);
      }
    }

    console.log('New game objects updated successfully.');
  } catch (error) {
    console.error('Error updating new game objects:', error);
  } finally {
    await sequelize.close();
  }
};

updateNewGameObjects();
