const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Importation correcte du modèle User

// ✅ Inscription (Register)
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifications Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,32}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Format email invalide' });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Mot de passe trop faible' });
    }
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: 'Pseudo invalide' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'Inscription réussie', user });
  } catch (error) {
    console.error('Erreur lors de l’inscription:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ✅ Connexion (Login)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Email ou mot de passe invalide' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ✅ Récupérer les infos de l'utilisateur connecté
const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, { attributes: ['username', 'email'] });
    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ✅ Supprimer un compte
const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.userId } });
    res.json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ✅ Vérification du token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token invalide' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// ✅ Déconnexion (simple suppression du token côté client)
const logout = (req, res) => {
  res.json({ message: 'Déconnexion réussie' });
};

module.exports = {
  register,
  login,
  getUser, // Ajout de cette fonction
  deleteUser,
  verifyToken,
  logout,
};
