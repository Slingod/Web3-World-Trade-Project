const sequelize = require('../config/database');

const updateImageUrls = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.query(`
      UPDATE "gameObjects"
      SET img = REPLACE(img, '.webm', '.png')
      WHERE img LIKE '%.webm';
    `);
    console.log('Image URLs updated successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

updateImageUrls();
