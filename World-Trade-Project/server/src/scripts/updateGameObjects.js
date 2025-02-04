const sequelize = require('../config/database');
const GameObject = require('../models/gameitems');

const updateGameObjects = async () => {
  const objectsToUpdate = [
    'Assassin Blades', 'Champion Greathammer', 'Gemstone Pickaxe', 'Phantom Armor', 'Runic Axe', 'Spiked Club', 'Storm Katana', 'Tuned Armor', 'Valor Dual Axes'
  ];

  for (const name of objectsToUpdate) {
    const objects = await GameObject.findAll({ where: { name } });
    for (const obj of objects) {
      obj.name = `${obj.name} (${obj.rarity})`;
      await obj.save();
    }
  }
};

updateGameObjects().then(() => {
  console.log('Game objects updated successfully');
}).catch(error => {
  console.error('Error updating game objects:', error);
});
