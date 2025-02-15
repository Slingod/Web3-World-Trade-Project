const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Importation du modèle User
const { emailRegex, passwordRegex, pseudoRegex } = require('../../utils/validators');
const hashPassword = require('../../utils/hashPassword');

// ✅ Inscription (Register)
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérification du format de l'email
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Format email invalide' });
    }
    // Vérification de la robustesse du mot de passe
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Mot de passe trop faible' });
    }
    // Vérification du pseudo
    if (!pseudoRegex.test(username)) {
      return res.status(400).json({ error: 'Pseudo invalide' });
    }

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ error: 'Utilisateur déjà existant' });
    }

    // Hachage du mot de passe avant l'enregistrement
    const hashedPassword = await hashPassword(password);

    // Création de l'utilisateur dans la base de données
    user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'Inscription réussie', user });
  } catch (error) {
    console.error('Erreur lors de l’inscription:', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};

// ✅ Connexion (Login)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ where: { email } });

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Email ou mot de passe invalide' });
    }

    // Génération du token JWT pour authentification
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};

// ✅ Récupérer les infos de l'utilisateur connecté
const getUser = async (req, res) => {
  try {
    // Récupération des infos de l'utilisateur en excluant le mot de passe
    const user = await User.findByPk(req.userId, { attributes: ['username', 'email'] });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};

// ✅ Supprimer un compte utilisateur
const deleteUser = async (req, res) => {
  try {
    // Suppression de l'utilisateur basé sur son ID
    await User.destroy({ where: { id: req.userId } });
    res.json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur', details: error.message });
  }
};

// ✅ Middleware pour vérifier le token d'authentification
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Récupération du token depuis l'en-tête

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalide' });
    }
    req.userId = decoded.userId; // Ajout de l'ID utilisateur aux requêtes
    next();
  });
};

// ✅ Déconnexion (simple suppression du token côté client)
const logout = (req, res) => {
  res.json({ message: 'Déconnexion réussie' });
};

// ✅ Exportation des fonctions du contrôleur
module.exports = {
  register,
  login,
  getUser,
  deleteUser,
  verifyToken,
  logout,
};
