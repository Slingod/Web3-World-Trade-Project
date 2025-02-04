const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const sequelize = require('../config/database');
const ObjectModel = require('../models/gameitems');

const importObjects = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');

    const objects = [];
    const filePath = path.join(__dirname, 'data_objects.csv');

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        objects.push({
          name: row.Name,
          img: row.IMG,
          type: row.Type,
          rarity: row.Rarity,
          stackSize: parseInt(row['Stack Size'], 10) || 0,
          purchasePrice: parseFloat(row['Prix Achat'].replace(',', '.').replace('$', '')) || 0,
        });
      })
      .on('end', async () => {
        for (const obj of objects) {
          const [object, created] = await ObjectModel.upsert(obj);
          if (created) {
            console.log(`Object created: ${object.name}`);
          } else {
            console.log(`Object updated: ${object.name}`);
          }

          const foundObject = await ObjectModel.findOne({ where: { name: obj.name } });
          if (foundObject) {
            console.log(`Object verified in database: ${foundObject.name}`);
          } else {
            console.error(`Object not found in database: ${obj.name}`);
          }
        }
        console.log('Objects imported successfully');
        await sequelize.close();
      });
  } catch (error) {
    console.error('Error importing objects:', error);
  }
};

importObjects();
