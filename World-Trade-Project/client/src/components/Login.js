import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css'; // ✅ Garde le CSS du login
import { FiLock } from "react-icons/fi"; // ✅ Import de l'icône du cadenas

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [text, setText] = useState("Encrypt data");

  // ✅ Fonction pour envoyer les données de connexion
  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      setToken(response.data.token);
      console.log('Login response:', response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // ✅ Fonction d'animation du texte avec des caractères aléatoires
  const scrambleText = () => {
    const CHARS = "!@#$%^&*():{};|,.<>/?";
    let pos = 0;
    const CYCLES_PER_LETTER = 2;
    const SHUFFLE_TIME = 50;
    const TARGET_TEXT = "Login";

    const interval = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        clearInterval(interval);
        setText(TARGET_TEXT);
      }
    }, SHUFFLE_TIME);
  };

  return (
    <div className="login-container">
      {/* ✅ Formulaire centré */}
      <form onSubmit={(e) => { e.preventDefault(); login(); }} className="login-form">
        {/* ✅ Champ Email */}
        <div className="login-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* ✅ Champ Password */}
        <div className="login-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* ✅ Nouveau bouton "Encrypt Login" */}
        <button
          type="submit"
          className="encrypt-login-button"
          onMouseEnter={scrambleText} // ✅ Animation du texte au survol
        >
          <FiLock /> <span>{text}</span> {/* ✅ Icône + Texte animé */}
        </button>
      </form>
    </div>
  );
};

export default Login;
