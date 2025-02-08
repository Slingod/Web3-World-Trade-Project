import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './styles/tailwind.css';
import GameObjectsList from './components/GameObjectsList';
import Home from './components/Home';
import CurrentVersion from './components/CurrentVersion';
import RaritySidebar from "./components/RaritySidebar"; 
import Footer from './components/common/Footer/Footer';
import DiscordFooter from "./components/DiscordFooter"; 
import ThemeToggle from "./components/common/ThemeToggle"; // 🔥 Import  ThemeToggle

const App = () => {
  // ✅ States for authentication
  const [token, setToken] = useState('');
  const [protectedData, setProtectedData] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ States for filtering
  const [selectedRarity, setSelectedRarity] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // ✅ Function to reset filters
  const resetFilters = () => {
    setSelectedRarity(null);
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  return (
    <Router>
      <div className="app-container">
        {/* 🔥 Ajout du ThemeToggle en haut de l'application */}
        

        <Routes>
          {/* 🏠 Home Page (Without Sidebar and Footers) */}
          <Route path="/" element={<Home />} />

          {/* 📌 Other Pages (With Sidebar & Footers) */}
          <Route 
            path="/*" 
            element={
              <div className="content-container">
                {/* ✅ Sidebar for filtering items */}
                <RaritySidebar 
                  selectedRarity={selectedRarity}
                  setSelectedRarity={setSelectedRarity}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                  resetFilters={resetFilters}
                />

                {/* ✅ Display game objects list */}
                <GameObjectsList 
                  selectedRarity={selectedRarity}
                  selectedCategory={selectedCategory}
                  selectedTag={selectedTag}
                />

                {/* ✅ Main Content (Wrapped in <Routes> to prevent errors) */}
                <Routes>
                  <Route path="/current-version" element={<CurrentVersion />} />
                </Routes>
              </div>
            } 
          />
        </Routes>

        {/* ✅ Footer (Only on non-home pages) */}
        <Routes>
          <Route path="/" element={null} /> {/* ❌ No Footer on Home */}
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
