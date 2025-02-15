const bcrypt = require('bcrypt');

const password = 'MonSuperMotDePasse123!';
const saltRounds = 10;

// Hachage du mot de passe
bcrypt.hash(password, saltRounds)
  .then(hash => {
    console.log("🔐 Mot de passe hashé :", hash);
    return bcrypt.compare(password, hash);
  })
  .then(result => {
    console.log("🔍 Vérification du hash :", result ? "✔️ Valide" : "❌ Invalide");
    process.exit(0);
  })
  .catch(err => {
    console.error("⚠️ Erreur de hachage :", err);
    process.exit(1);
  });
