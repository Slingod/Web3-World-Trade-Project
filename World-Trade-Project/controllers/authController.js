const User = require('../models/User');
const hashPassword = require('../utils/hashPassword');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret'; // Utilisation de la clé secrète depuis .env

// ✅ Inscription (Register)
const registerUser = async (req, res) => {
  const { email, password, pseudo } = req.body;

  try {
    // Vérification Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const pseudoRegex = /^[a-zA-Z0-9_-]{3,32}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character' });
    }

    if (!pseudoRegex.test(pseudo)) {
      return res.status(400).json({ error: 'Pseudo must be 3-32 characters long and can only include letters, numbers, underscores, and hyphens' });
    }

    // Hachage du mot de passe
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ email, password: hashedPassword, pseudo });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Connexion (Login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Middleware pour vérifier l’authentification
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Récupérer le token

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ✅ Déconnexion (Logout) côté client (juste suppression du token)
const logoutUser = async (req, res) => {
  res.json({ message: 'Logout successful' }); // Le client doit supprimer son token côté frontend
};

// ✅ Suppression du compte
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Suppression de l'utilisateur
    await user.destroy();
    res.json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur lors de la suppression du compte" });
  }
};

module.exports = { registerUser, loginUser, authenticateUser, logoutUser, deleteAccount };
