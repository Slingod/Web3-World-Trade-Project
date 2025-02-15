const sequelize = require('../server/src/config/database');

// Vérifier la connexion
sequelize.authenticate()
  .then(() => {
    console.log("✅ Test DB : Connexion réussie !");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Test DB : Erreur de connexion !", err);
    process.exit(1);
  });
