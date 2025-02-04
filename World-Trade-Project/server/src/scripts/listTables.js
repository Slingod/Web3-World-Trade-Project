const sequelize = require('../config/database');

const listTables = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const [results] = await sequelize.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');
    console.log(results);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

listTables();
