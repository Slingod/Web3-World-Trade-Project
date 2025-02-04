const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const sequelize = require('../config/database');
const { GameObject, Material, ObjectRecipe } = require('../models/gameitems');

const importRecipes = async () => {
  const filePath = path.join(__dirname, 'data_recipes.csv');

  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const row of results) {
        const {
          Name,
          Type,
          Rarity,
          'Time (h)': time,
          Action,
          'Ressource 1': resource1,
          'QTT 1': quantity1,
          'Ressource 2': resource2,
          'QTT 2': quantity2,
          'Ressource 3': resource3,
          'QTT 3': quantity3,
          'Ressource 4': resource4,
          'QTT 4': quantity4,
          'Ressource 5': resource5,
          'QTT 5': quantity5,
          'Prix craft': craftingCost,
          Profit,
          'Profit /h': profitPerHour
        } = row;

        if (!Name) {
          console.error('Skipping row due to missing Name:', row);
          continue;
        }

        const gameObject = await GameObject.findOne({ where: { name: Name } });

        if (gameObject) {
          const materials = [
            { name: resource1, quantity: quantity1 },
            { name: resource2, quantity: quantity2 },
            { name: resource3, quantity: quantity3 },
            { name: resource4, quantity: quantity4 },
            { name: resource5, quantity: quantity5 }
          ];

          for (const material of materials) {
            if (material.name && material.quantity) {
              const [materialRecord] = await Material.findOrCreate({
                where: { name: material.name.trim() },
                defaults: { name: material.name.trim(), quantity: parseInt(material.quantity) }
              });

              const existingRelation = await ObjectRecipe.findOne({
                where: {
                  objectId: gameObject.id,
                  materialId: materialRecord.id
                }
              });

              if (existingRelation) {
                await existingRelation.update({ quantity: parseInt(material.quantity) });
                console.log(`Updated existing relation for object: ${Name} and material: ${material.name}`);
              } else {
                await ObjectRecipe.create({
                  objectId: gameObject.id,
                  materialId: materialRecord.id,
                  quantity: parseInt(material.quantity)
                });
                console.log(`Created new relation for object: ${Name} and material: ${material.name}`);
              }
            } else {
              console.error('Skipping material due to missing name or quantity:', material);
            }
          }
        } else {
          console.error(`GameObject not found for Name: ${Name}`);
        }
      }
      console.log('Recipes imported successfully');
    });
};

importRecipes().catch(console.error);
