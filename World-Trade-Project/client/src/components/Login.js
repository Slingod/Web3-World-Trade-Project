import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { FiLock } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [text, setText] = useState("Encrypt data");

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
      <form onSubmit={(e) => { e.preventDefault(); login(); }} className="login-form">
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
        <button
          type="submit"
          className="encrypt-login-button"
          onMouseEnter={scrambleText}
        >
          <FiLock /> <span>{text}</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
