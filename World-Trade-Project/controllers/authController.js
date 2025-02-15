const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret'; // Utilisation de la clé secrète depuis .env
                                                                // Using the secret key from .env

// Inscription (Register)
const registerUser = async (req, res) => {
  const { email, password, pseudo } = req.body; // "pseudo" devient "username"
                                                // "pseudo" becomes "username"

  try {
    // Vérification Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,32}$/; // "pseudo" remplacé par "username"
                                                   // "pseudo" replaced by "username"

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character' });
    }

    if (!usernameRegex.test(pseudo)) {
      return res.status(400).json({ error: 'Username must be 3-32 characters long and can only include letters, numbers, underscores, and hyphens' });
    }

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hashedPassword, username: pseudo }); // "pseudo" → "username"
                                                                                     // "pseudo" → "username"

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error("🔴 Erreur lors de l'inscription :", error); // Log en cas d'erreur
                                                               // Log in case of error
    res.status(500).json({ error: "An error occurred while registering the user", details: error.message });
  }
};

// Connexion (Login)
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
    console.error("🔴 Erreur lors de la connexion :", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware pour vérifier l’authentification
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Récupérer le token
                                                            // Retrieve the token

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

// Déconnexion (Logout) côté client (juste suppression du token)
const logoutUser = async (req, res) => {
  res.json({ message: 'Logout successful' }); // Le client doit supprimer son token côté frontend
                                              // The client must delete its token on the frontend
};

// Suppression du compte
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
    console.error("🔴 Erreur lors de la suppression du compte :", error);
    res.status(500).json({ error: "Erreur serveur lors de la suppression du compte" });
  }
};

// Récupérer les infos de l'utilisateur connecté
const getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'email', 'username']
    });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    console.error("🔴 Erreur lors de la récupération des infos de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des infos de l'utilisateur" });
  }
};

module.exports = { registerUser, loginUser, authenticateUser, logoutUser, deleteAccount, getUser };
