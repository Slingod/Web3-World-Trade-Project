import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './styles/tailwind.css';
import GameObjectsList from './components/GameObjectsList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CurrentVersion from './components/CurrentVersion'; // Assurez-vous d'avoir ce composant

const App = () => {
  const [token, setToken] = useState('');
  const [protectedData, setProtectedData] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const getProtectedData = async () => {
    console.log('Fetching protected data with token:', token);
    try {
      const response = await axios.get('http://localhost:5000/api/protected', {
        headers: {
          Authorization: `Bearer ${token}` // Correction de l'orthographe
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/current-version" element={<CurrentVersion />} />
        <Route path="/game-objects" element={<GameObjectsList />} /> {/* Ajouter la route pour GameObjectsList */}
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
  );
};

export default App;