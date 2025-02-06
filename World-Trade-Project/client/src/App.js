import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './styles/tailwind.css';
import GameObjectsList from './components/GameObjectsList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CurrentVersion from './components/CurrentVersion';
import RaritySidebar from "./components/RaritySidebar"; // ✅ Import de la Sidebar
import Footer from "./components/Footer"; // ✅ Import du Footer
import DiscordFooter from "./components/DiscordFooter"; // ✅ Import du Discord Footer

const App = () => {
  // ✅ States for authentication
  // 🇬🇧 States to handle authentication and user data.
  // 🇫🇷 États pour gérer l'authentification et les données utilisateur.
  const [token, setToken] = useState('');
  const [protectedData, setProtectedData] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Register Function
  const register = async () => {
    console.log('Register button clicked');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });
      console.log('Register response:', response.data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  // ✅ Login Function
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

  // ✅ Get Protected Data Function
  const getProtectedData = async () => {
    console.log('Fetching protected data with token:', token);
    try {
      const response = await axios.get('http://localhost:5000/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProtectedData(response.data.message);
      console.log('Protected data response:', response.data);
    } catch (error) {
      console.error('Error fetching protected data:', error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        {/* ✅ Page Routing */}
        <Routes>
          {/* 🏠 Home Page (Without Sidebar and Footers) */}
          <Route path="/" element={<Home />} />

          {/* 📌 Other Pages (With Sidebar & Footers) */}
          <Route 
            path="/*" 
            element={
              <div className="content-container">
                <RaritySidebar /> {/* ✅ Sidebar always visible */}
                <div className="main-content">
                  <Routes>
                    <Route path="/current-version" element={<CurrentVersion />} />
                    <Route path="/game-objects" element={<GameObjectsList />} />
                  </Routes>
                </div>
              </div>
            } 
          />
        </Routes>

        {/* ✅ Double Footer (Only on non-home pages) */}
        <Routes>
          <Route path="/" element={null} /> {/* ❌ No Footer on Home */}
          <Route path="/*" element={
            <div className="footer-container">
              <DiscordFooter />  {/* 🔹 Footer du haut avec "Join Discord Partners" */}
              <Footer /> {/* 🔹 Footer du bas avec icônes Discord */}
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
