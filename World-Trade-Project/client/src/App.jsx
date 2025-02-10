import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/tailwind.css';
import GameObjectsList from './components/game/GameObjectsList';
import Home from './components/home/Home';
import CurrentVersion from './components/game/CurrentVersion';
import RaritySidebar from "./components/game/RaritySidebar";
import Footer from './components/common/Footer/Footer';
import DiscordFooter from "./components/common/Footer/DiscordFooter";
import ThemeToggle from "./components/common/ThemeToggle";
import CardDetailPage from './components/game/CardDetailPage'; // Importez le nouveau composant

const App = () => {
  const [token, setToken] = useState('');
  const [protectedData, setProtectedData] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [selectedRarity, setSelectedRarity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const resetFilters = () => {
    setSelectedRarity(null);
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  return (
    <Router>
      <div className="app-container">
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/card/:id" element={<CardDetailPage />} /> {/* Route pour les détails de la carte */}
          <Route
            path="/*"
            element={
              <div className="content-container">
                <RaritySidebar
                  selectedRarity={selectedRarity}
                  setSelectedRarity={setSelectedRarity}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                  resetFilters={resetFilters}
                />
                <GameObjectsList
                  selectedRarity={selectedRarity}
                  selectedCategory={selectedCategory}
                  selectedTag={selectedTag}
                />
                <Routes>
                  <Route path="/current-version" element={<CurrentVersion />} />
                </Routes>
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/*" element={
            <div className="footer-container">
              <DiscordFooter />
              <Footer />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
